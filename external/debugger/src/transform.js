var LinkedList = require("basic-ds").LinkedList;
var Stack = require("basic-ds").Stack;
var b = require("ast-types").builders;
var escodegen = require("escodegen");
var escope = require("escope");
var esprima = require("esprima-fb");
var estraverse = require("estraverse");
var regenerator = require("regenerator");


var assignmentStatement = function(left, right, loc) {
    var stmt = b.expressionStatement(
        b.assignmentExpression("=", left, right)
    );
    stmt.loc = loc;
    return stmt;
};


var rewriteVariableDeclarations = function(bodyList) {
    var nodes = [];
    bodyList.forEachNode(listNode => {
        if (listNode.value.type === "VariableDeclaration") {
            nodes.push(listNode);
        }
    });

    nodes.forEach(node => {
        var replacements = [];

        node.value.declarations.forEach(decl => {
            if (decl.init !== null) {
                var name = decl.id.name;
                var scopeName = scopeNameForName(name);
                if (scopeName) {
                    replacements.push(assignmentStatement(
                        memberExpression(scopeName, name), decl.init, decl.loc
                    ));
                }
            }
        });

        if (replacements.length > 0) {
            bodyList.replaceNodeWithValues(node, replacements);
        }
    });
};


var isBreakpoint = function(node) {
    if (node.type === "ExpressionStatement") {
        var expr = node.expression;
        if (expr.type === "YieldExpression") {
            var arg = expr.argument;
            if (arg.type === "ObjectExpression") {
                return arg.properties.some(prop => {
                    return prop.key.name === "breakpoint";
                });
            }
        }
    }
    return false;
};


var insertYields = function(bodyList) {
    bodyList.forEachNode(listNode => {
        var astNode = listNode.value;
        if (isBreakpoint(astNode)) {
            return;
        }

        var loc = astNode.loc;
        var line = loc.start.line;
        bodyList.insertBeforeNode(listNode, yieldObject({ line: line }, loc));
    });
};


var stringForId = function(node) {
    var name = "";
    if (node.type === "Identifier") {
        if (node.name.indexOf("$scope$") === -1) {
            name = node.name;
        }
    } else if (node.type === "MemberExpression") {
        var part = stringForId(node.object);
        if (part.length > 0) {
            name = stringForId(node.object) + "." + node.property.name;
        } else {
            name = node.property.name;
        }
    } else if (node.type === "ThisExpression") {
        name = "this";
    } else {
        throw "can't call stringForId on nodes of type '${node.type}'";
    }
    return name;
};


var getNameForFunctionExpression = function(node) {
    var name = "";
    if (node._parent.type === "Property") {
        name = node._parent.key.name;
        if (node._parent._parent.type === "ObjectExpression") {
            name = getNameForFunctionExpression(node._parent._parent) + "." + name;
        }
    } else if (node._parent.type === "AssignmentExpression") {
        name = stringForId(node._parent.left);
    } else if (node._parent.type === "VariableDeclarator") {
        name = stringForId(node._parent.id);
    } else {
        name = "<anonymous>"; // TODO: test anonymous callbacks
    }
    return name;
};


var isReference = function(node, parent) {
    // we're a property key so we aren't referenced
    if (parent.type === "Property" && parent.key === node) return false;

    // we're a variable declarator id so we aren't referenced
    if (parent.type === "VariableDeclarator" && parent.id === node) return false;

    var isMemberExpression = parent.type === "MemberExpression";

    // we're in a member expression and we're the computed property so we're referenced
    var isComputedProperty = isMemberExpression && parent.property === node && parent.computed;

    // we're in a member expression and we're the object so we're referenced
    var isObject = isMemberExpression && parent.object === node;

    // we are referenced
    return !isMemberExpression || isComputedProperty || isObject;
};


var assignmentForDeclarator = function(scopeName, decl) {
    var ae = b.assignmentExpression(
        "=", memberExpression(scopeName, decl.id.name), decl.init);
    ae.loc = decl.loc;
    return ae;
};


var contextHasProperty = function(key) {
    return context[key] !== undefined || context.hasOwnProperty(key);
};


var scopeNameForName = function(name) {
    var scopes = scopeStack.items;

    for (let i = scopes.length - 1; i > -1; i--) {
        var scope = scopes[i];
        if (scope.hasOwnProperty(name)) {
            return "$scope$" + i;
        }
    }
    if (contextHasProperty(name)) {
        return contextName;
    }
};


var callInstantiate = function(node) {
    var name = stringForId(node.callee);
    node.arguments.unshift(b.literal(name));    // constructor name
    node.arguments.unshift(node.callee);        // constructor
    return b.callExpression(
        memberExpression(contextName, "__instantiate__"), node.arguments
    );
};


var declareVariable = function(name, value) {
    return b.variableDeclaration(
        "var",
        [b.variableDeclarator(
            b.identifier(name),
            value
        )]
    );
};


var memberExpression = function(objName, propName) {
    return b.memberExpression(
        b.identifier(objName),
        b.identifier(propName),
        false
    );
};


var objectExpression = function(obj) {
    return b.objectExpression(Object.keys(obj).map(key => {
        var val = typeof obj[key] === "object" ? obj[key] : b.literal(obj[key]);
        return b.property("init", b.identifier(key), val);
    }));
};


var yieldObject = function(obj, loc) {
    var stmt = b.expressionStatement(b.yieldExpression(objectExpression(obj)));
    if (loc) {
        stmt.loc = loc;
    }
    return stmt;
};


var wrapExpression = function(expr, nextExpr) {
    var obj = {
        value: expr
    };
    if (nextExpr) {
        obj.line = nextExpr.loc.start.line
    } else {
        obj.stepAgain = true;
    }
    return b.yieldExpression(objectExpression(obj));
};


var wrapSequenceExpressions = function(seqNode, nextExpr) {
    var replacements = [];
    var expressions = seqNode.expressions;
    for (var i = 0; i < expressions.length - 1; i++) {
        replacements.push(wrapExpression(expressions[i], expressions[i+1]));
    }
    replacements.push(expressions[i], nextExpr);
    return replacements;
};


var addScopeDict = function(bodyList) {
    var scopeName = "$scope$" + (scopeStack.size - 1);
    var scope = scopeStack.peek();

    bodyList.first.value.expression.argument.properties.push(
        b.property("init", b.identifier("scope"), b.identifier(scopeName))
    );

    var scopeDict = b.objectExpression(Object.keys(scope).map(name => {
        var value = scope[name].type === "Parameter" ? name : "undefined";
        return b.property("init", b.identifier(name), b.identifier(value));
    }));

    bodyList.push_front(declareVariable(scopeName, scopeDict));
};


var getFunctionName = function(node, parent) {
    if (parent.type === "FunctionDeclaration") {
        return stringForId(parent.id);
    } else if (parent.type === "FunctionExpression") {
        return getNameForFunctionExpression(parent);
    } else if (node.type === "Program") {
        return "<PROGRAM>";
    }
};


var compile = function(ast, options) {
    var debugCode, generator;
    
    if (options.nativeGenerators) {
        debugCode = `return function*(${contextName}) {
            ${escodegen.generate(ast)}
        }`;

        generator = new Function(debugCode);
    } else {
        // regenerator likes functions so wrap the code in a function
        var entry = b.functionDeclaration(
            b.identifier("entry"),
            [b.identifier(contextName)],
            b.blockStatement(ast.body),
            true,   // generator 
            false   // expression
        );

        regenerator.transform(entry);
        debugCode = escodegen.generate(entry);

        generator = new Function(debugCode + "\n" + "return entry;");
    }
    
    if (options.debug) {
        console.log(debugCode);
    }
    
    return generator;
};


var context;
var contextName;
var scopeStack;


var transform = function(code, _context, options) {
    let ast = esprima.parse(code, { loc: true });
    let scopeManager = escope.analyze(ast);
    scopeManager.attach();
    
    scopeStack = new Stack();
    context = _context;
    contextName = "context" + Date.now();

    estraverse.replace(ast, {
        enter: (node, parent) => {
            if (node.__$escope$__) {
                let scope = {};
                let isRoot = scopeStack.size === 0;
                
                node.__$escope$__.variables.forEach(variable => {
                    // don't include variables from the context in the root scope
                    if (isRoot && contextHasProperty(variable.name)) {
                        return;
                    }

                    if (variable.defs.length > 0) {
                        scope[variable.name] = {
                            type: variable.defs[0].type
                        };
                    }
                });

                scopeStack.push(scope);
            }
            
            if (node.type === "Program" || node.type === "BlockStatement") {
                node.body.forEach((stmt, index) => stmt._index = index);
            }
            
            node._parent = parent;
        },
        leave: (node, parent) => {
            if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
                // convert all user defined functions to generators
                node.generator = true;
                
                if (node.type === "FunctionDeclaration") {
                    let scopeName = "$scope$" + (scopeStack.size - 1);
                    return assignmentStatement(
                        memberExpression(scopeName, node.id.name),
                        b.functionExpression(null, node.params, node.body, true, false),
                        node.loc
                    );
                }
            } else if (node.type === "Program" || node.type === "BlockStatement") {
                let bodyList = LinkedList.fromArray(node.body);
                
                // rewrite variable declarations first
                rewriteVariableDeclarations(bodyList);
                
                // insert yield statements between each statement 
                insertYields(bodyList);

                if (bodyList.first === null) {
                    bodyList.push_back(yieldObject({ line: node.loc.end.line }, node.loc));
                }

                let functionName = getFunctionName(node, parent);
                if (functionName) {
                    // modify the first yield statement so that the object
                    // returned contains the function's name
                    bodyList.first.value.expression.argument.properties.push(
                        b.property("init", b.identifier("name"), b.literal(functionName))
                    );

                    addScopeDict(bodyList);
                    scopeStack.pop();
                }

                node.body = bodyList.toArray();
            } else if (node.type === "CallExpression" || node.type === "NewExpression") {
                let obj = {
                    value: node.type === "NewExpression" ? callInstantiate(node) : node,
                    stepAgain: true
                };

                let expr = b.yieldExpression(objectExpression(obj));
                expr.loc = node.loc;
                return expr;
            } else if (node.type === "DebuggerStatement") {
                return yieldObject({
                    line: node.loc.start.line,
                    breakpoint: true
                }, node.loc);
            } else if (node.type === "Identifier" && parent.type !== "FunctionExpression" && parent.type !== "FunctionDeclaration") {
                if (isReference(node, parent)) {
                    let scopeName = scopeNameForName(node.name);
                    if (scopeName) {
                        return memberExpression(scopeName, node.name);
                    }
                }

            } else if (node.type === "ForStatement") {
                // TODO: if the body of a ForStatement isn't a BlockStatement, convert it to one
                // TODO: write tests with programs that don't use a BlockStatement with a for loop

                // loop back to the update
                // do this first because we replace node.update and it loses its location info
                node.body.body.push(yieldObject({line: node.update.loc.start.line}));

                // TODO: come up with a set of tests that check all of these cases
                if (node.init.type === "SequenceExpression") {
                    node.init.epxressions = wrapSequenceExpressions(node.init, node.test);
                } else {
                    node.init = wrapExpression(node.init, node.test);
                }

                if (node.update.type === "SequenceExpression") {
                    node.update.expressions = wrapSequenceExpressions(node.update, node.test);
                } else {
                    node.update = wrapExpression(node.update, node.test);
                }

                if (node.test !== null) {
                    node.test = wrapExpression(node.test);
                }
            } else if (node.type === "WhileStatement" || node.type === "DoWhileStatement") {
                node.body.body.push(yieldObject({line: node.test.loc.start.line}));
                if (node.test !== null) {
                    node.test = wrapExpression(node.test);
                }
            } else if (node.type === "VariableDeclaration" && parent.type === "ForStatement") {
                let replacements = [];
                node.declarations.forEach(decl => {
                    if (decl.init !== null) {
                        var scopeName = scopeNameForName(decl.id.name);
                        if (scopeName) {
                            replacements.push(assignmentForDeclarator(scopeName, decl));
                        }
                    }
                });
                
                if (replacements.length === 1) {
                    return replacements[0];
                } else if (replacements.length > 1) {
                    return b.sequenceExpression(replacements);
                } else {
                    return null;
                }
            }

            // clean up
            delete node._parent;
            delete node._index;
        }
    });
 
    return compile(ast, options);
};

module.exports = transform;

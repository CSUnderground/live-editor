/// <reference path="../typings/jquery/jquery.d.ts"/>

function createSpan(text, cls) {
    return $("<span class='" + cls + "'>" + text + "</span>");
}

function createLabel(text) {
    return createSpan(text, "label");
}

function createString(text) {
    return createSpan('"' + text + '"', "string");
}

function genPreview(value: any, stop?: boolean): any {
    if (value === null) {
        return createSpan(value, "null");
    } else if (typeof(value) === "object") {
        var text = "";
        if (value instanceof Array) {
            text += "Array[" + value.length + "]";
        } else {
            if (stop) {
                text += "Object";
            } else {
                text += "Object {";
                var keys = Object.keys(value);
                for (var i = 0; i < keys.length; i++) {
                    if (i > 0) {
                        text += ", ";
                    }
                    var key = keys[i];
                    text += createLabel(key) + ": ";
                    text += genPreview(value[key], true);
                }
                text += "}";
                return text;
            }
        }
        return createSpan(text, "");
    } else if (typeof(value) === "number") {
        return createSpan(value, "number");
    } else if (typeof(value) === "string") {
        return createString(value);
    } else if (typeof(value) === "boolean") {
        return createSpan(value, "boolean");
    } else if (typeof(value) === "undefined") {
        return createSpan(value, "undefined");
    }
}


class ObjectBrowser {
    $container: JQuery;
    paths: { [path:string]: boolean };

    constructor(public container: HTMLDivElement) {
        this.$container = $(container);
        this.paths = {};
    }

    set object(obj) {
        this.$container.empty();
        if (typeof(obj) === "object" && obj !== null) {
            this.$container.append(this.genPropsList(obj));
        }
    }

    getOpenPaths() {
        return Object.keys(this.paths).filter(function (path) {
            return this.paths[path];
        });
    }

    private genPropsList(obj: any, parentName?: string) {
        var $root = $("<ul></ul>").addClass("props");

        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (typeof(obj[key]) === "object") {
                if (obj[key] === null) {
                    $root.append(
                        $("<li></li>")
                            .text(": ")
                            .prepend(createLabel(key))
                            .append(genPreview(obj[key], true))
                    );
                } else {
                    var path = parentName ? parentName + ":" + key : key;
                    var $triangle;
                    if (this.paths[path]) {
                        $triangle = createSpan("\u25BC", "triangle");
                    } else {
                        $triangle = createSpan("\u25B6", "triangle");
                    }
                    var $li = $("<li></li>")
                        .css({ position: "relative" })
                        .text(": ")
                        .prepend($triangle, createLabel(key))
                        .append(genPreview(obj[key], true));
                    if (this.paths[path]) {
                        $li.append(this.genPropsList(obj[key], path));
                    }
                    $root.append($li);
                    var self = this;
                    (function (key, val) {
                        $triangle.click(function () {
                            var path = parentName ? parentName + ":" + key : key;
                            var $ul;
                            if ($(this).parent().find('> ul').length !== 0) {
                                $ul = $(this).parent().find('> ul');
                                $ul.toggle();
                            } else {
                                $ul = self.genPropsList(val, path);
                                $(this).parent().append($ul);
                            }
                            if ($ul.is(':visible')) {
                                self.paths[path] = true;
                                $(this).text('\u25BC');
                            } else {
                                self.paths[path] = false;
                                $(this).text('\u25B6');
                            }
                        });
                    })(key, obj[key]);
                }
            } else {
                $root.append(
                    $("<li></li>")
                        .text(": ")
                        .prepend(createLabel(key))
                        .append(genPreview(obj[key], true))
                );
            }
        }
        if (obj instanceof Array) {
            $root.append(
                $("<li></li>")
                    .text(": ")
                    .prepend(createSpan("length", "read-only"))
                    .append(genPreview(obj.length))
            );
        }

        return $root;
    }
}


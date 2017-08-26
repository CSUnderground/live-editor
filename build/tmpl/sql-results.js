this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["sql-results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\r\n        <h1>Database Schema</h1>\r\n    ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n        <table class=\"sql-schema-table\" data-table-name=\"";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\r\n        <thead>\r\n        ";
  foundHelper = helpers.hasSingleRow;
  stack1 = foundHelper || depth0.hasSingleRow;
  stack2 = helpers['if'];
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(6, program6, data);
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </thead>\r\n        <tbody>\r\n        ";
  foundHelper = helpers.columns;
  stack1 = foundHelper || depth0.columns;
  stack2 = helpers.each;
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </tbody>\r\n        </table>\r\n    ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <th><a href=\"javascript:void(0)\">";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a> <span class=\"row-count\">";
  foundHelper = helpers.rowCount;
  stack1 = foundHelper || depth0.rowCount;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "rowCount", { hash: {} }); }
  buffer += escapeExpression(stack1) + " row</span></th>\r\n        ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <th><a href=\"javascript:void(0)\">";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a> <span class=\"row-count\">";
  foundHelper = helpers.rowCount;
  stack1 = foundHelper || depth0.rowCount;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "rowCount", { hash: {} }); }
  buffer += escapeExpression(stack1) + " rows</span></th>\r\n        ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n            <tr><td>\r\n            ";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.pk;
  stack1 = foundHelper || depth0.pk;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <span class=\"column-type-wrap\"><span class=\"schema-column-type\">";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "type", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</span></span>\r\n            </td></tr>\r\n        ";
  return buffer;}
function program9(depth0,data) {
  
  
  return "<span class=\"schema-pk\">(PK)</span>";}

function program11(depth0,data) {
  
  
  return "\r\n        <h1>Results</h1>\r\n    ";}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n        <table class=\"sql-result-table\">\r\n        <thead>\r\n        ";
  foundHelper = helpers.columns;
  stack1 = foundHelper || depth0.columns;
  stack2 = helpers.each;
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </thead>\r\n        <tbody>\r\n        ";
  foundHelper = helpers.values;
  stack1 = foundHelper || depth0.values;
  stack2 = helpers.each;
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </tbody>\r\n        </table>\r\n    ";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <th>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</th>\r\n        ";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n            <tr>\r\n                ";
  foundHelper = helpers.result;
  stack1 = foundHelper || depth0.result;
  stack2 = helpers.each;
  tmp1 = self.program(17, program17, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            </tr>\r\n        ";
  return buffer;}
function program17(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n                    ";
  foundHelper = helpers.data;
  stack1 = foundHelper || depth0.data;
  foundHelper = helpers.isNull;
  stack2 = foundHelper || depth0.isNull;
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(20, program20, data);
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  return buffer;}
function program18(depth0,data) {
  
  
  return "\r\n                        <td>NULL</td>\r\n                    ";}

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                        <td>";
  foundHelper = helpers.data;
  stack1 = foundHelper || depth0.data;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "data", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</td>\r\n                    ";
  return buffer;}

  buffer += "<html>\r\n<head>\r\n";
  buffer += "\r\n<style>\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n    empty-cells: show;\r\n    width: 100%;\r\n    margin-bottom: 20px;\r\n}\r\ntable thead {\r\n    background: #e6e6e6;\r\n    color: #000;\r\n    text-align: left;\r\n    vertical-align: bottom;\r\n}\r\nth:first-child {\r\n    border-radius: 6px 0 0 0;\r\n}\r\nth:last-child {\r\n    border-radius: 0 6px 0 0;\r\n}\r\nth:only-child{\r\n    border-radius: 6px 6px 0 0;\r\n}\r\ntbody {\r\n    border: 1px solid #dbdbdb;\r\n}\r\ntd {\r\n    border: 1px solid #eeeeee;\r\n    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;\r\n    font-size: inherit;\r\n    margin: 0;\r\n    overflow: visible;\r\n    padding: .3em 1em;\r\n}\r\nth {\r\n    font-family: \"Proxima Nova\", sans-serif;\r\n    padding: .4em 1em;\r\n}\r\nth a {\r\n    color: #699c52;\r\n}\r\nh1 {\r\n    clear: both;\r\n    color: #aaa;\r\n    font-family: \"Proxima Nova\", sans-serif;\r\n    font-size: 1.1em;\r\n    font-weight: normal;\r\n    margin-top: 10px;\r\n    text-transform: uppercase;\r\n}\r\ntable.sql-schema-table {\r\n    float:left;\r\n    width: auto;\r\n}\r\ntable.sql-schema-table .column-type-wrap {\r\n    float: right;\r\n    margin-left: 20px;\r\n    min-width: 70px;\r\n}\r\ntable.sql-schema-table .schema-pk {\r\n    color: #999;\r\n}\r\ntable.sql-schema-table .schema-column-type {\r\n    float: left;\r\n    color: #999;\r\n}\r\ntable.sql-schema-table + table.sql-schema-table {\r\n    margin-left: 10px\r\n}\r\ntable.sql-schema-table .row-count {\r\n    color: #999;\r\n    float: right;\r\n    margin-left: 30px;\r\n    text-align: right;\r\n    font-weight: normal;\r\n}\r\n</style>\r\n</head>\r\n\r\n<body>\r\n<div class=\"sql-output\">\r\n    ";
  foundHelper = helpers.tables;
  stack1 = foundHelper || depth0.tables;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  foundHelper = helpers.tables;
  stack1 = foundHelper || depth0.tables;
  stack2 = helpers.each;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  foundHelper = helpers.results;
  stack1 = foundHelper || depth0.results;
  stack2 = helpers['if'];
  tmp1 = self.program(11, program11, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  foundHelper = helpers.results;
  stack1 = foundHelper || depth0.results;
  stack2 = helpers.each;
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n</body>\r\n</html>\r\n";
  return buffer;});;
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["live-editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return " no-output";}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <iframe id=\"output-frame\"\r\n                    src=\"";
  foundHelper = helpers.execFile;
  stack1 = foundHelper || depth0.execFile;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "execFile", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"\r\n                    data-src=\"";
  foundHelper = helpers.execFile;
  stack1 = foundHelper || depth0.execFile;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "execFile", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"></iframe>\r\n            ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "Loading...";}

function program7(depth0,data) {
  
  
  return "Loading...";}

function program9(depth0,data) {
  
  
  return "Enable Flash to load audio:";}

function program11(depth0,data) {
  
  
  return "Play";}

function program13(depth0,data) {
  
  
  return "Hmm...";}

function program15(depth0,data) {
  
  
  return "Restart";}

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    <a href=\"\" class=\"draw-color-button\" id=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\r\n                        <span></span>\r\n                    </a>\r\n                    ";
  return buffer;}

function program19(depth0,data) {
  
  
  return "Record";}

function program21(depth0,data) {
  
  
  return "Loading audio...";}

  buffer += "<div class=\"scratchpad-wrap";
  foundHelper = helpers.execFile;
  stack1 = foundHelper || depth0.execFile;
  stack2 = helpers.unless;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n    <!-- Canvases (Drawing + Output) -->\r\n    <div class=\"scratchpad-canvas-wrap\">\r\n        <div id=\"output\">\r\n            <!-- Extra data-src attribute to work around\r\n                 cross-origin access policies. -->\r\n            ";
  foundHelper = helpers.execFile;
  stack1 = foundHelper || depth0.execFile;
  stack2 = helpers['if'];
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <canvas class=\"scratchpad-draw-canvas\" style=\"display:none;\"\r\n                width=\"400\" height=\"400\"></canvas>\r\n\r\n            <div class=\"overlay disable-overlay\" style=\"display:none;\">\r\n            </div>\r\n\r\n            <div class=\"scratchpad-canvas-loading\">\r\n                <img src=\"";
  foundHelper = helpers.imagesDir;
  stack1 = foundHelper || depth0.imagesDir;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imagesDir", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/spinner-large.gif\">\r\n                <span class=\"hide-text\">";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Editor -->\r\n    <div class=\"scratchpad-editor-wrap overlay-container\">\r\n        <div class=\"scratchpad-editor-tabs\">\r\n          <div id=\"scratchpad-code-editor-tab\" class=\"scratchpad-editor-tab\">\r\n            <div class=\"scratchpad-editor scratchpad-ace-editor\"></div>\r\n            <div class=\"overlay disable-overlay\" style=\"display:none;\">\r\n            </div>\r\n\r\n            <div class=\"scratchpad-editor-bigplay-loading\" style=\"display:none;\">\r\n                <img src=\"";
  foundHelper = helpers.imagesDir;
  stack1 = foundHelper || depth0.imagesDir;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imagesDir", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/spinner-large.gif\">\r\n                <span class=\"hide-text\">";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </div>\r\n\r\n            <!-- This cannot be removed, if we want Flash to keep working! -->\r\n            <div id=\"sm2-container\">\r\n                ";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                <br>\r\n            </div>\r\n\r\n            <button class=\"scratchpad-editor-bigplay-button\" style=\"display:none;\">\r\n                <span class=\"icon-play\"></span>\r\n                <span class=\"hide-text\">";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(11, program11, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"scratchpad-toolbar editor-toolbar\">\r\n            <span class=\"vam vam-trick\"></span>\r\n                <span class=\"error-buddy-resting vam\">\r\n                    <span class=\"error-buddy-happy vam\" style=\"display:none;\">\r\n                        <img class=\"vam\" src=\"";
  foundHelper = helpers.imagesDir;
  stack1 = foundHelper || depth0.imagesDir;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imagesDir", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/creatures/OhNoes-Happy.png\"/>\r\n                    </span>\r\n                    <a class=\"error-buddy-thinking vam\" style=\"display:none;\" href=\"javascript:void()\">\r\n                        <img src=\"";
  foundHelper = helpers.imagesDir;
  stack1 = foundHelper || depth0.imagesDir;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "imagesDir", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/creatures/OhNoes-Hmm.png\"/>\r\n                        ";
  buffer += "\r\n                        <span class=\"error-buddy-hmm\">";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n                    </a>\r\n                </span>\r\n                <span style=\"float:right\">\r\n                <span class=\"vam vam-trick\" style=\"height:47px\"></span>\r\n                    <a id=\"restart-code\" href=\"javascript:void(0)\"\r\n                        class=\"simple-button\">\r\n                        <span class=\"icon-refresh\"><svg class=\"restartIcon\" focusable=\"false\" width=\"1.000020000400008em\" height=\"1em\" viewBox=\"0 0 100 99.998\"><path fill=\"currentColor\" d=\"M50.046 83.391q8.778 0 16.302-4.218t12.084-11.685q.741-1.083 3.477-7.638.513-1.482 1.938-1.482l12.483 0q.855.057 1.482.627t.627 1.14-.057.741q-4.104 17.499-17.442 28.329t-31.179 10.83q-9.519 0-18.411-3.591t-15.846-10.203l-8.379 8.379q-1.254 1.254-2.964 1.254-1.653 0-2.907-1.254t-1.254-2.907l0-29.184q0-1.71 1.254-2.964t2.907-1.197l29.184 0q1.71 0 2.964 1.254 1.197 1.197 1.197 2.907t-1.197 2.907l-8.949 8.949q9.747 9.006 22.686 9.006zm49.989-75.069l0 29.184q.057 1.71-1.197 2.964t-2.964 1.197l-29.184 0q-1.71 0-2.964-1.254t-1.197-2.907q0-1.71 1.254-2.907l9.006-9.006q-9.633-8.949-22.743-8.949-8.721.057-16.302 4.275t-12.141 11.628q-.741 1.083-3.42 7.638-.513 1.482-1.938 1.482l-12.996 0q-.855 0-1.482-.627t-.57-1.425l0-.456q4.218-17.442 17.556-28.272t31.293-10.887q9.462 0 18.468 3.591t15.96 10.203l8.493-8.379q1.197-1.254 2.907-1.254t2.964 1.254 1.197 2.907z\"></path></svg></span>\r\n                        ";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(15, program15, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\r\n                </span>\r\n\r\n                <!-- Widgets for selecting colors to doodle on the canvas during\r\n                    recordings -->\r\n                <div id=\"draw-widgets\" style=\"display:none;\">\r\n                    <a href=\"\" id=\"draw-clear-button\" class=\"ui-button\">\r\n                        <span class=\"ui-icon-cancel\"></span>\r\n                    </a>\r\n                    ";
  foundHelper = helpers.colors;
  stack1 = foundHelper || depth0.colors;
  stack2 = helpers.each;
  tmp1 = self.program(17, program17, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </div>\r\n\r\n                <!-- Record button -->\r\n                <button id=\"record\" class=\"simple-button pull-left\" style=\"display:none;\">";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(19, program19, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"scratchpad-toolbar\">\r\n            <!-- Row for playback controls -->\r\n            <div class=\"scratchpad-playbar\" style=\"display:none;\">\r\n                <div class=\"scratchpad-playbar-area\" style=\"display:none;\">\r\n                    <button\r\n                        class=\"simple-button primary scratchpad-playbar-play\"\r\n                        type=\"button\">\r\n                        <span class=\"icon-play\"></span>\r\n                    </button>\r\n\r\n                    <div class=\"scratchpad-playbar-progress\"></div>\r\n\r\n                    <span class=\"scratchpad-playbar-timeleft\"></span>\r\n                </div>\r\n                <div class=\"loading-msg\">\r\n                    ";
  foundHelper = helpers['_'];
  stack1 = foundHelper || depth0['_'];
  tmp1 = self.program(21, program21, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </div>\r\n            </div>\r\n            <div class=\"scratchpad-debugger\"></div>\r\n        </div>\r\n\r\n        <div class=\"scratchpad-toolbar scratchpad-dev-record-row\" style=\"display:none;\"></div>\r\n    </div>\r\n</div>";
  return buffer;});;
this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["tipbar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "&times;";
  }

function program3(depth0,data) {
  
  
  return "Oh noes!";
  }

function program5(depth0,data) {
  
  
  return "Show me where";
  }

function program7(depth0,data) {
  
  
  return "Previous error";
  }

function program9(depth0,data) {
  
  
  return "Next error";
  }

  buffer += "<div class=\"tipbar\">\r\n    <div class=\"error-buddy\"></div>\r\n    \r\n    <div class=\"text-wrap\">\r\n        <button class=\"close\" type=\"button\" aria-label=\"Close\">";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.i18nDoNotTranslate) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.i18nDoNotTranslate); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.i18nDoNotTranslate) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\r\n        <div class=\"oh-no\">";
  options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n        <div class=\"message\"></div>\r\n        <a class=\"show-me\" href>";
  options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\r\n        <div class=\"tipnav\" style=\"display: none\">\r\n            <a href=\"javascript:void(0);\" class=\"prev ui-icon ui-icon-circle-triangle-w\" title=\"";
  options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></a>\r\n            <span class=\"current-pos\"></span>\r\n            <a href=\"javascript:void(0);\" class=\"next ui-icon ui-icon-circle-triangle-e\" title=\"";
  options={hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></a>\r\n        </div>\r\n        <div class=\"speech-arrow\"></div>\r\n    </div>\r\n</div>";
  return buffer;
  });;
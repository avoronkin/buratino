define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/scripts/core/templates/menu-item.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<a href="' +((__t = (data.pageLink)) == null ? '' : __t) +'" '; if(data.active){;__p += 'class="active"';};__p += ' >' +((__t = (data.pageName)) == null ? '' : __t) +'</a>\n';return __p};

  this["JST"]["app/scripts/core/templates/menu.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<section class="top-bar-section">\n<ul class="left">\n'; _.each(data.items, function(item){;__p += '\n    <li ';if(item.active){;__p += 'class="active"';};__p += '>\n        <a href="' +((__t = (item.pageLink)) == null ? '' : __t) +'">' +((__t = (item.pageName)) == null ? '' : __t) +'</a>\n    </li>\n';});__p += '\n</ul>\n';return __p};

  this["JST"]["app/scripts/mainApp/pages/main-page.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="row">\n   <div class="large-4 columns">sidebar</div>\n   <div class="large-8 columns"><h2>welcom!</h2></div>\n</div> \n';return __p};

  this["JST"]["app/scripts/mainApp/pages/test-page.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="row">\n    <h2>eest page!</h2>\n</div>\n';return __p};

  this["JST"]["app/scripts/mainApp/pages/test-sub-page.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="row">\n    <h2>test sub page!</h2>\n</div>\n';return __p};

  this["JST"]["app/scripts/mainApp/pages/test-sub-page2.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="row">\n    <h2>test sub page2!</h2>\n</div>\n';return __p};

  return this["JST"];

});
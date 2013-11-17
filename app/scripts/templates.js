define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/scripts/core/templates/menu-item.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<li><a href="' +((__t = (data.pageLink)) == null ? '' : __t) +'">' +((__t = (data.pageName)) == null ? '' : __t) +'</a></li>\n';return __p};

  this["JST"]["app/scripts/core/templates/menu.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<ul class="items"> </ul>\n';return __p};

  this["JST"]["app/scripts/mainApp/pages/main-page.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>welcom!</h2>\n';return __p};

  this["JST"]["app/scripts/mainApp/pages/test-page.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>eest page!</h2>\n';return __p};

  return this["JST"];

});
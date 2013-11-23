'use strict';

define(function(require){
    var JST = require('JST');
    var config = {};
    config.outerTpl  = JST['app/scripts/core/menu/templates/foundation/sidenav/outerTpl.ejs'];
    config.tagName = 'div';
    config.className = '';


    return config;
});

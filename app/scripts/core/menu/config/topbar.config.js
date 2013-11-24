'use strict';

define(function(require){
    var config = {};
    config.outerTpl  = require('jst!../templates/foundation/topbar/outerTpl.ejs');
    config.tagName = 'nav';
    config.className = 'top-bar';


    return config;
});

'use strict';

define(function(require){
    var BaseView = require('core/views/BaseView');
    var template = require('jst!./template.ejs');

    return BaseView.extend({
        template: template
    });
});

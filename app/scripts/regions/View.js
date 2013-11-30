'use strict';

define(function(require){
    var BaseView = require('core/views/BaseView');
    var template = require('jst!core/templates/default.ejs');

    return BaseView.extend({
        template: template
    });
});

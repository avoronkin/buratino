'use strict';
define(function (require) {
    var BaseView = require('../BaseView');
    var template = require('jst!./templates/default.ejs');

    var PageView = BaseView.extend({
        template: template
    });

    return PageView;
});

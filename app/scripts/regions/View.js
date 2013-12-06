'use strict';

define(function (require) {
    var BaseView = require('core/views/BaseView');
    var Factory = require('adviceFactory');
    var template = require('jst!core/templates/default.ejs');

    return Factory.register('view2', {
        base: 'view',
        template: template
    });
});

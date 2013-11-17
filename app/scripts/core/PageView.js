'use strict';
define(function (require) {
    var BaseView = require('./BaseView');

    var PageView = BaseView.extend({
        constructor: function(options){
            this.options = options;
            BaseView.apply(this,arguments);
        }

    });

    return PageView;
});

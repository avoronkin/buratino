'use strict';

define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');

    var Region = function (options) {
        this.options = options || {};

        if (!this.options.el) {
            throw new Error('An "el" must be specified for a region.');
        }

        this.el = this.options.el;

    };

    _.extend(Region.prototype, {
        show: function (view) {
            console.log('show view', view);
            if (this.currentView && (view !== this.currentView) && _.isFunction(this.currentView.close)) {
                this.currentView.close();
            }
            view.setElement($(this.el));
            view.render();
//            this.attachView(view);
            this.currentView = view;
        },
        attachView: function (view) {
            $(this.el).empty().append(view.el);
        },
        close: function () {
            if (this.currentView && _.isFunction(this.currentView.close)) {
                this.currentView.close();
            }
        }
    });

    return Region;
});

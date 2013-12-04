'use strict';

define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');


    var Region = function (options) {
        this.options = options || {};
        this.el = this.options.el;
    };

    _.extend(Region.prototype, {

        show: function (view) {
            console.log('show view', view);
            if (this.currentView && (view !== this.currentView) && _.isFunction(this.currentView.remove)) {
                this.currentView.remove();
            }
            this.attachView(view);
            this.currentView = view;
        },

        attachView: function (view) {
            console.log('attachView', view, this.el)
            if (view.keepEl) {
                view.setElement($(this.el))
                    .render();
            } else {
                $(this.el)
                    .html(view.render()
                        .el);
            }
        },

        close: function () {
            if (this.currentView && _.isFunction(this.currentView.remove)) {
                this.currentView.remove();
            }
        }
    });

    return Region;


});

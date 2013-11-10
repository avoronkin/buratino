'use strict';

define(function (require) {
    var $ = require('jquery');
    var mediator = require('mediator');

    var pageManager = {

        start: function (options) {
            options || (options = {});
            this.el = options.el ? options.el : '.main-content';

            mediator.on('page:change', function (opt) {
                //console.log('page:change', opt);
                this.showView(opt.view);

                if (opt.view.onOpen) {
                    opt.view.onOpen();
                }

            }, this);

        },

        showView: function (view) {
            if (this.currentView && (view !== this.currentView) && this.currentView.close) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
            $(this.el).html(this.currentView.el);
        }

    };


    return pageManager;
});

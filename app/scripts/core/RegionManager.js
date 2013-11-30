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


    var regions = {};

    var RegionManager = function () {
        this.initialize.apply(this);
    };

    _.extend(RegionManager.prototype, {

        initialize: function () {},

        addRegion: function (el) {
            var region = regions[el] = new Region({
                el: el
            });
            return region;
        },

        addRegions: function (regions) {
            _.each(regions, this.addRegion, this);
        },

        showRegions: function (regions) {
            _.each(regions, this.showRegion, this);
        },

        showRegion: function (opt, el) {
            var View = opt.view;
            var viewOptions = opt.viewOptions || {};
            var region = this.getRegion(el);

            region.show(new View(viewOptions));
        },

        closeAllRegions: function () {
            _.invoke(regions, 'close');
        },

        getRegion: function (el) {
            return regions[el];
        },

        removeRegion: function (el) {
            regions[el].close();
            delete regions[el];
        },

    });

    return RegionManager;
});

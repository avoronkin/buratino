'use strict';

define(function (require) {
    var RegionManager = require('core/RegionManager');
    var _ = require('underscore');

    var regionsMixin = function () {

        this.before('initialize', function (options) {
            this.regions = options.regions || {};

            this.regionManager = new RegionManager();
            if(_.isArray(options.regions)){
                var els = _.map(options.regions, function(obj){
                    return _.keys(obj);
                });

                this.regionManager.addRegions(els);
            }
        });

        this.around('render', function (render) {
            render();
            this.regionManager.showRegions(this.regions);
            return this;
        });

        this.before('remove', function () {
            this.regionManager.closeAllRegions();
        });

    };

    return regionsMixin;
});

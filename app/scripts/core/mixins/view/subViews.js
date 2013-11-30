'use strict';

define(function (require) {
    var RegionManager = require('core/RegionManager');

    var regionsMixin = function () {

        this.before('initialize', function (options) {
            this.regions = options.regions || {};

            this.regionManager = new RegionManager();
            this.regionManager.addRegions(options.regions);
        });

        this.around('render', function (render) {
            render();
            this.regionManager.showRegions(this.regions);
            return this;
        });

        this.before('close', function () {
            this.regionManager.closeAllRegions();
        });

    };

    return regionsMixin;
});

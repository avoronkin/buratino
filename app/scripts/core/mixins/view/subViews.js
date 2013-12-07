'use strict';

define(function (require) {
    var RegionManager = require('core/RegionManager');
    var _ = require('underscore');

    var regionsMixin = function () {

        this.before('initialize', function (options) {
            this.regions = options.regions || {};
            this.regionsEls = _.keys(this.regions);
            this.regionManager = new RegionManager();
            this.regionManager.addRegions(this.regionsEls);
        });

        this.setDefaults({
            renderSubViews: function(){
                this.regionManager.showRegions(this.regions);
            }
        });

        this.around('render', function (render) {
            render();
            this.renderSubViews();
            return this;
        });

        this.before('remove', function () {
            this.regionManager.closeAllRegions();
        });

    };

    return regionsMixin;
});

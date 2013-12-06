'use strict';

define(function (require) {
    var _ = require('underscore');
    var Region = require('core/Region');

    var _regions = {};

    var RegionManager = function () {
        this.initialize.apply(this);
    };

    _.extend(RegionManager.prototype, {

        initialize: function () {},

        addRegion: function (el) {
            _regions[el] = new Region({
                el: el
            });

            return _regions[el];
        },

        addRegions: function (regionsEls) {
            _.each(regionsEls, this.addRegion, this);
        },

        showRegion: function (value, el) {
            var View = value.view;
            var viewOptions = value.viewOptions || {};
            var region = this.getRegion(el);

            if(region){
                region.show(new View(viewOptions));
            }
        },

        showRegions: function (regions) {
            if(!_.isEmpty(regions)){
                _.each(regions, this.showRegion, this);
            }
        },

        closeAllRegions: function () {
            _.invoke(_regions, 'close');
        },

        getRegion: function (el) {
            return _regions[el];
        },

        removeRegion: function (el) {
            _regions[el].close();
            delete _regions[el];
        },

    });

    return RegionManager;
});

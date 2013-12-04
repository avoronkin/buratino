'use strict';

define(function (require) {
    var _ = require('underscore');
    var Region = require('core/Region');

    var regions = {};

    var RegionManager = function () {
        this.initialize.apply(this);
    };

    _.extend(RegionManager.prototype, {

        initialize: function () {},

        addRegion: function (el) {
            var region = regions[el] = new Region({
                el: el[0]
            });
            console.log('addRegion', el, regions, arguments)
            return region;
        },

        addRegions: function (els) {
            console.log('addRegions', els);
            if(_.isArray(els)){
                _.each(els, this.addRegion, this);
            }
        },

        showRegions: function (regions) {
            console.log('showRegions', regions);
            if(!_.isEmpty(regions)){
                _.each(regions, this.showRegion, this);
            }
        },

        showRegion: function (obj) {
            var el = (_.keys(obj))[0];
            var View = obj[el].view;
            var viewOptions = obj[el].viewOptions || {};
            console.log('showRegion', View)
            var region = this.getRegion(el);
            if(region){
                region.show(new View(viewOptions));
            }
        },

        closeAllRegions: function () {
            _.invoke(regions, 'close');
        },

        getRegion: function (el) {
            console.log('getRegion', regions, el)
            return regions[el];
        },

        removeRegion: function (el) {
            regions[el].close();
            delete regions[el];
        },

    });

    return RegionManager;
});

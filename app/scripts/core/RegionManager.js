'use strict';

define(function (require) {
    var _ = require('underscore');
    var Region = require('core/Region');
    var Backbone = require('backbone');

    var RegionManager = function () {
    };

    _.extend(RegionManager.prototype, Backbone.Events, {
        addRegion: function (name, el) {
            //console.log('addRegion',name, el);
            var region = this._regions[name] = new Region({el: el});
            this.trigger('region:add', name, region);
            return region;
        },
        addRegions: function (regions) {
            _.each(regions, function (el, name) {
                this.addRegion(name, el);
            }, this);
        },
        getRegion: function (name) {
            return this._regions[name];
        },
        removeRegion: function (name) {
            this._regions[name].close();
            delete this._regions[name];
            this.trigger('region:remove', name);
        },

    }, {
        _regions: {},
    });

    return RegionManager;
});

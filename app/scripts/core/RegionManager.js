'use strict';

define(function (require) {
    var _ = require('underscore');
    var Region = require('core/Region');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var RegionManager = function () {
        this._mediator = mediator;
        this.initialize.apply(this);
    };

    _.extend(RegionManager.prototype, Backbone.Events, {
        initialize: function(){},
        addRegion: function (name, el) {
            var region = this._regions[name] = new Region({el: el});
            this._mediator.trigger('region:add', name, region);
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
            this._mediator.trigger('region:remove', name);
        },

    }, {
        _regions: {},
    });

    return RegionManager;
});

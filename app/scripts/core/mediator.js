'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var _ = require('underscore');

    var mediator = _.extend({}, Backbone.Events);
    return mediator;
});

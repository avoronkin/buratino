'use strict';

var _ = require('underscore');
var mediator = require('./mediator');
// var Activity = require('./Activity');
var Backbone = require('backbone');

var App = function (options) {
    options = options || {};
    this._name = options.name || 'App';
    this._slug = options.slug || '';
    this._originalSlug = this._slug;
    this._parentCid = 'root';
    this._apps = [];
    this.structure = options.structure;
    this.addActivities(options.activities || [], this._parentCid);
};


_.extend(App.prototype, {

    mount: function (slug, app) {
        this._apps.push(app);
        this._originalSlug = slug;
        app._slug = this._slug + '/' + slug;
        app._parentCid = this._cid;
    },

    toString: function () {
        return this._name;
    },

    addActivity: function (activity, parentCid) {
        activity.appName = this._name;
        activity.parentCid = (parentCid || this._parentCid);

        var activityModel = this.structure.add(_.omit(activity, 'activities'));

        if (!activityModel.get('slug')) {
            this._cid = activityModel.cid;
            activityModel.set('slug', this._originalSlug)
        }

        if (_.isArray(activity.activities)) {
            this.addActivities(activity.activities, activityModel.get('cid'));
        }
    },

    addActivities: function (activities, parentCid) {
        _.each(activities, function (activity) {
            this.addActivity(activity, parentCid);
        }, this);
    },

    setActivityRoute: function (activity) {
        var route = this.calulateActivityRoute(activity);

        if (route !== false) {
            route = this._slug + route;
            route = route ? route : '/';
            activity.set('route', route);

            mediator.trigger('route:register', activity);
        }
    },

    setActivitiesRoutes: function () {
        this.structure
            .chain()
            .filter(function (activity) {
                return this._name === activity.get('appName');
            }, this)
            .each(this.setActivityRoute, this);
    },

    calulateActivityRoute: function (activity) {
        var route = false;

        if (activity && activity.has('slug')) {
            var models = activity.getPatch();

            route = _.reduce(models, function (memo, model) {
                var slug = model.get('slug');
                if (slug) {
                    memo = memo + '/' + slug;
                }
                return memo;
            }, '');
        }

        return route;
    },

    startSubApps: function () {
        _(this._apps).invoke('start');
    },

    start: function () {
        this.setActivitiesRoutes();
        this.startSubApps();

        return this;
    }

});

App.extend = Backbone.Model.extend;

module.exports = App;

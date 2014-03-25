var View = require('../View');
var template = require('./breadcrumbs.html');
var _ = require('underscore');

module.exports = View.extend({
    template: template,
    data: function () {
        var items = [];

        var current = this.collection.getCurrent();

        if (current) {
            var models = current.getPatch();

            if (models) {
                items = _.map(models, function (model) {
                    return model.toJSON();
                });
            }
        }

        return {
            items: items
        };
    }

});

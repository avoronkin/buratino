'use strict';

define(function () {
    var _ = require('underscore');

    var keepEl = function () {
        this.before('initialize', function (options) {
            this.keepEl = !_.isUndefined(options.keepEl) ? options.keepEl : true;
        });

        this.clobber({
            remove: function () {
                if (this.keepEl) {
                    this.$el.html('');
                } else {
                    this.$el.remove();
                }

                this.stopListening();
                return this;
            }
        });
    };

    return keepEl;
});

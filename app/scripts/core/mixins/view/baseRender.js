'use strict';

define(function () {
    return function () {

        this.setDefaults({

            template: '',

            getRenderedTemplate: function () {
                return this.template;
            }

        });


        this.clobber({

            render: function () {
                this.$el.html(this.getRenderedTemplate());
                return this;
            }

        });

    };
});

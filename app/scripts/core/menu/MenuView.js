'use strict';

define(function (require) {
    var BaseView = require('core/views/BaseView');
    var _ = require('underscore');

    var Factory = require('adviceFactory');

    var MenuView = Factory.register('menu',{
        base: 'view',
        
        initialize: function (options) {
            console.log('men view', arguments);
            this.template = options.outerTpl;
            this.listenTo(this.collection, 'add remove change', this.render);
        },
        
        setOuterTpl: function(tmpl){
            this.template = tmpl;
        },

        clobber: {

            data: function () {
                var data = {};
                if (this.options.parentName) {
                    var models = this.collection.filter(function (model) {
                        if(this.options.parentName === 'root'){
                            return !model.get('parentName');
                        }else{
                            return model.get('parentName') === this.options.parentName;
                        }
                    }, this);
                    data.items = _.map(models, function (model) {
                        return model.toJSON();
                    });
                } else {
                    data.items = this.collection.toJSON();
                }

                return data;
            },

            toString: function () {
                return 'MenuView';
            }
        }
    });

    return MenuView;

});

'use strict';

define(function (require) {
    // var _ = require('underscore');
    var Factory = require('adviceFactory');
    var template = require('jst!./tree.html');
    var BaseView = require('core/views/BaseView');

    var Tree = Factory.register('tree', {
        base: 'view',

        initialize: function () {
            this.listenTo(this.collection, 'add remove changed', this.render);
        },

        clobber: {
            template: template,

            data: function () {
                var data = {};
                var tree = {};
                var root;
                var current = this.collection.getCurrent();

                if(current){
                    root = current.getRoot();
                    if(root){
                        tree = root.getTree();               
                    }
                }

                data.tree = tree || {};
                data.template = this.template;

                return data;
            },

            toString: function () {
                return 'Tree';
            }
        }
    });

    return Tree;



});

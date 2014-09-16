'use strict';

var Backbone = require('backbone');
var treeModelMixin = require('backbone.model.tree.mixin');
var _ = require('underscore');


var Activity = Backbone.Model.extend(_.extend(treeModelMixin, {
  nodeId: 'cid',

  nodeParentId: 'parentCid',

  initialize: function() {
    this.set('cid', this.cid);
  },

  getTitle: function(params) {
    return _.isFunction(this.get('title')) ? this.get('title')(params) : this.get('title');
  },

  getUrl: function(params){
    return this.route.interpolate(params);
  },

  hasChildren: function() {
    var cid = this.get('cid');

    var children = this.collection.filter(function(model) {
      return cid === model.get('parentCid');
    });

    return !!children.length;
  }
}));

module.exports = Activity;

'use strict';

var Views = require('buratino').Views;
var ListView = Views.List;
var View = Views.View;
var template = require('./nav-outer.html');
var itemTemplate = require('./nav-item.html');

var TopMenuItem = View.extend({
    className: function () {
        var className = this.model.get('here') ? 'active' : '';
        return className;
    },
    tagName: 'li',
    template: itemTemplate,
    data: function () {
        return this.model.toJSON();
    }

});

module.exports = ListView.extend({
    template: template,
    containerSelector: '.top-menu-container',
    itemView: TopMenuItem,
    getItems: function () {
        var data = {};
        data = this.collection.models;
        return data;
    }
});

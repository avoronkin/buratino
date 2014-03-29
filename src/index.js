var App = require('./App');
var mediator = require('./mediator');
var Page = require('./Page');
var Router = require('./Router');
var Structure = require('./Structure');

var View = require('./views/View');
var Layout = require('./views/LayoutView');
var List = require('./views/ListView');

module.exports = {
    App: App,
    Structure: Structure,
    Page: Page,
    Router: Router,
    mediator: mediator,
    Views: {
        View: View,
        Layout: Layout,
        List: List
    }
};

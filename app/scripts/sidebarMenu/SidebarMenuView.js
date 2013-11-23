'use strict';

define(function(require){
    var MenuView = require('../core/menu/MenuView');
    var mediator = require('../core/mediator');

    var SMView = MenuView.extend({
        constructor: function(){
            MenuView.apply(this, arguments);
            mediator.on('page:change',function(page){
                console.log('sbm page:change', arguments);
                this.options.parentName = page.view.options.name;
                this.render();
            }, this);
        }
    });

    return SMView;
});

'use strict';

define(function(require){
    var MenuView = require('../core/menu/MenuView');
    var mediator = require('../core/mediator');

    var SMView = MenuView.extend({
        constructor: function(){
            MenuView.apply(this, arguments);
            mediator.on('page:change',function(page){
                this.options.parentName = page.name;
                this.render();
            }, this);
        }
    });

    return SMView;
});

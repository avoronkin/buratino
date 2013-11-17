'use strict';

define(function(require){
    var MenuView = require('../core/MenuView');

    var TopMenu = MenuView.extend({

        template: _.template(''),
        data: function(){
            return {}; 
        },
        toString: function(){
            return 'TopMenu';
        }
    
    });
    
    return TopMenu;
});

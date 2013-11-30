'use strict';

define(function(){
    return function(){
        this.setDefaults({
            afterRender: function(){}
        });

        this.after('render', function(){
            this.afterRender();
        });
    };
});

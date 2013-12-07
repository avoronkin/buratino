'use strict';

define(function (require) {
    var _ = require('underscore');


    var helpers = function () {

        this.setDefaults({
            getHelpers: function() {
                return {};
            }
        });

        this.around('data', function(d){
            var data = d();
            var helpers = this.getHelpers();

            data = _.extend(data, helpers);
//            console.log('data', data);
            
            return data;
        });

    };


    return helpers;
});

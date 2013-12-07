'use strict';

define(function(require){
    var outerTpl  = require('jst!core/menu/templates/foundation/topbar/outerTpl.ejs');
    var structure = require('models/structure');

    return {
        outerTpl: outerTpl,
        collection: structure,
        parentName: 'root'
    };

});

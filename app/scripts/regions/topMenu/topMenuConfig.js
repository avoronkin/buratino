'use strict';

define(function(require){
    var outerTpl  = require('jst!core/menu/templates/foundation/topbar/outerTpl.ejs');
    var structure = require('core/Structure');

    return {
        outerTpl: outerTpl,
        collection: structure,
        parentName: 'root'
    };

});

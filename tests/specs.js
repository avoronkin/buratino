'use strict';

define(function (require) {
    console.log('test init');

    require('specs/mixins/model/tree-model.test.js');

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});

/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    var idb = require('data/idb');

    /**
     * init should be called first and wait for loadIndexedDB completed before calling other methods
     */
    exports.init = function (op) {
        idb.loadIndexedDB(op);
    };
});
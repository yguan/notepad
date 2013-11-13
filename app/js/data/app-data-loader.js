/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    var idb = require('data/idb'),
        themeRepo = require('data/theme-repository');

    /**
     * init should be called first and wait for loadIndexedDB completed before calling other methods
     */
    exports.init = function (op) {
        idb.loadIndexedDB({
            success: function () {
                themeRepo.get(1, {
                    success: function (theme) {
                        if (!theme) {
                            themeRepo.create({
                                id: 1,
                                bgColor: '#220e58'
                            }, op);
                        } else {
                            op.success();
                        }
                    },
                    failure: op.failure
                });
            },
            failure: op.failure
        });
    };
});
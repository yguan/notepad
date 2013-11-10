/*jslint nomen: true*/
/*global $,define,require,angular,window,console */

define(function (require, exports, module) {
    'use strict';

    exports.noop = function () {
    };

    exports.error = function (error) {
        console.log(error);
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,document */

define(function (require, exports, module) {
    'use strict';

    var themeRepo = require('data/theme-repository'),
        genericHandlers = require('view/generic-handlers');

    function setBgColor(color) {
        $('body').css('background-color', color);
    }

    exports.init = function () {
        themeRepo.get(1, {
            success: function (theme) {
                setBgColor(theme.bgColor);
            },
            failure: genericHandlers.error
        });
    };

    exports.setBgColor = function (color) {
        var theme = {
            id: 1,
            bgColor: color
        };

        setBgColor(color);

        themeRepo.update(theme, {
            success: genericHandlers.noop,
            failure: genericHandlers.error
        });
    };

});
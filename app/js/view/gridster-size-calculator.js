/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    function getGridsterSize(gridsterContainerSelector) {
        var container = angular.element(gridsterContainerSelector).first();

        return {
            height: container.height(),
            width: container.width()
        };
    }

    exports.getSizeInfo = function (config) {
        var gridsterSize = getGridsterSize(config.container);

        return {
            widgetMinWidth: config.widgetMinWidth,
            widgetMinHeight: config.widgetMinHeight,
            maxColumns: Math.floor(gridsterSize.width / config.widgetMinWidth),
            maxRows: Math.floor(gridsterSize.height / config.widgetMinHeight)
        };
    };
});

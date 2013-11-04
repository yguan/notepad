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
        var gridsterSize = getGridsterSize(config.container),
            widgetWidthWithPadding = config.widgetMinWidth + config.padding || 0,
            numberOfWidget = Math.floor(gridsterSize.width / widgetWidthWithPadding),
            remainder = gridsterSize.width % widgetWidthWithPadding,
            adjustedWidgetWidth = remainder > 0 ? (remainder / numberOfWidget + config.widgetMinWidth) : config.widgetMinWidth;

        return {
            widgetMinWidth: adjustedWidgetWidth,
            widgetMinHeight: config.widgetMinHeight,
            maxColumns: Math.floor(gridsterSize.width / config.widgetMinWidth),
            maxRows: Math.floor(gridsterSize.height / config.widgetMinHeight)
        };
    };
});

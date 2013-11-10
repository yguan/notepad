/*jslint nomen: true*/
/*global $,define,require,angular,window */

(function () {
    'use strict';

    function updateGridsterItemOptions(e, ui, $widget) {
        var element = ($widget && $widget[0]) || ui.$player[0],
            widgetOptions = element.dataset,
            gridsterItemScope = angular.element(element).scope().$$childHead;

        angular.extend(gridsterItemScope.options, widgetOptions);
    }

    angular.module('angular-gridster', [])
        .directive("gridster", function () {

            return {
                restrict: "E",
                scope: {
                    options: '=options'
                },
                template: '<div class="gridster"><ul ng-transclude></ul></div>',
                transclude: true,
                replace: true,
                controller: function () {
                    var gridster = null;
                    return {
                        init: function (elem, options) {
                            var ul = elem.find("ul");
                            if (!options.draggable) {
                                options.draggable = {stop: updateGridsterItemOptions};
                            }
                            if (!options.resize) {
                                options.resize = {
                                    enabled: true,
                                    stop: updateGridsterItemOptions
                                };
                            }

                            gridster = ul.gridster(options).data('gridster');
                        },
                        addItem: function (elm, options) {
                            gridster.add_widget(elm, options.sizex, options.sizey, options.row, options.col);
                        },
                        removeItem: function (elm) {
                            gridster.remove_widget(elm);
                        }
                    };
                },
                link: function (scope, elem, attrs, controller) {
                    var defaultOptions = {
                            widget_margins: [5, 5],
                            widget_base_dimensions: [70, 70]
                        },
                        options = angular.extend(defaultOptions, scope.options);

                    return controller.init(elem, options);
                }
            };
        })
        .directive("gridsterItem", function () {

            return {
                restrict: "E",
                require: "^gridster",
                template: '<li ng-transclude></li>',
                transclude: true,
                scope: {
                    options: '=options',
                    model: '=ngModel'
                },
                replace: true,
                link: function (scope, elm, attrs, controller) {
                    controller.addItem(elm, scope.options);

                    return elm.bind("$destroy", function () {
                        controller.removeItem(elm);
                    });
                }
            };
        });
}());

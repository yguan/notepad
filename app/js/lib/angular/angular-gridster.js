/*jslint nomen: true*/
/*global $,define,require,angular,window */

(function () {
    'use strict';

    function updateGridsterWidgetOptions(gridster, scope) {
        scope.$parent.gridsterWidgetOptions = gridster.serialize();
        scope.$parent.$digest();
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
                        init: function (elem, options, scope) {
                            var ul = elem.find("ul");
                            if (!options.draggable) {
                                options.draggable = {
                                    stop: function () {
                                        updateGridsterWidgetOptions(gridster, scope);
                                    }
                                };
                            }
                            if (!options.resize) {
                                options.resize = {
                                    enabled: true,
                                    stop: function () {
                                        updateGridsterWidgetOptions(gridster, scope);
                                    }
                                };
                            }
                            gridster = ul.gridster(options).data('gridster');
                        },
                        addItem: function (elm, options) {
                            gridster.add_widget(elm, options.size_x, options.size_y, options.col, options.row);
                        },
                        removeItem: function (elm) {
                            gridster.remove_widget(elm, true);
                        }
                    };
                },
                link: function (scope, elem, attrs, controller) {
                    var defaultOptions = {
                            widget_margins: [5, 5],
                            widget_base_dimensions: [70, 70]
                        },
                        options = angular.extend(defaultOptions, scope.options);

                    return controller.init(elem, options, scope);
                }
            };
        })
        .directive("gridsterItem", ['$timeout', function ($timeout) {

            return {
                restrict: "E",
                require: "^gridster",
                template: '<li ng-transclude></li>',
                transclude: true,
                scope: {
                    options: '=options',
                    model: '=ngModel',
                    hide: '=ngHide'
                },
                replace: true,
                link: function (scope, elm, attrs, controller) {
                    controller.addItem(elm, scope.options);

                    scope.$watch('hide', function (newVal, oldVal) {
                        if (newVal === true) {
                            controller.removeItem(elm);
                        }
                    });
                }
            };
        }]);
}());

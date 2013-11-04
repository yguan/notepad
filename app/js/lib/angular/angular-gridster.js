angular.module('angular-gridster', [])
    .directive('gridster', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'AE',
            scope: {
                model: '=model',
                options: '=options'
            },
            template: '<ul><div widget ng-repeat="item in model" widget-model="item"></div></ul>',
            link: function ($scope, $element, $attributes, $controller) {
                var gridster,
                    ul = $element.find('ul'),
                    defaultOptions = {
                        widget_margins: [5, 5],
                        widget_base_dimensions: [70, 70]
                    },
                    options = angular.extend(defaultOptions, $scope.options);

                $timeout(function () {
                    gridster = ul.gridster(options).data('gridster');

                    gridster.options.draggable.stop = function (event, ui) {
                        //update model
                        angular.forEach(ul.find('li'), function (item, index) {
                            var li = angular.element(item);
                            if (li.attr('class') === 'preview-holder') return;
                            var widget = $scope.model[index];
                            widget.row = li.attr('data-row');
                            widget.col = li.attr('data-col');
                        });
                        $scope.$apply();
                    };
                });

                var attachElementToGridster = function (li) {
                    var row = li.data('row'),
                        col = li.data('col'),
                        sizex = li.data('sizex'),
                        sizey = li.data('sizey');

                    gridster.add_widget.apply(gridster, [li, sizex, sizey, row, col]);
                };
                $scope.$watch('model.length', function (newValue, oldValue) {
                    if (newValue != oldValue + 1) return; //not an add
                    var li = ul.find('li').eq(newValue - 1); //latest li element
                    $timeout(function () {
                        attachElementToGridster(li);
                    }); //attach to gridster
                });
            }
        };
    }])
    .directive('widget', [function () {
        return {
            restrict: 'AE',
            scope: { widgetModel: '=' },
            replace: true,
            template: '<li data-col="{{widgetModel.col}}" data-row="{{widgetModel.row}}" data-sizex="{{widgetModel.sizex}}" data-sizey="{{widgetModel.sizey}}">' +
                '{{widgetModel.html}}' +
                '</li>',
            link: function ($scope, $element, $attributes, $controller) {
            }
        };
    }]);
/*jslint nomen: true*/
/*global $,define,require,angular,document */

define(function (require, exports, module) {
    'use strict';

    var notes = require('view/notes'),
        theme = require('view/theme');

    function registerController(app, controller) {
        app.controller(controller.name, ['$scope', '$location', '$document', '$timeout', '$modal', '$sce', controller.controller]);
    }

    function configViewRouting(app) {
        app.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/notes', {templateUrl: 'js/view/partial/notes.html', controller: notes.name})
                .otherwise({redirectTo: '/notes'});
        });
    }

    exports.init = function () {
        theme.init();

        angular.element(document).ready(function () {
            var noteApp = angular.module('note', [
                'ngRoute',
                'ngSanitize',
                'angular-gridster',
                '$strap.directives',
                'angularFileUpload',
                'styling',
                'contenteditable',
                'colorpicker.module'
            ]);

            configViewRouting(noteApp);
            registerController(noteApp, notes);
            angular.bootstrap(document, ['note']);
        });
    };

});
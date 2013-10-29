define(function (require, exports, module) {

    var notes = require('view/notes');

    function registerController(app, controller) {
        app.controller(controller.name, ['$scope', '$location', '$document', controller.controller]);
    }

    function configViewRouting(app) {
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/notes', {templateUrl: 'js/view/notes.html', controller: notes.name})
                .otherwise({redirectTo: '/notes'});
        }]);
    }

    exports.init = function () {
        angular.element(document).ready(function () {
            var noteApp = angular.module('note', [
                'angular-carousel',
                'gridster',
                '$strap.directives',
                'bootstrap-tagsinput',
                'angularFileUpload',
                'styling'
            ]);

            configViewRouting(noteApp);
            registerController(noteApp, notes);
            angular.bootstrap(document, ['note']);
        });
    };

});

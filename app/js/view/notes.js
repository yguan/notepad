define(function (require, exports, module) {

    var noteRepo = require('data/note-repository'),
        tagGroupRepo = require('data/tag-group-repository');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location) {
        $scope.noteGroups = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
    };
});

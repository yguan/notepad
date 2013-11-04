/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        tagGroupRepo = require('data/tag-group-repository');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
                container: '.notes',
                widgetMinWidth: 200,
                widgetMinHeight: 200
            });
var count = 0;
        function getNoteConfig() {
            return {html: count++, row: 1, col: 1, sizex: 1, sizey: 1};
        }

        $scope.tooltip = {
            addNote: 'Add Note'
        };

        $scope.notes = [getNoteConfig()];

        $scope.addNote = function () {
            $scope.notes.push(getNoteConfig());
        };

        $scope.gridster = {
            options: {
                widget_margins: [5, 5],
                widget_base_dimensions: [gridsterSize.widgetMinWidth, gridsterSize.widgetMinHeight],
                min_cols: gridsterSize.maxColumns,
                resize: {enabled: true}
            }
        };
    };
});

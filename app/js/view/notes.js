/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        tagGroupRepo = require('data/tag-group-repository'),
        editNoteCtrl = require('view/edit-note');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document, $modal) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
            container: '.notes',
            widgetMinWidth: 300,
            widgetMinHeight: 250,
            padding: 5
        });

        function getDefaultGridsterItemOptions() {
            return {row: 1, col: 1, sizex: 1, sizey: 1};
        }

        function getDefaultNote() {
            return {
                note: {
                    id: 34,
                    title: '',
                    content: '',
                    dateCreated: new Date()
                },
                gridsterOptions: getDefaultGridsterItemOptions()
            };
        }

        $scope.tooltip = {
            addNote: 'Add Note'
        };

        $scope.notes = [getDefaultNote()];

        $scope.addNote = function () {
            $scope.notes.push(getDefaultNote());
        };

        $scope.gridster = {
            options: {
                widget_margins: [5, 5],
                widget_base_dimensions: [gridsterSize.widgetMinWidth, gridsterSize.widgetMinHeight],
                min_cols: gridsterSize.maxColumns,
                resize: {enabled: true}
            }
        };

        $scope.editNote = function (noteId) {
            editNoteCtrl.showEditor(noteId, $scope, $modal);
        };
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,window,console */

define(function (require, exports, module) {
    'use strict';

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        editNoteCtrl = require('view/edit-note'),
        genericHandlers = require('view/generic-handlers');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document, $timeout, $modal) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
            container: '.notes',
            widgetMinWidth: 300,
            widgetMinHeight: 250,
            padding: 5
        });

        $scope.notes = [];

        function getDefaultGridsterItemOptions() {
            return {row: 1, col: 1, sizex: 1, sizey: 1};
        }

        function getDefaultNote() {
            return {
                title: '',
                content: '',
                dateCreated: new Date(),
                gridsterOptions: getDefaultGridsterItemOptions()
            };
        }

        function addNote() {
            noteRepo.add(getDefaultNote(), {
                success: function (note) {
                    $scope.notes.push(note);
                    $scope.$apply();
                },
                failure: genericHandlers.error
            });
        }

        function getNotes() {
            noteRepo.getAll({
                success: function (notes) {
                    if (notes.length > 0) {
                        $scope.notes = notes;
                    } else {
                        addNote();
                    }
                    $scope.$apply();
                },
                failure: genericHandlers.error
            });
        }

        getNotes();

        $scope.addNote = addNote;

        $scope.gridster = {
            options: {
                widget_margins: [5, 5],
                widget_base_dimensions: [gridsterSize.widgetMinWidth, gridsterSize.widgetMinHeight],
                min_cols: gridsterSize.maxColumns
            }
        };

        $scope.editNote = function (note) {
            editNoteCtrl.showEditor(note, $scope, $timeout, $modal);
        };
    };
});

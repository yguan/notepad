/*jslint nomen: true*/
/*global $,define,require,angular,window,console,_ */

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

        function saveLayout(notes, gridsterWidgetOptions) {
            _.each(notes, function (note, index) {
                angular.extend(note.gridsterOptions, gridsterWidgetOptions[index]);
            });
            noteRepo.updateAll(notes, {success: genericHandlers.noop, failure: genericHandlers.error});
        }

        function getNotes() {
            noteRepo.getAll({
                success: function (notes) {
                    if (notes.length > 0) {
                        $scope.notes = _.sortBy(notes, function (note) {
                            return note.gridsterOptions.row;
                        });
                        $scope.$apply();
                    }
                },
                failure: genericHandlers.error
            });
        }

        getNotes();

        $scope.isAddingNote = false;

        $scope.addNote = function () {
            if ($scope.isAddingNote) {
                return;
            }
            noteRepo.add(getDefaultNote(), {
                success: function (note) {
                    $scope.notes.push(note);
                    $scope.$apply();
                    $scope.isAddingNote = false;
                },
                failure: function (error) {
                    genericHandlers.error(error);
                    $scope.isAddingNote = false;
                }
            });
            $scope.isAddingNote = true;
        };

        $scope.gridster = {
            options: {
                widget_margins: [5, 5],
                widget_base_dimensions: [gridsterSize.widgetMinWidth, gridsterSize.widgetMinHeight],
                min_cols: gridsterSize.maxColumns
            }
        };
        $scope.gridsterWidgetOptions = [];

        $scope.$watch('gridsterWidgetOptions', function (newVal, oldVal) {
            if (newVal.length > 0) {
                saveLayout($scope.notes, newVal);
            }
        });

        $scope.editNote = function (note) {
            editNoteCtrl.showEditor(note, $scope, $timeout, $modal);
        };

        $scope.deleteNote = function (note) {
            var index = _.indexOf($scope.notes, note);
            $scope.notes.splice(index, 1);

            noteRepo.remove(note.id, { success: genericHandlers.noop, failure: genericHandlers.error });
        };
    };
});

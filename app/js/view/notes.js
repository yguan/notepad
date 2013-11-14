/*jslint nomen: true*/
/*global $,define,require,angular,window,console,_ */

define(function (require, exports, module) {
    'use strict';

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        editNoteCtrl = require('view/edit-note'),
        genericHandlers = require('view/generic-handlers'),
        theme = require('view/theme');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document, $timeout, $modal, $sce) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
            container: '.notes',
            widgetMinWidth: 100,
            widgetMinHeight: 100,
            padding: 5
        });

        $scope.notes = [];

        function getDefaultGridsterItemOptions() {
            return {row: 1, col: 1, size_x: 3, size_y: 3};
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
                    $scope.editNote(note);
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

        $scope.bgColor = '';

        $scope.$watch('bgColor', function (newVal, oldVal) {
            if (newVal.length > 0) {
                theme.setBgColor(newVal);
            }
        });

        $scope.editNote = function (note) {
            editNoteCtrl.showEditor(note, $scope, $timeout, $modal);
        };

        $scope.trustAsHtml = function (content) {
            return $sce.trustAsHtml(content);
        };

        $scope.setNoteToDelete = function (note) {
            $scope.popover.note = note;
        };

        $scope.popover = {
            note: null,
            deleteNote: function (dismiss) {
                var index = _.indexOf($scope.notes, this.note);
                $scope.notes.splice(index, 1);

                noteRepo.remove(this.note.id, {
                    success: function () {
                        dismiss();
                    },
                    failure: genericHandlers.error
                });
            }
        };
    };
});

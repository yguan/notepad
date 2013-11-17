/*jslint nomen: true*/
/*global $,define,require,angular,window,console,_ */

define(function (require, exports, module) {
    'use strict';

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        editNoteCtrl = require('view/edit-note'),
        genericHandlers = require('view/generic-handlers'),
        theme = require('view/theme'),
        textFormat = require('lib/text-format');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document, $timeout, $modal, $sce) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
            container: '.notes',
            widgetMinWidth: 140,
            widgetMinHeight: 140,
            padding: 5
        });

        $scope.notes = [];

        function getDefaultGridsterItemOptions() {
            return {row: 1, col: 1, size_x: 2, size_y: 2};
        }

        function getDefaultNote() {
            return {
                title: '',
                content: ' ',
                lock: false,
                dateCreated: new Date(),
                gridsterOptions: getDefaultGridsterItemOptions()
            };
        }

        function saveLayout(notes, gridsterWidgetOptions) {
            var index = 0;
            _.each(notes, function (note) {
                if (!note.remove) {
                    angular.extend(note.gridsterOptions, gridsterWidgetOptions[index]);
                    index = index + 1;
                }
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
            $timeout(function () {
                note.dateModified = new Date();
                noteRepo.update(note, {succes: genericHandlers.noop, failure: genericHandlers.error});
            }, 200);
        };

        $scope.trustAsHtml = function (content) {
            return $sce.trustAsHtml(content);
        };

        $scope.setNoteToDelete = function (note, $event) {
            $($event.target).closest('.player-revert').removeClass('player-revert');
            $($event.target).parents('.gs-w').addClass('player-revert');
            $scope.noteToDelete = note;
        };

        $scope.popover = {
            note: null,
            deleteNote: function (dismiss) {
                $scope.noteToDelete.remove = true;

                noteRepo.remove($scope.noteToDelete.id, {
                    success: function () {
                        dismiss();
                    },
                    failure: genericHandlers.error
                });
            }
        };

        $scope.showToolbar = function ($event) {

            $timeout(function () {
                $($event.target).parent().find('.text-color-picker').colorpicker({
                    size: 20,
                    hide: false,
                    onSelectColor: function (color) {
                        textFormat.execDocumentCmd('foreColor', color);
                    }
                });

                $($event.target).parent().find('.editor-toolbar').click(function (e) {
                    textFormat.execDocumentCmdWithAttr(e);
                });
            }, 100);
        };

        $scope.preventDefault = function ($event) {
            $event.preventDefault();
        }

        $scope.updateNote = function (note) {
            $timeout(function () {
                $scope.editNote(note);
            }, 300);
        };
    };
});

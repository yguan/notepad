/*jslint nomen: true*/
/*global $,define,require,angular,window */

define(function (require, exports, module) {
    'use strict';

    var noteRepo = require('data/note-repository'),
        genericHandlers = require('view/generic-handlers'),
        textAngularOpts = {
            textAngularEditors: {
                note: {
                    toolbar: [
                        {icon: '<i class="fa fa-code"></i>', name: 'html', title: 'Toggle Html'},
                        {icon: 'h1', name: 'h1', title: 'H1'},
                        {icon: 'h2', name: 'h2', title: 'H2'},
                        {icon: 'h3', name: 'h3', title: 'H3'},
                        {icon: 'pre', name: 'pre', title: 'Pre'},
                        {icon: '<i class="fa fa-bold"></i>', name: 'b', title: 'Bold'},
                        {icon: '<i class="fa fa-italic"></i>', name: 'i', title: 'Italics'},
                        {icon: 'p', name: 'p', title: 'Paragraph'},
                        {icon: '<i class="fa fa-list-ul"></i>', name: 'ul', title: 'Unordered List'},
                        {icon: '<i class="fa fa-list-ol"></i>', name: 'ol', title: 'Ordered List'},
                        {icon: '<i class="fa fa-align-left"></i>', name: 'justifyLeft', title: 'Justify Left'},
                        {icon: '<i class="fa fa-align-center"></i>', name: 'justifyCenter', title: 'Justify Center'},
                        {icon: '<i class="fa fa-align-right"></i>', name: 'justifyRight', title: 'Justify Right'},
                        {icon: '<i class="fa fa-ban"></i>', name: 'clear', title: 'Clear'},
                        {icon: '<i class="fa fa-file"></i>', name: 'insertImage', title: 'Insert Image'},
                        {icon: '<i class="fa fa-html5"></i>', name: 'insertHtml', title: 'Insert Html'},
                        {icon: '<i class="fa fa-link"></i>', name: 'createLink', title: 'Create Link'},
                        {icon: '<i class="fa fa-rotate-right"></i>', name: 'redo', title: 'Redo'},
                        {icon: '<i class="fa fa-undo"></i>', name: 'undo', title: 'Undo'}
                    ],
                    html: '',
                    disableStyle: false,
                    theme: {
                        editor: {
                            'font-family': 'Roboto',
                            'font-size': '1.2em',
                            'color': 'black',
                            'border-radius': '4px',
                            'padding': '11px',
                            'background': 'white',
                            'border': '1px solid rgba(2,2,2,0.1)'
                        },
                        insertFormBtn: {
                            'background': 'red',
                            'color': 'white',
                            'padding': '2px 3px',
                            'font-size': '15px',
                            'margin-top': '4px',
                            'border-radius': '4px',
                            'font-family': 'Roboto',
                            'border': '2px solid red'
                        }
                    }
                }

            }
        },
        getModalWidth = function () {
            var element = angular.element('.notes').first();
            return {
                'width': (element.width() - 200) + 'px'
            };
        },
        noteEditor;

    exports.showEditor = function (note, $scope, $timeout, $modal) {
        function createContentWatcher(scope, note) {

        }

        function createTitleWatcher(scope, note) {
            return scope.$watch('title', function (newVal, oldVal) {
                $timeout(function () {
                    note.title = newVal;
                    note.dateModified = new Date();
                    noteRepo.update(note, {succes: genericHandlers.noop, failure: genericHandlers.error});
                }, 200);
            }, true);
        }

        if (!noteEditor) {
            var scope = $scope.$new(true);
            scope.modalWidth = getModalWidth;
            scope.textAngularOpts = textAngularOpts;

            noteEditor = {
                modal: $modal({
                    template: 'js/view/partial/edit-note.html',
                    show: false,
                    backdrop: 'static',
                    persist: true,
                    scope: scope
                }),
                scope: scope
            };

        }

        noteEditor.scope.title = note.title;

        noteEditor.modal.then(function (modalEl) {
            noteEditor.scope.textAngularOpts.textAngularEditors.note.html = note.content;
            modalEl.modal('show');
        });

        if (noteEditor.titleWatcher) {
            noteEditor.titleWatcher();
        }
        if (noteEditor.contentWatcher) {
            noteEditor.contentWatcher();
        }

        noteEditor.titleWatcher = createTitleWatcher(noteEditor.scope, note);
        noteEditor.contentWatcher = createContentWatcher(noteEditor.scope, note);
    };
});

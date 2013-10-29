define(function (require, exports, module) {

    var noteRepo = require('data/note-repository'),
        tagGroupRepo = require('data/tag-group-repository'),
        keyCode = {
            leftArrow: 37,
            rightArrow: 39
        },
        minBlockWidth = 100 + 5,
        minBlockHeight = minBlockWidth,
        getNoteGroupSize = function () {
            var $noteGroup = angular.element('.note-group').first(),
                $window = angular.element(window),
                padding = 70 * 2;
            if ($noteGroup.length === 0) {
                return {
                    height: $window.height() - padding,
                    width: $window.width() - padding
                };
            }

            return {
                height: $noteGroup.height(),
                width: $noteGroup.width()
            }
        },
        getSizeInfo = function () {
            var noteGroupSize = getNoteGroupSize(),
                slideWidth = noteGroupSize.width,
                slideHeight = noteGroupSize.height;

            return {
                maxColumns: Math.floor(slideWidth / minBlockWidth),
                maxRows: Math.floor(slideHeight / minBlockHeight)
            };
        },
        getDefaultNotesPlaceholder = function () {
            var sizeInfo = getSizeInfo();

            return {
                notes: [
                    {row: 1, col: 1, sizex: Math.floor(sizeInfo.maxColumns * 0.8), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 1, col: sizeInfo.maxColumns, sizex: 2, sizey: sizeInfo.maxRows - 1},
                    {row: 2, col: 1, sizex: Math.floor(sizeInfo.maxColumns * 0.4), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 2, col: 3, sizex: Math.floor(sizeInfo.maxColumns * 0.4), sizey: Math.ceil(sizeInfo.maxRows * 0.3)},
                    {row: 3, col: 3, sizex: Math.floor(sizeInfo.maxColumns * 0.8), sizey: 1},
                    {row: 3, col: 3, sizex: 2, sizey: 1}
                ]
            };
        },
        getNotesPlaceholders = function (numberOfItems) {
            var sizeInfo = getSizeInfo(),
                notes = [
                    {row: 1, col: sizeInfo.maxColumns, sizex: 1, sizey: 1}
                ],
                index = 1;

            while (index < numberOfItems) {
                notes.push({row: 1, col: 1, sizex: 1, sizey: 1});
                index++;
            }

            return {
                notes: notes
            };
        };

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document) {

        function setCurrentGroup(deltaIndex) {
            var groupCount = $scope.noteGroups.length,
                index = $scope.currentGroup + deltaIndex;

            if (index < 0) {
                $scope.currentGroup = groupCount - 1;
            } else if (index >= groupCount) {
                $scope.currentGroup = 0;
            } else {
                $scope.currentGroup = index;
            }
            $scope.$apply();
        }

        $scope.currentGroup = 0;

        $document.keydown(function (e) {
            switch (e.keyCode) {
                case keyCode.leftArrow:
                    setCurrentGroup(-1);
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case keyCode.rightArrow:
                    setCurrentGroup(1);
                    e.preventDefault();
                    e.stopPropagation();
                    break;
            }
        });

        $scope.noteGroups = [
            getDefaultNotesPlaceholder()
        ];

        $scope.popover = {
            saved: false,
            numberOfNotes: '',
            addSlide: function () {
                $scope.noteGroups = [getNotesPlaceholders(this.numberOfNotes || 5)].concat($scope.noteGroups);
                this.numberOfNotes = '';
                this.saved = true;
            }
        };
    };
});

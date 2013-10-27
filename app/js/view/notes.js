define(function (require, exports, module) {

    var noteRepo = require('data/note-repository'),
        tagGroupRepo = require('data/tag-group-repository'),
        keyCode = {
            leftArrow: 37,
            rightArrow: 39
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
            {
                name: 'A',
                notes: [
                    {html: 'Widget #1', row: 1, col: 1, sizex: 2, sizey: 1},
                    {html: 'Widget #2', row: 2, col: 8, sizex: 6, sizey: 1},
                    {html: 'Widget #3', row: 1, col: 2, sizex: 4, sizey: 1},
                    {html: 'Widget #4', row: 2, col: 2, sizex: 2, sizey: 2}
                ]
            },
            {
                name: 'B',
                notes: [
                    {html: 'Widget #1', row: 1, col: 1, sizex: 2, sizey: 1},
                    {html: 'Widget #2', row: 2, col: 4, sizex: 1, sizey: 1},
                    {html: 'Widget #3', row: 1, col: 2, sizex: 4, sizey: 1},
                    {html: 'Widget #4', row: 2, col: 2, sizex: 2, sizey: 2}
                ]
            },
            {
                name: 'C',
                notes: [
                    {html: 'Widget #1', row: 1, col: 1, sizex: 2, sizey: 1},
                    {html: 'Widget #2', row: 2, col: 4, sizex: 1, sizey: 1},
                    {html: 'Widget #3', row: 1, col: 2, sizex: 4, sizey: 1},
                    {html: 'Widget #4', row: 2, col: 2, sizex: 2, sizey: 2}
                ]
            }
        ];
    };
});

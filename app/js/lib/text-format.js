/*jslint nomen: true*/
/*global $,define,require,angular,window,console,_,document */

define(function (require, exports, module) {
    'use strict';

    window.execDocumentCmd = function (e) {
        var $target = $(e.target),
            command = $target.data('cmd'),
            agrumentVal = $target.data('arg');

        document.execCommand(command, false, agrumentVal);
    };
});

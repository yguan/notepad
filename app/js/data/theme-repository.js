/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define(function (require, exports, module) {
    'use strict';
    var idb = require('data/idb'),
        dbKey = 'theme';

    module.exports = {
        create: function (theme, op) {
            idb.create(dbKey, theme, op);
        },
        get: function (id, op) {
            idb.get(dbKey, id, op);
        },
        update: function (theme, op) {
            idb.update(dbKey, theme, op);
        }
    };

});

/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define(function (require, exports, module) {
    'use strict';
    var idb = require('data/idb'),
        dbKey = 'note';

    module.exports = {
        add: function (note, op) {
            idb.create(dbKey, note, op);
        },
        addAll: function (notes, op) {
            var me = this,
                i = 0,
                len = notes.length,
                errorCount = 0;

            function addNext() {
                if (i < len) {
                    me.add(notes[i], {
                        success: function () {
                            i = i + 1;
                            addNext();
                        },
                        failure: function () {
                            errorCount = errorCount + 1;
                        }
                    });
                } else {   // complete
                    if (errorCount === 0) {
                        op.success();
                    } else {
                        op.failure();
                    }
                }
            }

            addNext();
        },
        remove: function (id, op) {
            idb.remove(dbKey, id, op);
        },
        findByKey: function (key, value, op) {
            idb.findAllByKey(dbKey, key, value, op);
        },
        findByTitle: function (keywords, op) {
            var lowercaseKeywords = _.map(keywords, function (keyword) {
                    return keyword.toLowerCase();
                }),
                keywordCount = keywords.length;

            idb.findAll(dbKey, function (note) {
                var matchedCount = 0,
                    title = note.title.toLowerCase();
                _.each(lowercaseKeywords, function (keyword) {
                    if (title.indexOf(keyword) !== -1) {
                        matchedCount = matchedCount + 1;
                    }
                });
                return keywordCount === matchedCount;
            }, op);
        },
        update: function (note, op) {
            idb.update(dbKey, note, op);
        },
        updateAll: function (notes, op) {
            idb.updateAll(dbKey, notes, op);
        },
        each: function (fn, op) {
            idb.db[dbKey]
                .query()
                .filter(function (item) {
                    fn(item);
                    return false;
                })
                .execute()
                .done(op.success)
                .fail(op.failure);
        },
        getAll: function (op) {
            idb.getAll(dbKey, op);
        }
    };

});

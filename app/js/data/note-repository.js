/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define(function (require, exports, module) {
    'use strict';
    var idb = require('data/idb'),
        tagGroupRepo = require('data/tag-group-repository'),
        dbKey = 'note';

    module.exports = {
        create: function (note, tags, op) {
            var me = this;

            if (tags) {
                tagGroupRepo.add(tags, {
                    success: function (tagGroup) {
                        note.tagGroupId = tagGroup.id;
                        me.add(note, op);
                    },
                    failure: op.failure
                });
            } else {
                me.add(note, op);
            }
        },
        add: function (note, op) {
            var me = this;

            if (note.tags) {
                tagGroupRepo.add(note.tags, {
                    success: function (tagGroup) {
                        note.tagGroupId = tagGroup.id;
                        delete note.tags;
                        idb.add(dbKey, note, 'url', op);
                    },
                    failure: op.failure
                });
            } else {
                idb.add(dbKey, note, 'url', op);
            }

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
            idb.db[dbKey].remove(id, op);
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
        updateTags: function (note, newTags, op) {
            tagGroupRepo.findExact(newTags, {
                success: function (results) {
                    note.tagGroupId = results[0].id;
                    idb.update(dbKey, note, op);
                },
                failure: function () {
                }
            });
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
        }
    };

});

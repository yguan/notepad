/*jslint nomen: true*/
/*global $,define,require */

require.config({
    baseUrl: 'js',
    paths: {
        data: './data',
        view: './view',
        partial: './view/partial',
        extension: './extension'
    }
});

require(['data/app-data-loader', 'view/all-views', 'lib/text-format'], function (loader, views) {
    'use strict';

    loader.init({
        success: views.init,
        failure: views.init
    });
})
;

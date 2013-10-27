require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        view: './view',
        extension: './extension'
    }
});

require([
    'lib/text',
    'lib/lodash.underscore',
    'lib/jquery',
    'lib/angular/angular',
    'lib/angular/angular-mobile',
    'lib/angular/angular-carousel',
    'lib/angular/jquery.gridster',
    'lib/angular/angular-gridster',
    'lib/angular/bootstrap-tagsinput',
    'lib/angular/bootstrap-tagsinput-angular',
    'lib/angular/angular-file-upload',
    'lib/angular/styling',
    'extension/lodash.underscore'
], function () {
    require([
        'data/app-data-loader',
        'view/all-views'
    ], function (loader, views) {
        loader.init({
            success: views.init,
            failure: views.init
        });
    });
});

// python -m http.server

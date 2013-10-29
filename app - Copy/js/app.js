require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        view: './view',
        extension: './extension'
    }
});

require(['lib/all-lib'], function () {
    require(['data/app-data-loader', 'view/all-views'], function (loader, views) {
        loader.init({
            success: views.init,
            failure: views.init
        });
    });
});

// python -m http.server

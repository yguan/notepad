require.config({
    baseUrl: 'js',
    paths: {
        data: './data',
        view: './view',
        extension: './extension'
    }
});

require(['data/app-data-loader', 'view/all-views'], function (loader, views) {
    loader.init({
        success: views.init,
        failure: views.init
    });
});

// python -m http.server

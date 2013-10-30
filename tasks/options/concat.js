module.exports = {
    cssdev: {
        src: [
            '<%= folder.src %>/less/css/bootstrap-min.css',
            '<%= folder.src %>/less/css/bootstrap-tagsinput-min.css',
            '<%= folder.src %>/less/css/angular-carousel-min.css',
            '<%= folder.src %>/less/css/jquery-gridster-min.css',
            '<%= folder.src %>/css/app.css'
        ],
        dest: '<%= folder.src %>/css/app-min.css'
    },
    cssdist: {
        src: [
            '<%= folder.src %>/less/css/bootstrap-min.css',
            '<%= folder.src %>/less/css/bootstrap-tagsinput-min.css',
            '<%= folder.src %>/less/css/angular-carousel-min.css',
            '<%= folder.src %>/less/css/jquery-gridster-min.css',
            '<%= folder.distTemp %>/app.css'
        ],
        dest: '<%= folder.dist %>/css/app-min.css'
    },
    lib: {
        src: [
            '<%= folder.src %>/js/lib/require.js',
            '<%= folder.src %>/js/lib/lodash.underscore.js',
            '<%= folder.src %>/js/extension/lodash.underscore.js',
            '<%= folder.src %>/js/lib/jquery.js',
            '<%= folder.src %>/js/lib/angular/angular.js',
            '<%= folder.src %>/js/lib/angular/angular-mobile.js',
            '<%= folder.src %>/js/lib/angular/angular-carousel.js',
            '<%= folder.src %>/js/lib/angular/bootstrap.js',
            '<%= folder.src %>/js/lib/angular/angular-strap.js',
            '<%= folder.src %>/js/lib/angular/jquery.gridster.js',
            '<%= folder.src %>/js/lib/angular/angular-gridster.js',
            '<%= folder.src %>/js/lib/angular/bootstrap-tagsinput.js',
            '<%= folder.src %>/js/lib/angular/bootstrap-tagsinput-angular.js',
            '<%= folder.src %>/js/lib/angular/angular-file-upload.js',
            '<%= folder.src %>/js/lib/angular/styling.js'
        ],
        dest: '<%= folder.src %>/js/all-lib.js'
    }
};
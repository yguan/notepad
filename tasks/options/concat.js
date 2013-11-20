module.exports = {
    cssdev: {
        src: [
            '<%= folder.src %>/less/css/bootstrap-min.css',
            '<%= folder.src %>/less/css/bootstrap-tagsinput-min.css',
            '<%= folder.src %>/less/css/jquery-gridster-min.css',
            '<%= folder.src %>/less/css/font-awesome-min.css',
            '<%= folder.src %>/css/app.css'
        ],
        dest: '<%= folder.src %>/css/app-min.css'
    },
    cssdist: {
        src: [
            '<%= folder.src %>/less/css/bootstrap-min.css',
            '<%= folder.src %>/less/css/bootstrap-tagsinput-min.css',
            '<%= folder.src %>/less/css/jquery-gridster-min.css',
            '<%= folder.src %>/less/css/font-awesome-min.css',
            '<%= folder.buildTemp %>/app.css'
        ],
        dest: '<%= folder.distTemp %>/css/app-min.css'
    },
    lib: {
        src: [
            '<%= folder.src %>/js/lib/require.js',
            '<%= folder.src %>/js/lib/lodash.underscore.js',
            '<%= folder.src %>/js/extension/lodash.underscore.js',
            '<%= folder.src %>/js/lib/jquery.js',
            '<%= folder.src %>/js/lib/angular/angular.js',
            '<%= folder.src %>/js/lib/angular/angular-route.js',
            '<%= folder.src %>/js/lib/angular/angular-sanitize.js',
            '<%= folder.src %>/js/lib/angular/angular-mobile.js',
            '<%= folder.src %>/js/lib/angular/bootstrap.js',
            '<%= folder.src %>/js/lib/angular/angular-strap.js',
            '<%= folder.src %>/js/lib/angular/jquery.gridster.js',
            '<%= folder.src %>/js/lib/angular/angular-gridster.js',
            '<%= folder.src %>/js/lib/angular/angular-contenteditable.js',
            '<%= folder.src %>/js/lib/angular/angular-file-upload.js',
            '<%= folder.src %>/js/lib/angular/styling.js',
            '<%= folder.src %>/js/lib/angular/bootstrap-colorpicker.js',
            '<%= folder.src %>/js/lib/angular/jquery.colorpicker.js'
        ],
        dest: '<%= folder.src %>/js/all-lib.js'
    }
};

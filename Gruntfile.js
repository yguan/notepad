module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['app/css']
                },
                files: {
                    'app/css/app.css': 'app/less/app.less'
                }
            },
            production: {
                options: {
                    paths: ['app/css'],
                    yuicompress: true
                },
                files: {
                    'app/css/app.css': 'app/less/app.less'
                }
            }
        },
        concat: {
            css: {
                src: [
                    'app/less/css/bootstrap-min.css',
                    'app/less/css/bootstrap-tagsinput-min.css',
                    'app/less/css/angular-carousel-min.css',
                    'app/less/css/jquery-gridster-min.css',
                    'app/css/app.css'
                ],
                dest: 'app/css/app-min.css'
            },
            js: {
                src: [
                    'app/js/lib/all-lib-min.js',
                    'build-temp/app-min.js'
                ],
                dest: 'app-built/js/app.js'
            },
            allLib: {
                src: [
                    'app/js/lib/lodash.underscore.js',
                    'app/js/lib/jquery.js',
                    'app/js/lib/angular/angular.js',
                    'app/js/lib/angular/angular-mobile.js',
                    'app/js/lib/angular/angular-carousel.js',
                    'app/js/lib/angular/bootstrap.js',
                    'app/js/lib/angular/angular-strap.js',
                    'app/js/lib/angular/jquery.gridster.js',
                    'app/js/lib/angular/angular-gridster.js',
                    'app/js/lib/angular/bootstrap-tagsinput.js',
                    'app/js/lib/angular/bootstrap-tagsinput-angular.js',
                    'app/js/lib/angular/angular-file-upload.js',
                    'app/js/lib/angular/styling.js',
                    'app/js/extension/lodash.underscore.js'
                ],
                dest: 'app/js/lib/all-lib.js'
            }
        },
        watch: {
            files: 'app/less/*',
            tasks: ['less:development', 'concat:css'],
            options: {
                debounceDelay: 2000
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: 'app/js/',
                    name: 'app',
//                    exclude: ['lib/all-lib'],
                    out: 'app-built/js/app.js',
                    generateSourceMaps: false,
                    optimize: 'uglify2',
                    findNestedDependencies: true,
                    inlineText: true,
                    preserveLicenseComments: false
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: [
                            'manifest.json',
                            'icon.png',
                            'index.html',
                            'css/app-min.css',
                            'fonts/**',
                            'img/**',
                            'js/view/*.html',
                            'js/require.js'
                        ],
                        dest: 'app-built/'
                    }
                ]
            }
        },
        clean: {
            build: ['build-temp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('allLib', ['concat:allLib']);
    grunt.registerTask('build', ['less:production', 'concat:css', 'requirejs:dist', 'copy', 'clean']);
};

// https://github.com/jrburke/r.js/blob/master/build/example.build.js

//less: {
//    development: {
//        options: {
//            paths: ['app/css']
//        },
//        files: {
//            'app/css/app.css': 'app/less/app.less'
//        }
//    },
//    production: {
//        options: {
//            paths: ['app/css'],
//                yuicompress: true
//        },
//        files: [
//            {
//                expand: true,     // Enable dynamic expansion.
//                cwd: 'app/less',  // Src matches are relative to this path.
//                src: ['*.less'],  // Actual pattern(s) to match.
//                dest: 'app/css',  // Destination path prefix.
//                ext: '.css'       // Dest filepaths will have this extension.
//            }
//        ]
//    }
//},
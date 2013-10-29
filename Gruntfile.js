module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["app/css"]
                },
                files: {
                    "app/css/app.css": "app/less/app.less"
                }
            },
            production: {
                options: {
                    paths: ['app/css'],
                    yuicompress: true
                },
                files: {
                    "app/css/app.css": "app/less/app.less"
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
            }
        },
        watch: {
            files: 'app/less/*',
            tasks: ['less:development', 'concat'],
            options: {
                debounceDelay: 2000
            }
        },
        requirejs: {
            dist: {
                options: {
                    appDir: 'app',
                    mainConfigFile: 'app/js/app.js',
                    dir: 'app-built',
                    name: 'app',
                    optimizeCss: 'none',
                    findNestedDependencies: true,
                    inlineText: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'concat', 'requirejs']);
};


//less: {
//    development: {
//        options: {
//            paths: ["app/css"]
//        },
//        files: {
//            "app/css/app.css": "app/less/app.less"
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
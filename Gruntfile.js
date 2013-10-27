module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            production: {
                options: {
                    paths: ['app/css'],
                    yuicompress: true
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'app/less',  // Src matches are relative to this path.
                        src: ['*.less'],  // Actual pattern(s) to match.
                        dest: 'app/css/compressed',  // Destination path prefix.
                        ext: '.css'       // Dest filepaths will have this extension.
                    }
                ]
            }
        },
        concat: {
            css: {
                src: [
                    'app/css/compressed/bootstrap-tagsinput.css',
                    'app/css/compressed/angular-carousel.css',
                    'app/css/compressed/jquery-gridster.css',
                    'app/css/compressed/app.css'
                ],
                dest: 'app/css/app-min.css'
            }
        },
        watch: {
            files: 'app/less/*',
            tasks: ['less', 'concat'],
            options: {
                debounceDelay: 2000
            }
        },
        requirejs: {
            dist: {
                options: {
//                    baseUrl: 'app',
//                    optimizeAllPluginResources: true,
//                    wrap: true,
//                    optimize: 'none',
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

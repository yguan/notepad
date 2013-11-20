module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: '<%= folder.src %>/',
                src: [
                    '*.html',
                    '*.png',
                    '*.js',
                    'fonts/**',
                    'img/**',
                    'js/view/partial/*.html'
                ],
                dest: '<%= folder.distTemp %>/'
            },
            {
                src: '<%= folder.src %>/js/all-lib-min.js',
                dest: '<%= folder.distTemp %>/js/all-lib.js'
            }
        ]
    },
    apps: {
        files: [
            {
                expand: true,
                cwd: '<%= folder.distTemp %>/',
                src: ['**'],
                dest: '<%= folder.desk %>/'
            },
            {
                src: '<%= folder.src %>/manifest.json',
                dest: '<%= folder.desk %>/manifest.json'
            },
            {
                expand: true,
                cwd: '<%= folder.distTemp %>/',
                src: ['**'],
                dest: '<%= folder.local %>/'
            },
            {
                src: '<%= folder.src %>/manifest-local.json',
                dest: '<%= folder.local %>/manifest.json'
            }
        ]
    }
};
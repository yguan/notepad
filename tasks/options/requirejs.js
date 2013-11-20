module.exports = {
    dist: {
        options: {
            baseUrl: '<%= folder.src %>/js/',
            name: '<%= folder.src %>',
            out: '<%= folder.distTemp %>/js/app.js',
            generateSourceMaps: false,
            optimize: 'uglify2',
            uglify2: {
                mangle: false
            },
            findNestedDependencies: true,
            inlineText: true,
            preserveLicenseComments: false
        }
    }
};

module.exports = {
    options: {
        preserveComments: false,
        mangle: false
    },
    lib: {
        files: {
            '<%= folder.src %>/js/all-lib-min.js': ['<%= folder.src %>/js/all-lib.js']
        }
    }
};

module.exports = {
    less: {
        files: '<%= folder.src %>/less/*',
        tasks: ['less:dev', 'concat:cssdev'],
        options: {
            debounceDelay: 2000
        }
    }
};
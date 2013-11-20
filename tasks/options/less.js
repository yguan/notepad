module.exports = {
    dev: {
        files: {
            '<%= folder.src %>/css/app.css': '<%= folder.src %>/less/app.less'
        }
    },
    dist: {
        options: {
            yuicompress: true
        },
        files: {
            '<%= folder.buildTemp %>/app.css': '<%= folder.src %>/less/app.less'
        }
    }
};
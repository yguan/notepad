module.exports = {
    dev: {
        options: {
            paths: ['<%= folder.src %>/css']
        },
        files: {
            '<%= folder.src %>/css/app.css': '<%= folder.src %>/less/app.less'
        }
    },
    dist: {
        options: {
            paths: ['<%= folder.src %>/css'],
            yuicompress: true
        },
        files: {
            '<%= folder.distTemp %>/app.css': '<%= folder.src %>/less/app.less'
        }
    }
};
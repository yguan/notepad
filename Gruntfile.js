module.exports = function (grunt) {

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }

    var config = {
        folder: {
            src: 'app',
            desk: 'desk',
            local: 'local',
            buildTemp: 'buildTemp',
            distTemp: 'distTemp'
        }
    };

    grunt.util._.extend(config, loadConfig('./tasks/options/'));

    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*']});
    grunt.loadTasks('tasks');
};

// https://github.com/jrburke/r.js/blob/master/build/example.build.js

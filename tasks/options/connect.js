module.exports = {
    dev: {
        options: {
            keepalive: true,
            hostname: 'localhost',
            port: 9000,
            base: 'app/'
        }
    },
    dist: {
        options: {
            keepalive: true,
            hostname: 'localhost',
            port: 9001,
            base: 'dist/'
        }
    }
};
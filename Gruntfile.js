module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["styles/less/*.less"]
                },
                files: {
                    "styles/css/repoBrowser.css": "styles/less/repoBrowser.less",
                    "styles/css/normalize.css": "styles/less/normalize.less"
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'scripts/*.js'],
            options: {
                smarttabs: true,
            }
        },

        watch: {
            scripts: {
                files: ['scripts/*.js'],
                tasks: ['jshint']
            },

            css: {
                files: ['styles/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};
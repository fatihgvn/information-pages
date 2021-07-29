
module.exports = function(grunt){


    grunt.initConfig({
        concat: {
            js:{
                src: ["project/javascript/**/*.js"],
                dest: "build/js/scripts.js",
            },
        },

        clean: {
            dist: 'build/**'
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    src: 'project/**/*.html',
                    dest: 'build/',
                    flatten: true,
                    filter: 'isFile'
                }],
            },
            icons: {
                files: [{
                    expand: true,
                    src: 'project/icons/**/*.png',
                    dest: 'build/icons/',
                    flatten: true,
                    filter: 'isFile'
                }],
            }
        },

        sass: {
            normal: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['project/styles/**/*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            js: {
                files: 'project/**/*.js',
                tasks: ['concat:js'],
            },
            scss: {
                files: 'project/**/*.scss',
                tasks: ['sass:normal'],
            },
            html: {
                files: 'project/**/*.html',
                tasks: ['copy:html'],
            },
            icons: {
                files: 'project/icons/**/*',
                tasks: ['copy:icons'],
            },
            options: {
                livereload: true,
            },
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'build',
                    livereload: true,
                    directory: null,
                    open: true,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('run',['clean', 'copy', 'sass', 'concat', 'connect', 'watch']);
    grunt.registerTask('build',['clean', 'copy', 'concat', 'sass', 'cssmin']);
};
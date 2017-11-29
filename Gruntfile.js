module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            dist: {
                files: {
                    'dist/app.js': [ 'dist/app.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'public/components/**/*.html' ],
                dest: 'tmp/templates.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            },
            dist: {
                src: [ 'dist' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'public/components/**/*.js', 'tmp/*.js' ],
                dest: 'dist/app.js'
            }
        },



        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/app.js': 'dist/app.js'
                }
            }
        }






    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-babel');



    grunt.registerTask('prod', ['clean:dist', 'html2js:dist', 'concat:dist', 'babel:dist', 'uglify:dist',
        'clean:temp']);

    grunt.registerTask('cleanDist', ['clean:dist']);
};
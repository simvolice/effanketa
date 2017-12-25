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
        },


        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/style.min.css': ['public/assets/css/angular-material.min.css', 'public/assets/css/app.css',
                    'public/assets/css/bootstrap.min.css',
                        'public/assets/css/c3.min.css',
                        'public/assets/css/drawer.min.css',
                        'public/assets/css/material-kit.css',
                        'public/assets/css/md-data-table.min.css',
                        'public/assets/css/print.css'


                    ]
                }
            }
        },


        i18nextract: {
            default_options: {
                src: [ 'public/components/**/*.html' ],
                lang:     ['ru_RU'],
                dest:     'tmp'
            }
        }






    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-angular-translate');



    grunt.registerTask('prod', ['clean:dist', 'html2js:dist', 'concat:dist', 'babel:dist', 'uglify:dist',
        'clean:temp']);

    grunt.registerTask('cleanDist', ['clean:dist']);
    grunt.registerTask('cssMin', ['cssmin:target']);
    grunt.registerTask('i18nextract', ['i18nextract:default_options']);
};
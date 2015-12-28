module.exports = function (grunt) {
    grunt.initConfig({
        publicPath: 'public',
        bowerComponentsPath: '<%= publicPath %>/vendor/bower_components',

        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["<%= publicPath %>/content/css", "<%= publicPath %>/content/less"],
                    yuicompress: true
                },
                files: {
                    "<%= publicPath %>/content/css/general.css": [
                        "<%= bowerComponentsPath %>/bootstrap/**/variables.less",
                        "<%= publicPath %>/content/less/*"
                    ]
                }
            }
        },
        // include css/js files path to index.html
        injector: {
            options: {
                relative: true,
                addRootSlash: false,
                bowerPrefix: 'bower:'
            },
            local_dependencies: {
                files: {
                    '<%= publicPath %>/index.html': [
                        "<%= publicPath %>/content/js/*.js",
                        "<%= publicPath %>/content/js/**/*.js",
                        "<%= publicPath %>/app/app.module.js",
                        "<%= publicPath %>/app/**/*.module.js",
                        "<%= publicPath %>/app/**/*.config.js",
                        "<%= publicPath %>/app/**/*.js",

                        "<%= bowerComponentsPath %>/bootstrap/**/bootstrap.css",
                        "<%= bowerComponentsPath %>/**/dist*/bootstrap-table.css",
                        "<%= bowerComponentsPath %>/**/*4.2.0/**/font-awesome.min.css",
                        "<%= publicPath %>/content/css/*.css"
                    ]
                }
            },
            bower_dependencies: {
                files: {
                    '<%= publicPath %>/index.html': ['bower.json']
                }
            }
        },
        // run node.js server
        nodemon: {
            dev: {
                script: 'server/app.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-nodemon');
};
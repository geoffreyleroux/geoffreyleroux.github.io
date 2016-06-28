// Generated on 2015-03-24 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        protractor: 'grunt-protractor-runner',
        injector: 'grunt-asset-injector',
        connect: 'grunt-contrib-connect',
        ngAnnotate: 'grunt-ng-annotate',
        buildcontrol: 'grunt-build-control'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = {
        // configurable paths
        root: require('./bower.json').appPath,
        src: require('./bower.json').appPath || 'src',
        dist: 'build/dist',
        public: 'build/dist/public',
        tmp: 'build/.tmp'
    };

    var proxy = require('./proxy.js');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        yeoman: config,
        // The actual grunt server settings
        connect: {
            options: {
                port: 9002,
                hostname: '0.0.0.0',
                livereload: 35729,
                middleware: function(connect, options) {
                    return [function(req, res) {
                        require('fs').createReadStream('index.html').pipe(res);
                    }]
                }
            },

            livereload: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        return [
                            connect.static(config.tmp),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.src),
                            function(req, res) {require('fs').createReadStream('./src/index.html').pipe(res)}
                        ];
                    } 
                }
            },
            test: {
                options: {
                    port: 9002,
                    middleware: function (connect) {
                        return [
                            connect.static(config.tmp),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.src)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.public %>'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        watch: {
            injectJS: {
                files: [
                    '<%= yeoman.src %>/**/*.js',
                    '!<%= yeoman.src %>/**/*.spec.js',
                    '!<%= yeoman.src %>/**/*.mock.js',
                    '!<%= yeoman.src %>/app.js'],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    '<%= yeoman.src %>/**/*.css'
                ],
                tasks: ['injector:css']
            },
            jsTest: {
                files: [
                    '<%= yeoman.src %>/**/*.spec.js',
                    '<%= yeoman.src %>/**/*.mock.js'
                ],
                tasks: ['newer:jshint:all', 'karma']
            },
            injectSass: {
                files: [
                    '<%= yeoman.src %>/**/*.{scss,sass}',
                    '!<%= yeoman.src %>/app.scss'
                ],
                tasks: ['injector:sass']
            },
            sass: {
                files: [
                    '<%= yeoman.src %>/**/*.{scss,sass}',
                    '<%= yeoman.src %>/app.scss'
                ],
                tasks: ['sass', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.css',
                    '{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.html',
                    '{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.js',
                    '!{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.spec.js',
                    '!{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.mock.js',
                    '<%= yeoman.src %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '<%= yeoman.src %>/.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= yeoman.src %>/**/*.js',
                '!<%= yeoman.src %>/**/*.spec.js',
                '!<%= yeoman.src %>/**/*.mock.js'
            ],
            test: {
                src: [
                    '<%= yeoman.src %>/**/*.spec.js',
                    '<%= yeoman.src %>/**/*.mock.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '!<%= yeoman.dist %>/.openshift',
                        '!<%= yeoman.dist %>/Procfile'
                    ]
                }]
            },
            server: '<%= yeoman.tmp %>',
            test: 'build/coverage/unit'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.tmp %>/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.tmp %>/'
                }]
            }
        },

        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            target: {
                src: '<%= yeoman.src %>/index.html',
                ignorePath: '../',
                exclude: [/pure/, /ngDialog-theme-default.css/],
                fileTypes: {
                    html: {
                        replace: {
                            js: '<script src="/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="/{{filePath}}" />'
                        }
                    }
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.public %>/{,*/}*.js',
                        '<%= yeoman.public %>/{,*/}*.css',
                        '<%= yeoman.public %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.public %>/assets/fonts/{,*/}*.*',
                        '!<%= yeoman.public %>/assets/images/icons/**/*.*',
                        '!<%= yeoman.public %>/assets/images/graphs/*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.src %>/index.html'],
            options: {
                dest: '<%= yeoman.public %>',
                staging: '<%= yeoman.tmp %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.public %>/{,*/}*.html'],
            css: ['<%= yeoman.public %>/{,*/}*.css'],
            js: ['<%= yeoman.public %>/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.public %>',
                    '<%= yeoman.public %>/assets/images'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.tmp %>/concat',
                    src: '*.js',
                    dest: '<%= yeoman.tmp %>/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                // This should be the name of your apps angular module
                module: 'bwcApp',
                prefix: '/',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'app.js'
            },
            main: {
                cwd: '<%= yeoman.src %>',
                src: ['**/*.html', '!index.html'],
                dest: '<%= yeoman.tmp %>/templates.js'
            },
            tmp: {
                cwd: '<%= yeoman.tmp %>',
                src: ['**/*.html', '!index.html'],
                dest: '<%= yeoman.tmp %>/tmp-templates.js'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.public %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'assets/images/**/*.{png,jpg,jpeg,gif,svg}',
                        'assets/fonts/**/*.{eot,ttf,woff,css,svg}',
                        'index.html'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= yeoman.tmp %>/images',
                    dest: '<%= yeoman.public %>/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '<%= yeoman.src %>/locales',
                    dest: '<%= yeoman.public %>/locales',
                    src: ['*']
                }, {
                    expand: true,
                    dest: '<%= yeoman.dist %>',
                    src: ['server.js', 'proxy.js', 'package.json']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.src %>',
                dest: '<%= yeoman.tmp %>/',
                src: ['**/*.css']
            }
        },


        // Test settings
        karma: {
            unit: {
                configFile: 'test/unit/karma.conf.js',
                singleRun: true
            }
        },

        protractor: {
            options: {
                configFile: 'test/e2e/protractor.conf.js'
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },

        sass: {
            server: {
                options: {
                    loadPath: [
                        '<%= yeoman.src %>/../bower_components',
                        '<%= yeoman.src %>/'
                    ],
                    compass: true,
                    cacheLocation: '<%= yeoman.tmp %>/.sass-cache'
                },
                files: {
                    '<%= yeoman.tmp %>/app.css': '<%= yeoman.src %>/app.scss'
                }
            }
        },

        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/src/', '');
                        filePath = filePath.replace('/<%= yeoman.tmp %>/', '');
                        return '<script src="/' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.src %>/index.html': [
                        ['{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.js',
                            '!{<%= yeoman.tmp %>,<%= yeoman.src %>}/app.js',
                            '!{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.spec.js',
                            '!{<%= yeoman.tmp %>,<%= yeoman.src %>}/**/*.mock.js']
                    ]
                }
            },

            // Inject component scss into app.scss
            sass: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/src/', '');
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                files: {
                    '<%= yeoman.src %>/app.scss': [
                        '<%= yeoman.src %>/**/*.{scss,sass}',
                        '!<%= yeoman.src %>/app.{scss,sass}'
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/src/', '');
                        filePath = filePath.replace('/build/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.src %>/index.html': [
                        '<%= yeoman.src %>/**/*.css'
                    ]
                }
            }
        },

        buildcontrol: {
            options: {
                dir: '<%= yeoman.dist %>',
                commit: true,
                push: true,
                connectCommits: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            qa: {
                options: {
                    remote: 'ssh://565591342d52715c8b000038@webapp-birdee.rhcloud.com/~/git/webapp.git/',
                    branch: 'master'
                }
            }
        }
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'env:prod', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'injector:sass',
            'sass',
            'injector',
            'wiredep',
            'autoprefixer',
            'connect:livereload',
            //'wait',
            //'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (target) {
        if (target === 'client') {
            return grunt.task.run([
                'clean:server',
                'clean:test',
                'injector:sass',
                'sass',
                'injector',
                'autoprefixer',
                'karma'
            ]);
        }

        else if (target === 'e2e') {
            return grunt.task.run([
                'clean:server',
                'env:test',
                'injector:sass',
                'sass',
                'injector',
                'wiredep',
                'autoprefixer',
                'connect:dev',
                'protractor'
            ]);
        }

        else grunt.task.run([
                'test:client'
            ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'injector:sass',
        'sass',
        'injector',
        'wiredep',
        'useminPrepare',
        'autoprefixer',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('openshift', [
        'build',
        'buildcontrol:qa'
    ]);
};

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: [
                    "./scripts/**/*.js",
                    "./styles/**/*.scss",
                    "./index.html",
                    "!node_modules/**/*.js"
                ],
                tasks: ["eslint", "sass", "browserify", "uglify", "copy"],
                options: {
                    spawn: false,
                    debounceDelay: 1000
                },
            }
        },
        eslint: {
            options: {
                fix: true
            },
            src: [
                "./scripts/**/*.js",
                "!node_modules/**/*.js"
            ]
        },
        browserify: {
            dist: {
                files: {
                    "../dist/bundle.js": ["scripts/**/*.js"]
                }
            },
            options: {
                browserifyOptions: {
                    debug: true,
                    paths: ["./scripts"],
                }
            },
        },
        sass: {
            options: {
                    sourceMap: true
                },
                dist: {
                    files: {
                        "./styles/styles.css": "./styles/styles.scss"
                    }
                }
            },
        copy: {
            main: {
              files: [
                // includes files within path
               {
                   expand: true,
                   src: ["index.html"],
                   dest: "../dist/",
                   filter: "isFile"
               }, {
                   expand: true,
                   src: ["styles/*.css"],
                   dest: "../dist/",
                   filter: "isFile"
               }, {
                   expand: true,
                   src: ["styles/styles.css.map"],
                   dest: "../dist/",
                   filter: "isFile"
               }
              ],
            },
        },
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: "../dist",
                    src: "bundle.js",
                    dest: "../dist",
                    ext: ".min.js"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-sass")
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.loadNpmTasks("grunt-contrib-watch");

    
    grunt.registerTask("default", ["eslint", "browserify", "sass", "copy", "uglify", "watch"]);
};

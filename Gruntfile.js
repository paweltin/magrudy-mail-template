module.exports = function(grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            "src/*.css",
            "*.html"
          ]
        },
        options: {
          open: false,
          port: "3004",
          server: {
            baseDir: "./"
          },
          reloadOnRestart: true,
          watchTask: true
        }
      }
    },
    inline: {
      dist: {
        options: {
          tag: ''
        },
        src: "src/index.html",
        dest: "index.html"
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer-core"),
          require("csswring")
        ]
      },
      prod: {
        src: "src/style.css"
      }
    },
    sass: {
      options: {
        includePaths: ["bower_components"]
      },
      dist: {
        files: {
          "src/style.css": "src/style.scss"
        }
      }
    },
    uncss: {
      dist: {
        files: {
          "src/style.css": "src/index.html"
        }
      }
    },
    watch: {
      options: {
        atBegin: true,
        interrupt: false,
        livereload: true,
        spawn: false
      },
      all: {
        files: [
          "src/**/*.html",
          "src/**/*.scss"
        ],
        tasks: ["default"]
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("default", ["sass", "uncss", "postcss", "inline"]);
  grunt.registerTask("sync", ["browserSync", "watch"]);
};

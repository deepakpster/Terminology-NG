'use strict';
var webpack = require('webpack');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    'concat': {
      options: {
        separator: ';',
      },
      generated: {
        files: [{
          src: [
            'js/vendor/jquery-2.2.2.js',
            'js/vendor/bootstrap.min.js',
            'js/vendor/moment-with-locales.js',
            'js/vendor/angular.min.js',
            'js/vendor/angular-ui-router.min.js',
            'js/vendor/ng-table.min.js'
          ],
          dest: '../server/public/js/vendor.js'
        }, {
          src: ['css/sass/**/*.scss'],
          dest: '../server/public/css/styles.css'
        }]
      },
      vendor: {
        src: [
          'js/vendor/jquery-2.2.2.js',
          'js/vendor/bootstrap.min.js',
          'js/vendor/moment-with-locales.js',
          'js/vendor/angular.min.js',
          'js/vendor/angular-ui-router.min.js',
          'js/vendor/ng-table.min.js'
        ],
        dest: '../server/public/js/vendor.js'
      },
    },
    'uglify': {
      app: {
        files: {
          '../server/public/js/app.js': '../server/public/js/app.js'
        }
      },
      vendor: {
        files: {
          '../server/public/js/vendor.js': [
            'js/vendor/jquery-2.2.2.js',
            'js/vendor/bootstrap.min.js',
            'js/vendor/moment-with-locales.js',
            'js/vendor/angular.min.js',
            'js/vendor/angular-ui-router.min.js',
            'js/vendor/ng-table.min.js'
          ]
        }
      }
    },
    'watch': {
      html: {
        files: ['views/**/*.html'],
        tasks: ['webpack']
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['webpack']
      },
      sass: {
        files: 'css/sass/**/*.scss',
        tasks: ['webpack']
      },
      css: {
        files: 'css/sass/**/*.css',
        tasks: ['webpack']
      }
    },
    'copy': {
      main: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, src: ['views/**'], dest: '../server/public/' },
          { expand: true, src: ['images/**'], dest: '../server/public/' },
          { expand: true, src: ['fonts/**'], dest: '../server/public/' },
          { expand: true, src: ['css/**/*.css'], dest: '../server/public/' },
          { expand: true, src: ['resources/**/*'], dest: '../server/public/' }
        ]
      },
    },
    'webpack': {
      dist: {
        entry: './js/src/init.js',
        output: {
          path: '../server/public/',
          filename: 'js/app.js',
        },
        module: {
          loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
          }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
          }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
          }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
          }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
          }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
          }, {
            test: /\.less$/,
            loader: "style!css!less"
          }]
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');


  // Default task.
  if (process.env.NODE_ENV == 'production') {
    grunt.registerTask('default', [
      'webpack',
      'uglify',
      'copy'
    ]);
  } else {
    grunt.registerTask('default', [
      'webpack',
      'concat',
      'copy',
      'watch'
    ]);
  }
};

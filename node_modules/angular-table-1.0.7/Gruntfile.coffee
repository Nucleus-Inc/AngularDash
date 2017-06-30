version = "1.0.7"

banner = "
// author:   Samuel Mueller \n
// version: #{version} \n
// license:  MIT \n
// homepage: http://github.com/samu/angular-table \n
"

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    version: version

    coffee:
      options:
        join: true
      compile:
        files: {"dist/angular-table.js" : [
          'coffee/angular_table.coffee',

          'coffee/configuration/column_configuration.coffee',
          'coffee/configuration/configuration_variable_names.coffee',
          'coffee/configuration/scope_config_wrapper.coffee',
          'coffee/configuration/table_configuration.coffee',

          'coffee/directives/table/setup/setup.coffee',
          'coffee/directives/table/setup/standard_setup.coffee',
          'coffee/directives/table/setup/paginated_setup.coffee',
          'coffee/directives/table/table.coffee',

          'coffee/directives/pagination/page_sequence.coffee',
          'coffee/directives/pagination/pagination_template.coffee',

          'coffee/directives/at_table.coffee',
          'coffee/directives/at_pagination.coffee',
          'coffee/directives/at_implicit.coffee'
        ]}

    usebanner:
      options:
        position: 'top'
        banner: banner
        linebreak: false
      files:
        src: ['dist/angular-table.js', 'dist/angular-table.min.js']

    uglify:
      js:
        src: 'dist/angular-table.js'
        dest: 'dist/angular-table.min.js'
      options:
        banner: banner

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-banner')

  grunt.registerTask('default', ['coffee', 'usebanner', 'uglify'])

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        imagemin : {

            minify : {
                expand : true,
				cwd: '<%= pkg.route_folder_site %>', 
                src : [ '**/*.{png,jpg,gif}' ],
                dest : 'target/minified/public'
            }

        }, 
		concat: {
			ralph: {
				src: ['<%= pkg.route_folder_site %>/**/*.js', '!*.min.js'], 
				dest: '<%= pkg.route_folder_build %>/js/<%= pkg.name_site %>.js',
			},
			wiggum: {
				src: ['<%= pkg.route_folder_site %>/**/*.css', '!*.min.css'], 
				dest: '<%= pkg.route_folder_build %>/css/<%= pkg.name_site %>.css',
			}						
		},		
		htmlmin: {
			ralph: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				expand: true,
				cwd: '<%= pkg.route_folder_site %>',
				src: ['**/*.html'],
				dest: '<%= pkg.route_folder_build %>',
			}
		},	  	
		uglify: {
			options: {
				mangle: false,
				preserveComments: false,
			},
			ralph: {
				files: [{
					expand: true,     
					src: '<%= pkg.route_folder_build %>/js/<%= pkg.name_site %>.js', 
					ext:  '.min.js'
				},],
			},
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				removeComments: true
			},
			ralph: {
				files: [{
					expand: true,     
					src: '<%= pkg.route_folder_build %>/css/<%= pkg.name_site %>.css', 
					ext:  '.min.css'
				}],
			},		  
		},	  
		sass: { 
			options: {
				lineNumbers: true,
				sourcemap: "none"
			},	                             
			ralph: {
				expand: true,
				cwd: '<%= pkg.route_folder_site %>', 
				src: ['**/*.scss', '!**/_*.scss'],
				dest: '<%= pkg.route_folder_build %>', 
				ext: '.css'
			},	    
		},
		less: {
			options: {
				removeComments: true
			},	                             
			ralph: {
				expand: true,
				cwd: '<%= pkg.route_folder_site %>', 
				src: ['**/*.less', '!**/_*.less'],
				dest: '<%= pkg.route_folder_build %>',
				ext: '.css'
			},	
		},	
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('ralph', ['concat','htmlmin','uglify','cssmin','sass','less']);
};
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-ngdocs');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
	    jsdoc : {
	        dist : {
	            src: ['../src/libs/ADF/API/ADFAPI.js', '../src/libs/ADF/jQuery/ADFUI.js'],
	            options: {
	                destination: '../docs/adf',
	                private: false
	            }
	        }
	    },
	    ngdocs: {
			options: {
				dest: '../docs/adf-ng',
				html5Mode: false,
				startPage: 'api_adf_ng',
				title: "ADF Docs",
				navTemplate: 'docs-nav-template.html'
			},
			api_adf_ng: {
				src: ['../src/libs/ADF/ng/**/*.js'],
				title: 'ADF Angular components',
				api: true
			}
		},
		ngtemplates: {
			ngdocs: {
				src:  '<%= ngdocs.options.dest %>/partials/**/**.html',
				dest: '<%= ngdocs.options.dest %>/templates.js',
				options: {
					module: 'docsApp'
				}
			}
		},
		replace: {
		    fixTemplates: {
		        replacements : [{
		            from: '../docs/adf-ng/partials',
		            to: 'partials'
		        },{
		            from: '<a href=\\"#',
		            to: '<a mock-link href=\\"#'
		        }],
            	src: ['<%= ngdocs.options.dest %>/templates.js'], 
            	dest: '<%= ngdocs.options.dest %>/templates.js'
		    },
		    fixIndexPage: {
		        replacements : [{
		            from: '})();',
		            to: "addTag('script', {src:'templates.js'}, sync); } )();"
		        },{
		            from: '<a href="{{page.url}}" tabindex="2">',
		            to: '<a href="{{page.url}}" tabindex="2" mock-link>'
		        },{
		            from: '<a ng-show="crumb.url"',
		            to: '<a mock-link ng-show="crumb.url"'
		        },{
		            from: '<a class="code" href=',
		            to: '<a mock-link class="code" href='
		        }],
            	src: ['<%= ngdocs.options.dest %>/index.html'], 
            	dest: '<%= ngdocs.options.dest %>/index.html'
		    }
		},
		copy: {
			docsLibs: {
				src: '../release/docs-libs.js',
				dest: '../docs/adf-ng/js/docs-libs.js'
			}
		}
	});

	grunt.registerTask('cache-templates', ['ngtemplates:ngdocs', 'replace:fixTemplates', 'replace:fixIndexPage']);
	grunt.registerTask('adf-ngdocs', ['ngdocs', 'cache-templates', 'copy:docsLibs']);
	grunt.registerTask('adf-docs', ['adf-ngdocs', 'jsdoc']);
	grunt.registerTask('default', ['adf-docs']);
};
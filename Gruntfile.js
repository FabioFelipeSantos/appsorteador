const { match } = require("assert");

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		less: {
			development: {
				files: {
					"./dev/styles/main.css": "./src/styles/main.less",
				},
			},
			production: {
				options: {
					compress: true,
				},
				files: {
					"./dist/styles/main.min.css": "./src/styles/main.less",
				},
			},
		},
		sass: {
			dist: {
				options: {
					style: "",
				},
				files: {
					"main2.css": "main.sass",
				},
			},
		},
		watch: {
			options: {
				atBegin: true,
			},
			less: {
				files: ["./src/styles/**/*.less"],
				tasks: ["less:development"],
			},
			html: {
				files: ["src/index.html"],
				tasks: ["replace:dev"],
			},
		},
		replace: {
			dev: {
				options: {
					patterns: [
						{
							match: "ENDERECO_CSS",
							replacement: "./styles/main.css",
						},
						{
							match: "ENDERECO_JS",
							replacement: "../src/scripts/main.js",
						},
					],
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["src/index.html"],
						dest: "dev/",
					},
				],
			},
			dist: {
				options: {
					patterns: [
						{
							match: "ENDERECO_CSS",
							replacement: "./styles/main.min.css",
						},
						{
							match: "ENDERECO_JS",
							replacement: "./scripts/main.min.js",
						},
					],
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["prebuild/index.html"],
						dest: "dist/",
					},
				],
			},
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					"prebuild/index.html": "src/index.html",
				},
			},
		},
		clean: ["prebuild"],
		uglify: {
			target: {
				files: {
					"dist/scripts/main.min.js": "src/scripts/main.js",
				},
			},
		},
		concurrent: {
			target: ["less", "replace:dev"],
		},
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-replace");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["watch"]);
	grunt.registerTask("build", ["less:production", "htmlmin:dist", "replace:dist", "clean", "uglify"]);
	grunt.registerTask("rep", ["replace:dev"]);
};

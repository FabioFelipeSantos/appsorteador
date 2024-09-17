# App Sorteador

An app to study the compression and compilation of files using [Grunt JS](https://gruntjs.com/), a library to execute tasks with ease.

The app is simple: just a HTML page with an `input` that the user can use to enter a integer. After clicking on the button, a random number will appear on the screen.

There are two distinct processes for the development and building environments. In development, the HTML will be settled to point to correct `.css` and `.js` files and the `dev` folder is created for that the final app can be inspected on local machines. For building, the HTML, LESS and JS will be minified and converted if needed, and the `dist` folder is created.

## Base Technologies

-   HTML5
-   LESS
-   Vanilla JS, Common JS
-   Grunt and your plugins:
    -   grunt-contrib-less
    -   grunt-contrib-watch
    -   grunt-contrib-replace
    -   grunt-contrib-htmlmin
    -   grunt-contrib-clean
    -   grunt-contrib-uglify
    -   grunt-replace
-   VS Code
-   Git
-   GitHub
-   Vercel for deploying

## Grunt Config

```js
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
```

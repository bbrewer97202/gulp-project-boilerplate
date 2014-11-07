# gulp-project-boilerplate
Boilerplate directory structure and gulp.js tasks for web projects.

## Overview
Use as a starting point for front-end development.  
* Source directory ("src") contains all source files.  Build tasks create development ("dev") and production ("dist") instances.  
* Assumes a CommonJS module pattern approach for JavaScript (framework-agnostic).
* SASS generates CSS.

## Installation
After cloning the project, cd into the "src" directory and run the following to install the node.js dev dependencies:
```sh
$ npm install
```

## Configuration
* Modify paths, target names and config objects in /src/gulp-config.js as needed. 
* Modify or remove tasks in /src/gulpfile.js as needed.
* Update /src/.jshintrc with linting rules as desired.
* Install custom dependencies via npm (jQuery included as example).

## Tasks
####Generate a development ("dev") instance of the site:
```sh
$ gulp
```
Compiles SASS with debugging, compiles JavaScript, runs image optimizations, copies source files to "dev" directory.

####Generate a production ("dist") instance of the site:
```sh
$ gulp --env production
```
Compiles SASS to minified CSS, compiles minified JavaScript, runs image optimizations, copies source files to "dist" directory.

####Start the "watch" task
```sh
$ gulp watch
```
Watches source files for modification and re-runs tasks, starts a local browser-sync development server at http://localhost:3000.

####Cleanup
```sh
$ gulp clean
```
Removes the "dev" and "dist" directories.

## Customization

#####HTML
Add your .html files and directories to /src/html.

#####JavaScript
Two JavaScript files are created in the build process:
* *app.js* - Add custom JavaScript modules to /src/js/modules.  Modify /src/js/app.js as the "main" module of the project.
* *header.js* - Add JavaScript files that need to appear in the document HEAD tag to /src/js/header and they will appear in this file.

#####SASS
Create .scss files that will be turned into CSS files under /src/sass.  Add partials for import to those files in directories under /src/sass/partials.

## License

[MIT License](http://opensource.org/licenses/MIT)
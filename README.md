# gulp-project-boilerplate
Boilerplate directory structure with gulp and webpack tasks for CommonJS web projects.

## Overview
Use as a starting point for front-end development.  
Source directory ("src") contains all source files.  Build tasks create development ("dev") and production ("dist") instances.  


## Installation
After cloning the project, cd into the "src" directory and install the node.js dev dependencies:
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

####Start the watch task
```sh
$ gulp watch
```
Watches source files for modification and re-runs tasks, starts a local browser-sync development server at http://localhost:3000.

####Cleanup
```sh
$ gulp clean
```
Removes the "dev" and "dist" directories.

## License

[MIT License](http://opensource.org/licenses/MIT)
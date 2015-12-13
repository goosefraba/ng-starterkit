# ng-starterkit
The ng-starterkit provides a skeleton for building AngularJS applications based on TypeScript, Webpack and SCSS/LESS.
Besides the support for multiple apps, this starterkit includes a complete context sensitive build pipeline based on GulpJs.

## Getting Started
* First of all we install the required dependencies from npm and bower:
```
    npm install
    bower install
```
* During the development we usually want to include sourcemaps and console output in our build. This development build can be generated using the following command:
```
    gulp ui:build
```
  The resulting build can be found under `build`.
* For a production build the source is minified, sourcemaps and console output are removed. To start the production build use:
```
    gulp ui:compile
```
  The resulting build can be found under `bin`.
* An extension to the development build is the *watch mode* - this corresponds to continuous dev builds which are triggered by changes in the source files.
  In addition, the watch mode provides a basic web server (browser-sync) that automatically refreshes the browser when the changes are compiled.
```
    gulp ui:watch
```

## Project Structure
The following visualization of the project structure highlights the most important configuration and structure principles of this kit:
```
|-- ng-starterkit
    |-- bower.json                              # bower dependencies configuration
    |-- package.json                            # project file
    |-- tsconfig.json                           # typescript compiler configuration
    |-- tsd.json                                # typescript type definition configuration
    |-- tslint.json                             # typescript lint configuration
    |-- bin                                     # target for production builds
    |-- bower_components                        # bower dependencies
    |-- build                                   # target for dev builds
    |-- gulp                                    # build related files
    |   |-- app.json                            # context (app) specific configuration
    |   |-- default.json                        # basic configuration
    |   |-- tasks                               # gulp tasks
    |   |-- util
    |       |-- karma.conf.dev.js               # karma configuration for dev build
    |       |-- karma.conf.pro.js               # karma configuration for production build
    |       |-- webpack.config.dev.js           # webpack configuration for dev build
    |       |-- webpack.config.pro.js           # webpack configuration for production build
    |-- src                                     # source directory
    |   |-- app                                 # example for application context
    |       |-- app.ts                          # app entry point
    |       |-- index.html                      # app index file
    |       |-- assets                          # application assets
    |       |   |-- less
    |       |   |-- scss
    |       |-- components                      # angular components
    |       |-- locale                          # translation files
    |       |-- test                            # tests
    |-- typings                                 # typescript type definitions
```

## Build Configuration & Context
One fundamental principle of the ng-starterkit is the *context sensitive build*. This means that the build process is able to handle multiple applications within the project. As we can see from the project structure the default context is the `app` context (`src/app`). By creating another directory under `src` we also create another context or application.
Regarding the build process, we can override the default configuration (`gulp/default.json`) for each context individually by creating a json file named by the context. An example for this is the configuration file for the `app` context (see `gulp/app.json`).

### Start Build for Specific Context
As defined in the `default.json` configuration the standard context is the `app` context. To start the build process for another context (e.g. `otherapp`) we can override this property using additional cli parameters:
```
gulp ui:build --build:context otherapp
```
Overriding parameters from the cli is supported for all build modes (build, watch and compile).

### Versioning
For automatic and production builds it is common to introduce a version or build number in the filename of the static files. The default build suffix is `SNAPSHOT` and should be overridden with the following cli parameter:
```
gulp ui:compile --build:context app --build:version 1.2.3
```
## Dependency Handling
When adding new dependecies to the angular application we can use bower (http://bower.io/#install-packages) or the npm repository (https://www.npmjs.com/). Please note that the dependencies are shared across the different contexts and should be *saved* in the corresponding configuration files:
```
npm install jquery --save
bower install jquery --save
```
In addition to include the installed package you must require it in your source files
```
require("jquery");
```
### Typescript Type Definitions
To use external libraries like e.g. restangular in a static typed way you don't have to write all interfaces on you own. The ng-starterkit includes the definition manager of the DefinitelyTyped project. It is recommended to check their repository for existing typescript definition files
```
tsd query angular
```
See also https://github.com/DefinitelyTyped/tsd for a detailed documentation of tsd.

## FAQ
* Where can I change/add the less/scss files used during the build?
 Check the context configuration (e.g. `gulp/app.json`) in the `less / scss` section. The corresponding `src` property defines which files should be compiled. Note: as the src property is an array you can also define multiple files here!  

## Resources
* Typescript https://github.com/microsoft/typescript
* Webpack https://github.com/webpack/webpack
* Bower http://bower.io/
* GulpJs http://gulpjs.com/
* DefinitelyTyped https://github.com/DefinitelyTyped/

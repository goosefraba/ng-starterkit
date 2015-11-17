/// <reference path="app.d.ts" />

// libraries
require("angular");
require("angular-ui-router");
require("angular-translate");
require("angular-translate-loader-static-files");
require("restangular");
require("angular-bootstrap");

require("src/app/components/foo/foo");
require("src/app/components/bar/bar");


/**
 * App Controller
 */
export class AppCtrl implements app.IBaseController {

    public static $inject:Array<string> = [
        "$scope"
    ];

    constructor(private $scope:app.IBaseScope) {
        console.log("AppCtrl loaded");
        this.$scope.vm = this;
    }
}

/**
 * AngularJS Module Definition
 */

// module dependencies
const moduleDependencies:Array<string> = [
    "ui.router",
    "ui.bootstrap",
    "restangular",
    "pascalprecht.translate",
    "ngstk.app.foo",
    "ngstk.app.bar"
];

// module definition
angular.module("ngstk.app", moduleDependencies)
    .controller("ngstk_appCtrl", AppCtrl)
    .config(($locationProvider:ng.ILocationProvider,
             $translateProvider:angular.translate.ITranslateProvider,
             $stateProvider:angular.ui.IStateProvider,
             $urlRouterProvider:angular.ui.IUrlRouterProvider,
             RestangularProvider:restangular.IProvider) => {


        // set html5 mode
        $locationProvider.html5Mode(true).hashPrefix("!");

        // set base url for restangular
        RestangularProvider.setBaseUrl("/api/v1");

        // state definition
        $stateProvider
            .state("app", {
                url: "",
                abstract: true,
                resolve: {},
                views: {
                    "": {
                        controller: "ngstk_appCtrl",
                        templateUrl: "app.tpl.html"
                    }
                },
                data: {}
            });

        // setup translation
        $translateProvider.useStaticFilesLoader({
            prefix: "/locale/locale-",
            suffix: ".json"
        });

        $translateProvider.preferredLanguage("en");

        // default route
        $urlRouterProvider.otherwise("/");
    });


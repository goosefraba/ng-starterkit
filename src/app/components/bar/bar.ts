/// <reference path="bar.d.ts" />

// libraries
require("angular");

/**
 * Foo Controller
 */
export class BarCtrl implements app.IBaseController {

    public static $inject = [
        "$scope"
    ];

    constructor(private $scope:app.IBaseScope) {
        console.log("BarCtrl loaded");
        this.$scope.vm = this;
    }

}


/**
 * AngularJS Module Definition
 */

// module dependencies
var moduleDependencies = [
    "pascalprecht.translate"
];

// module definition
angular.module("ngstk.app.bar", moduleDependencies)
    .controller("ngstk_barCtrl", BarCtrl)
    .config(($stateProvider:angular.ui.IStateProvider) => {
        // state definition
        $stateProvider
            .state("bar", {
                parent: "app",
                url: "/bar",
                resolve: {},
                views: {
                    "main-content": {
                        controller: "ngstk_barCtrl",
                        templateUrl: "/components/bar/bar.tpl.html"
                    }
                },
                data: {}
            });
    });


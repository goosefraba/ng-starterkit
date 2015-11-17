/// <reference path="foo.d.ts" />

// libraries
require("angular");

/**
 * Foo Controller
 */
export class FooCtrl implements app.IBaseController {

    public static $inject = [
        "$scope"
    ];

    constructor(private $scope:app.IBaseScope) {
        console.log("FooCtrl loaded");
        this.$scope.vm = this;
    }

    public onClickCtrl():void {
        console.log("onClickCtrl triggered!");
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
angular.module("ngstk.app.foo", moduleDependencies)
    .controller("ngstk_fooCtrl", FooCtrl)
    .config(($stateProvider:angular.ui.IStateProvider) => {
        // state definition
        $stateProvider
            .state("foo", {
                parent: "app",
                url: "/",
                resolve: {},
                views: {
                    "main-content": {
                        controller: "ngstk_fooCtrl",
                        templateUrl: "/components/foo/foo.tpl.html"
                    }
                },
                data: {}
            });
    });


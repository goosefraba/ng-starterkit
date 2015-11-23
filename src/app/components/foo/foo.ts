/// <reference path="foo.d.ts" />

// libraries
require("angular");

class FooService implements foo.IFooService{
    public getTheFoo():string{
        return "here is the foo";
    }
}


/**
 * Foo Controller
 */
class FooCtrl implements app.IBaseController {

    public static $inject:Array<string> = [
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
const moduleDependencies:Array<string> = [
    "pascalprecht.translate"
];

// module definition
angular.module("ngstk.app.foo", moduleDependencies)
    .controller("ngstk_fooCtrl", FooCtrl)
    .service("ngstk_fooService", FooService)
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


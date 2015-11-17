/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="components/foo/foo.d.ts" />


declare module app {
    interface IBaseScope extends ng.IScope {
        vm:IBaseController;
    }

    interface IBaseController {
    }
}
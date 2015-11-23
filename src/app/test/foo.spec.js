describe('Foo Service', function(){
    var fooService;

    beforeEach(function(){
        module("ngstk.app.foo");
        inject(function($injector){
            fooService = $injector.get("ngstk.app.foo");
        });
    });

    it("should return 'here is the foo'", function() {
        expect(fooService.getTheFoo()).toEqual('here is the foo');
    });
});
describe("MODULE_Forms", function() {

    it('Execute', function() {    
	    expect(APP.modules.Forms().age()).toBe(34);
    });

    
	it("should validate eu@jaffar.com.br",function(){
        var result = APP.modules.Forms().Email_valid("eu@jaffar.com.br");
        expect(result).toBe(true);
    });

});
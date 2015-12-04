describe("MODULE_Teste", function() {

    it('Execute', function() {    
	    expect(APP.modules.Forms().return100()).toBe(100);
    });

    
	it("should validate eu@jaffar.com.br",function(){
        var result = APP.modules.Forms().Email_valid("eu@jaffar.com.br");
        expect(result).toBe(true);
    });

});
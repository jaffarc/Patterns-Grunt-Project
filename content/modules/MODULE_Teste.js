APP.modules.Forms = function (module) {
    
    /* start-test-block */
    var module = this;
    /* end-test-block */

    module.return100 = function() {
        return 100;
    };


    module.Email_valid = function(email){
        var pattern =/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return pattern.test(email)
    };


    /* start-test-block */
    return {
        return100: module.return100,
        Email_valid: module.Email_valid
       
    };
    /* end-test-block */
};
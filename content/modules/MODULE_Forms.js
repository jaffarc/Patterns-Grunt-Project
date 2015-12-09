APP.modules.Forms = function (module) {
    
    /* start-test-block */
    var module = this;
    /* end-test-block */

    module.age = function() {
        return 34;
    };


    module.Email_valid = function(email){
        var pattern =/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return pattern.test(email)
    };


    /* start-test-block */
    return {
        age: module.age,
        Email_valid: module.Email_valid
       
    };
    /* end-test-block */
};
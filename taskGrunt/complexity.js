module.exports = {
   generic: {
    src: ['0.jquery-1.11.3.js', './content/**/**/**/*.js'],
    exclude: ['0.jquery-1.11.3.js'],
    options: {
        force: true,
        breakOnErrors: true,
        //jsLintXML: 'report.xml',         // create XML JSLint-like report
        //checkstyleXML: 'checkstyle.xml', // create checkstyle report
        //pmdXML: 'pmd.xml',               // create pmd report
        valid: true,
        errorsOnly: false,               // show only maintainability errors
        cyclomatic: 5,          // or optionally a single value, like 3
        halstead: 22,           // or optionally a single value, like 8
        maintainability: 100,
        hideComplexFunctions: true,     // only display maintainability
        broadcast: true                 // broadcast data over event-bus
    }
  }
};
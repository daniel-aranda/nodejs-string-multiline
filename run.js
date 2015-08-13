var stringMultiline = require('./string-multiline.js');

stringMultiline.parseMultilineVars('./tests/fixtures/some-vars.dat', function(result){
    console.log(result);
});

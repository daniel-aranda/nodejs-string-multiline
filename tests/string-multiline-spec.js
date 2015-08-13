var stringMultiline = require('../string-multiline.js');
var fixturesPath = process.cwd() + '/tests/fixtures/';

describe('String Multiline', function (){

    describe('parse some vars', function () {
        it('should call parse a dat file', function (done){

            var filePath = fixturesPath + 'some-vars.dat';
            stringMultiline.parseMultilineVars(filePath, function(result){
                var expected = {
                    my_string: 'This is a large string\nwith multiline support\nyeah!',
                    other_string: 'This is a large string\nwith multiline support\nyeah!',
                    yet_another_string: 'Wow\nThis is\nFantastic',
                    Some_SQL: 'SELECT\n    *\nFROM my_table',
                };
                expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
                done();
            });

        });
    });

    describe('invalid path', function(){
        it('should return exception to error callback', function(done){

            var runner = function(){
                stringMultiline.parseMultilineVars('random.path', function(result){ done(); }, function(error){
                    expect(error).toEqual(stringMultiline.exceptions.fileNotExists('random.path'));
                    done();
                });
            };
            runner();

        });
    });

});

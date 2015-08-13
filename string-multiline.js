var fs = require('fs');


var exceptions = {
    fileNotExists: function(filePath){
        return new Error('File not found: ' + filePath);
    },
    errorRunningRegEx: function(data){
        return new Error('Unknown error running the RegExp on: ' + data);
    }
};

function parseFile(error, data, callback, errorCallback){
    if( error ){
        console.error( error );
        errorCallback( error );
        return null;
    }

    var rawPattern = '<<<([A-z0-9_\-]+)[^]([^]*?)[^]>>>';
    var pattern = new RegExp(rawPattern, 'gmi');
    var rowPattern = new RegExp(rawPattern, 'mi');

    try{
        var matches = data.match(pattern);
    }catch(exception){
        console.error( exception );
        errorCallback( exceptions.errorRunningRegEx(data) );
        return null;
    }

    var varsCollector = {};

    if( matches ){
        matches = matches.forEach(function(item){
            var rowMatch = item.match(rowPattern);
            varsCollector[rowMatch[1]] = rowMatch[2];
        });
    }

    callback(varsCollector);
}

exports.parseMultilineVars = function(filePath, callback, errorCallback, encoding){

    encoding = encoding || 'utf8';

    fs.exists(filePath, function(exists){
        if( !exists ){
            console.error( exceptions.fileNotExists(filePath) );
            errorCallback( exceptions.fileNotExists(filePath) );
            return null;
        }
        fs.readFile(filePath, encoding, function(error, data){
            parseFile(error, data, callback, errorCallback);
        });
    });

}

exports.exceptions = exceptions;

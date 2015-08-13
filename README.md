# NodeJS String Multiline
NodeJS smooth support to multiline vars. Consider that multiline string vars
are commonly SQL queries, test strings, etc, this library load them from a
data file, where you could put it. Also you don't mess your beauty
JavaScript code with giant strings that aren't code.


##Introduction
Have you every dream to have a multiline
string support like Ruby and others, like this:
```
<<<my_var
This a very large string
>>>
<<<my_sql
SELECT
    *
FROM my_table
WHERE
    field = 'true';
```

And use it as:
```js
console.log(data.my_var);
console.log(data.my_sql);
```

This library makes it possible.

##Installation
```
npm install string-multiline
```


###Real World example:
```
mkdir data
cd data
touch somedata.dat //below content of somedata.dat
cd ..
touch app.js //below content of app.js
node app.js
```

You should see something like this as output:
```js
{
    my_var: '...',
    my_sql: '...'
}
```

####Content of somedata.dat:
```
<<<my_var
This is a large string
with multiline support
yeah!
>>>

<<<my_sql
SELECT
    *
FROM my_table
>>>
```

###Content of app.js
```js
var stringMultiline = require('string-multiline');

stringMultiline.parseMultilineVars('./data/somedata.dat', function(result){
    console.log(result);
});
```

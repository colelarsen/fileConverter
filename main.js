const fs = require('fs');
var parse = require('csv-parse')
var utilities = require('./utilities');
var formatConverter = require('./formatConvert');
var eva = require('./EvA_variance');


var myArgs = process.argv.slice(2);
var type = myArgs[0];
var origCSV = myArgs[1];
utilities.setFileName(myArgs[2]);

if(myArgs.length > 3)
{
    var hourMinimum = myArgs[3];
}



if(type == '0')
{
    utilities.readCSV(origCSV, formatConverter.transmitArray);
}
else if(type == '1')
{
    utilities.readCSV(origCSV, formatConverter.deleteLowerKey2);
}
else if(type == '2')
{
    eva.setMinimum(hourMinimum);
    utilities.readCSV(origCSV, eva.start);
}
else if(type == 'h' || type == 'help')
{
    console.log('Arg1 = h: help');
    console.log('Arg1 = 0: to convert permission set matrix to rows');
    console.log('Arg1 = 1: to skills based delete ratings');
    console.log('Arg1 = 2: EvA Variance');
    console.log('Arg2: incoming file name');
    console.log('Arg3: outbound file name');
    console.log('Arg4: minimum variance');
}

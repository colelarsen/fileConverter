const fs = require('fs');
var parse = require('csv-parse')

exports.toFile = toFile;
exports.readCSV = readCSV;
exports.toCSV = toCSV;
exports.printTop = printTop;
exports.getCSV = getCSV;
exports.setFileName = setFileName;

var fileNameCSV;



function setFileName(filename)
{
    fileNameCSV = filename;
}

function toFile(stringIn)
{
    fs.writeFile(fileNameCSV, stringIn, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

function readCSV(inputPath, func)
{
    fs.readFile(inputPath, function (err, fileData) {
        parse(fileData, {columns: false, trim: true}, function(err, rows) {
          // Your CSV data is in an array of arrys passed to this callback as rows.
          //console.log(rows);
          var array = [];
          for(var i = 0; i < rows.length; i++)
          {
              subArray = [];
            for(var j = 0; j < rows[0].length; j++)
            {
                subArray.push(rows[i][j]);
                
            }
            
            array.push(subArray);
          }
          func(array);
        })
      })
}

function toCSV(array)
{
    var strOut = "";
    for(var i = 0; i < array.length; i++)
    {
        for(var j = 0; j < array[i].length-1; j++)
        {
            strOut += array[i][j] + ',';
        }
        strOut += array[i][array[i].length-1];
        strOut += '\n';
    }
    toFile(strOut);
}

function getCSV(array)
{
    var strOut = "";
    for(var i = 0; i < array.length; i++)
    {
        for(var j = 0; j < array[i].length-1; j++)
        {
            strOut += array[i][j] + ',';
        }
        strOut += array[i][array[i].length-1];
        strOut += '\n';
    }
    return strOut;
}

function printTop(array)
{
    var strOut = "";
    for(var i = 0; i < array[0].length; i++)
    {
        for(var j = 0; j < array.length; j++)
        {
            strOut += array[i][j] + ' ';
        }
        strOut += '\n';
    }
    console.log(strOut);
}
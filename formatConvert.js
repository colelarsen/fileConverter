const fs = require('fs');
var parse = require('csv-parse')



var myArgs = process.argv.slice(2);
var type = myArgs[0];
var origCSV = myArgs[1];
var fileNameCSV = myArgs[2];


if(type == '0')
{
    readCSV(origCSV, transmitArray);
}
else if(type == '1')
{
    readCSV(origCSV, deleteLowerKey2);
}
else if(type == 'h' || type == 'help')
{
    console.log('Arg1 = h: to convert permission set matrix to rows');
    console.log('Arg1 = 0: to convert permission set matrix to rows');
    console.log('Arg1 = 1: to skills based delete ratings');
    console.log('Arg2: incoming file name');
    console.log('Arg3: outbound file name');
}












function toFile(filename, stringIn)
{
    fs.writeFile(filename, stringIn, function(err) {
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


function deleteLowerKey2(oldArray)
{
    var newRowHeaders = ["id", "Key1", "Key2"];
    var newArray = [newRowHeaders];
    for(var i = 1; i < oldArray.length; i+=2)
    {
        if(oldArray[i][2] <= oldArray[i+1][2])
        {
            newArray.push(oldArray[i]);
        }
        else
        {
            newArray.push(oldArray[i+1]);
        }
    }
    toCSV(newArray, fileNameCSV);
}

function transmitArray(oldArray)
{
    var newArray = [["key", "SobjecType", "id", "Permission Set Name", "CRUD", "PermissionsCreate", "PermissionsRead", "PermissionsEdit", "PermissionsDelete", "PermissionsViewAllRecords", "PermissionsModifyAllRecords"]];
    for(var i = 1; i < oldArray.length; i++)
    {
        for(var j = 1; j < oldArray[i].length; j++)
        {
            var row = [];
            var SobjectType = "";
            SobjectType = oldArray[i][0];
            var PermissionSetName = "";
            PermissionSetName = oldArray[0][j];
            var key = SobjectType + '|' + PermissionSetName;
            var CRUD = oldArray[i][j];
            //Key
            row.push(key)
            //SobjectType
            row.push(SobjectType)
            //Id
            row.push("")
            //Permission Set Name
            row.push(PermissionSetName)
            
            
            row.push(oldArray[i][j])

            if(CRUD == 'No Access')
            {
                row.push('No Access');
                row.push('No Access');
                row.push('No Access');
                row.push('No Access');
                row.push('No Access');
                row.push('No Access');
            }
            else
            {
                if(CRUD.includes('C'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }

                if(CRUD.includes('R'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }

                if(CRUD.includes('E'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }

                if(CRUD.includes('D'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }

                if(CRUD.includes('VA'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }

                if(CRUD.includes('MA'))
                {
                    row.push('TRUE');
                }
                else
                {
                    row.push('FALSE');
                }
            }
            
            newArray.push(row);
        }
        
    }
    toCSV(newArray, fileNameCSV);
    //printTop(newArray);
}

function toCSV(array, name)
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
    toFile(name, strOut);
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
//printTop(testArray);
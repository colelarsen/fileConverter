const fs = require('fs');
var parse = require('csv-parse')
var utilities = require('./utilities');


exports.deleteLowerKey2 = deleteLowerKey2;
exports.transmitArray = transmitArray;


var fileNameCSV;

function deleteLowerKey2(oldArray)
{
    fileNameCSV = fileName;
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
    utilities.toCSV(newArray);
}

function transmitArray(oldArray)
{
    var newArray = [["key", "SobjecType", "id", "Permission Set Name", "CRUD", "PermissionsCreate", "PermissionsRead", "PermissionsEdit", "PermissionsDelete", "PermissionsViewAllRecords", "PermissionsModifyAllRecords"]];
    for(var i = 1; i < oldArray.length; i++)
    {
        for(var j = 2; j < oldArray[i].length; j++)
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
            if(CRUD == 'No Access' || CRUD == '')
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

                if(CRUD.includes('R') || CRUD == 'No cost fields')
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
    utilities.toCSV(newArray);
    //printTop(newArray);
}


//printTop(testArray);
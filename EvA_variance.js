const fs = require('fs');
var parse = require('csv-parse')
var utilities = require('./utilities');

exports.start = start;



function start(oldArray)
{
    var outputArray = [[oldArray[0][0], oldArray[0][1], oldArray[0][2], oldArray[0][3], oldArray[0][4], oldArray[0][5], oldArray[0][6], "Hour Difference"]];
    var sumId = oldArray[1][4];
    var currentRow = [oldArray[1][0], "TRUE", 0, oldArray[1][3], oldArray[1][4], oldArray[1][5], oldArray[1][6]];

    for(var i = 1; i < oldArray.length; i++)
    {
        var currentId = oldArray[i][4];
        var estimatedHours = oldArray[i][2];

        if(currentId == sumId)
        {
            currentRow[2] =  (currentRow[2]-0) + (estimatedHours-0);
        }
        else
        {
            if(Math.abs(currentRow[2]-0 - currentRow[6]) >= 1)
            {
                currentRow[7] = Math.abs(currentRow[2] - currentRow[6])
                outputArray.push(currentRow);
            }

            sumId = currentId;
            currentRow = [oldArray[i][0], "TRUE", oldArray[i][2], oldArray[i][3], oldArray[i][4], oldArray[i][5], oldArray[i][6], 0];
        }
    }


    utilities.toCSV(outputArray);
}
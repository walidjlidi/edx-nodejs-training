
const fs = require('fs')
const path = require('path')
const convertCSVtoJson = (pathCSVFile = 'customer-data.csv') => {
    const CSVFileName = path.join(__dirname, pathCSVFile)
    var fileReader = fs.readFileSync(CSVFileName, {encoding: 'utf-8'}, function(err){console.log(err);});

    // Split on row
    const fileRows = fileReader.split("\n");

    // Get first row for column headers
    headers = fileRows.shift().split(",");

    var json = [];    
    fileRows.forEach(function(data){
        // Loop through each row
        tmp = {}
        row = data.split(",")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i]
        }
        // Add object to list
        json.push(tmp)
    });

    var outPath = path.join(__dirname, 'customer-data.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
        function(err){
            console.log(err)
        }
    );
}

convertCSVtoJson(process.argv[2])
const express = require('express'); // require the express framework
const app = express(); //require Express framework
const fs = require('fs'); //require file system object



// API to get patient details via NHS Number or Family Name
app.get('/getPatient/:id', function (req, res) { 
  let parsedData;
  let mergedJSON="";

  // Read through each file in the directory so that they can be checked. 
  fs.readdir('C:/temp/Black_Pear_Software_Engineer_Challenge/Black_Pear_Software_Engineer_Challenge', (err, files) => {
      if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
      }
      
      files.forEach(function (file, index) {
          let fileName = file.substring(0, 7);
          let familyName = "";

          // search for the patient files
          if(fileName == "patient"){
              const data = fs.readFileSync(__dirname + "/" + file,
                {encoding:'utf8', flag:'r'});
                  parsedData = JSON.parse(data);
                  // check if user is searching for NHS Number or surname
                  if(isNaN(req.params.id)){ //Family Name search
                    for (let i = 0; i < parsedData.name.length; i++) {
                      const name = parsedData.name[i];
                      familyName = name.family;
                      // if the family name has been found then add it.
                      if(familyName.toUpperCase() == req.params.id.toUpperCase()){
                        mergedJSON = mergedJSON + JSON.stringify(parsedData);
                      }
                    }
                }else{ //NHS Number search
                  for (let i = 0; i < parsedData.identifier.length; i++) {
                    const identifier = parsedData.identifier[0];
                    nhsNumber = identifier.value;
                    // if the NHS number has been found then add it.
                    if(nhsNumber == req.params.id){ 
                      mergedJSON = mergedJSON + JSON.stringify(parsedData);
                    }
                  }
                }
          }
      });
      if(mergedJSON == "" || typeof(mergedJSON)== "undefined") mergedJSON = "No Data Found";
      res.send(mergedJSON);
    });
})

// API to get patient observations via Patient reference
app.get('/getObservations/:id', function (req, res) {
    let parsedData;
    let mergedJSON;
    let result="";

    // Read through each file in the directory so that they can be checked. 
    fs.readdir('C:/temp/Black_Pear_Software_Engineer_Challenge/Black_Pear_Software_Engineer_Challenge', (err, files) => {
        if (err) {
          console.error("Could not list the directory.", err);
          process.exit(1);
        }
        
        files.forEach(function (file, index) {
            let fileName = file.substring(0, 11);
            // search for the observation files
            if(fileName == "observation"){
                const data = fs.readFileSync(__dirname + "/" + file,
                  {encoding:'utf8', flag:'r'});
                    parsedData = JSON.parse(data);

                    let id = parsedData["subject" ] 
                    result = id;
                    
                    let str = "reference.Patient";
                    let splitStr = str.split('.');
                    
                    // search the string to extract the patient number
                    for(let str of splitStr) {
                      if(!result) break;
                      result = result[str]
                      thenum = result.match(/\d+/)[0];
                      if(thenum>0) break;
                    }

                    // if the patient observation has been found then add it.
                    if(thenum == req.params.id){
                      mergedJSON = mergedJSON + JSON.stringify(parsedData);
                    }
            }
        });
        if(mergedJSON == "" || typeof(mergedJSON)== "undefined") mergedJSON = "No Data Found";
        res.send(mergedJSON);
      });
  })

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})


const express = require('express'); // requre the express framework
const app = express();
const fs = require('fs'); //require file system object



// API to get patient details via NHS Number or Family Name
app.get('/getPatient/:id', function (req, res) { 
  let parsedData;
  let mergedJSON="";

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
                      if(familyName.toUpperCase() == req.params.id.toUpperCase()){
                        mergedJSON = mergedJSON + JSON.stringify(parsedData);
                      }
                    }
                }else{ //NHS Number search
                  for (let i = 0; i < parsedData.identifier.length; i++) {
                    const identifier = parsedData.identifier[0];
                    nhsNumber = identifier.value;
                    if(nhsNumber == req.params.id){ 
                      mergedJSON = mergedJSON + JSON.stringify(parsedData);
                    }
                  }
                }
          }
      });
      res.send(mergedJSON);
    });
})

// API to get patient observations via Patient reference
app.get('/getObservations/:id', function (req, res) {
    let parsedData;
    let mergedJSON;
    let result="";

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

                    for(let str of splitStr) {
                      if(!result) break;
                      result = result[str]
                      thenum = result.match(/\d+/)[0];
                      if(thenum>0) break;
                    }

                    if(thenum == req.params.id){
                      mergedJSON = mergedJSON + JSON.stringify(parsedData);
                    }
            }
        });
        res.send(mergedJSON);
      });
  })

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})


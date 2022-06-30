//a3a086a6895f908ff1f2a83575f27f57    <-----api key for openweathermap.org

const express = require('express');
const app = express();
const https = require('https');
//body parser to parse through body of a post request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


//const port = process.env.PORT || 3000; //process.end.PORT for this to work with Heroku & 3000 for local testing
//refer to heroku documentation on setting up server


//how server responds when it gets a GET request
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//how server responds when it gets a POST request
app.post("/", function(req, res){
    const city = req.body.cityName;;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=a3a086a6895f908ff1f2a83575f27f57";
    
    //fetches public API data
    https.get(url, (r) => {
    
        //show the status of the page
        //console.log(r.statusCode);
    
        r.on('data', (d) => {
            if(r.statusCode == 200){
                //this will parse the data into JSON
            const data = JSON.parse(d);
    
            //this will display one section of the JSON file
            var celsius = data.main.temp;
            var farenheight = celsius * 9/5 + 32
            res.send(`The temperature in ${city} is ${farenheight} degrees Farenheit.`);
            }
            else{
                console.log(r.statusCode)
            }
            
        });

    })
        
})

app.listen(process.env.PORT || 3000, () => {
  
})
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//GET route to return prjectData.
app.get('/data',(req,res)=>{
    res.json(projectData);
});

//POST route to store data in projectData.
app.post('/data',(req,res)=>{
    console.log(req.body);
    console.log(`old project data: `);
    console.log(projectData);
    projectData["temp"] = req.body.temp;
    projectData["date"] = req.body.date;
    projectData["response"] = req.body.resp;
    console.log(`new project data: `);
    console.log(projectData);
    res.end();
});

// Setup Server
app.listen(3000,()=>console.log('express started...'));
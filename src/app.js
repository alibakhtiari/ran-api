const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const cronJob = require('node-cron');

const axios = require('axios');

const sqlite3 = require('sqlite3').verbose();  
const db = new sqlite3.Database('src/ran.db');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

cronJob.schedule('*/1 * * * *', () => {
  console.log('running a task every minutes' + Date.now());
});

let count = 0;

app.get('/api', (req, res) => {
db.serialize(function() {  
    db.all("SELECT * from miner",function(err,rows){  
        if(err){  
            console.log(err);  
        }  
        else{  
            res.send(rows);
        }  
    });  
}); 
});

app.post('/api', (req, res) => {
++count;
res.json({count});
});


app.listen(port, () => {console.log(`ran api listening on port ${port}`);});
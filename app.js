const express = require('express')
const app = express()
const port = 3000
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('ran.db');  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let count = 0;

app.get('/api', (req, res) => {
//res.json({count})
// Select All Data  
db.serialize(function() {  
    db.all("SELECT * from miner",function(err,rows){  
        if(err)  
                             {  
            console.log(err);  
        }  
        else{  
            res.send(rows)  
        }  
    });  
}); 
})

app.post('/api', (req, res) => {
++count;
res.json({count});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const db = require('./config/db');
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const router = express.Router()

app.get('/', (req, res)=> {
    res.end("Hello");
  });
app.post('/api/for-king',(req,res)=> {    
    let user = {
        "p_name" : req.body.name,
        "p_lastname" : req.body.lastname,
        "regis_date" : "2022-04-28 18:00:00",
        "ip_addr" : "10.10.31.85",
        "browser" : "chrome",
        "device" : "desktop"
    }        
    let sql = "INSERT INTO forking SET ?"
    db.query(sql,user,(error,results,fields)=>{
        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })
        user = [{'id':results.insertId, ...user}]
        const result = {
            "status": 200,
            "data": user.id
        }
        return res.json(result)
    })
});
app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})
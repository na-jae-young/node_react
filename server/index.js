const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createPool({
    host: 'localhost',
    user: 'nah0101',
    password: 'cjdruf0984~',
    database: 'crud'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.get('/api/get',(req,res)=>{
    const sqlselect = "select * from moviereview"
    db.query(sqlselect, (err, result) => {  
        if(err) {   throw err }
        console.log(result);
        res.status(200).send(result);
    })
})

app.post('/api/insert', (req ,res)=>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlinsert = "INSERT INTO movieReview (movieName,movieReview) values (?,?)"
    db.query(sqlinsert,[movieName ,movieReview], (err,result) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('insert successfully')
    })
})

app.listen(3001 , ()=> {console.log("3001 server" )})
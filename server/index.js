const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { rejects } = require('assert');

const db = mysql.createPool({
    host: 'localhost',
    user: 'nah0101',
    password: 'cjdruf0984~',
    database: 'crud'
})

const listGet = (res,column,where)=>{
    const sqlselect = `select ${column} from movie_review ${where}`
    db.query(sqlselect, (err, result) => {  
        if(err) {   throw err }
        res.status(200).send(result);
    })
}

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/api/get',(req,res)=>{
    listGet(res,'*','')
})

app.post('/api/insert', (req ,res)=>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlinsert = "INSERT INTO movie_review (movieName,movieReview) values (?,?)"
    db.query(sqlinsert,[movieName ,movieReview], (err,result) =>{
        if(err){
            console.log(err);
            rejects(err) ;
        }else{
            listGet(res,'ID',`order by ID DESC LIMIT 1`)
        }
    })
})

app.delete('/api/delete/:ID',(req,res)=>{
    const ID = req.params.ID;
    const sqlDelete = `delete from movie_review where ID = ? `
    db.query(sqlDelete,[ID], (err, result) => {
        if(err){
            console.log(err);
            reject(err)
        }else{
            console.log('delete finished')
            res.status(200).send(result);
        }
    })
})

app.put('/api/update',(req,res)=>{
    console.log('server update')
    const ID = req.body.ID
    const review = req.body.newReview
    const sqlUpdate = `update movie_review set movieReview = ? where ID = ?`
    db.query(sqlUpdate,[review,ID],(err, result)=>{
        if(err){
            console.log(err);
            rejects(err)
        }else{
            console.log('update finished')
            res.status(200).send(result);
        }
    })
})

app.listen(3001 , ()=> {console.log("3001 server" )})

//같은것 선택 컨트롤 + D , 알트 + 마우스 클릭 
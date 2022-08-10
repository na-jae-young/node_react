import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
import { Type } from 'typescript';

function App() {
  interface movieData{ID:number,movieName:string,movieReview:string}
  const [movieName,setMovieName] = useState('')
  const [movieReview,setMovieReview] = useState('')
  const [movieList,setMovieList] = useState<movieData[]>([])


  useEffect(()=>{
    Axios.get(`http://localhost:3001/api/get`).then((res)=>{
      setMovieList(res.data)
    })
  },[])

  const submitReview = ():any=>{
    if(movieName === '') return alert('영화제목을 입력하세요')
    if(movieReview === '') return alert('리뷰를 입력하세요') 
    Axios.post(`http://localhost:3001/api/insert`,{
      movieName:movieName,
      movieReview:movieReview
    }).then(()=>{
      alert("success")
      setMovieList([...movieList,{ID:movieList.length + 100,movieName:movieName,movieReview:movieReview}])
      setMovieName('')
      setMovieReview('')
    })
  }
  const deleteReview = (movieName:any):any => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`)
  }

  return (
    <div className="App">
      <h1>CRUD</h1>
      <div className='form'>
        <label>Movie Name</label>
        <input type="text" value={movieName} placeholder='name' onChange={(e)=>{
          setMovieName(e.target.value)
        }}></input>
        <label>Movie Review</label>
        <input type="text" value={movieReview} placeholder='review' onChange={(e)=>{
          setMovieReview(e.target.value)
        }}></input>
        <button onClick={submitReview}>submit</button>
        
      {movieList.map((value)=>{
        return (<div key={value.ID} className="card"> 
        <h1>movie: {value.movieName}</h1>
        <p>review: {value.movieReview}</p>
        <input type="text" placeholder='review' id='reviewUpdate'></input>
        <button>Update</button>
        <button onClick={()=>deleteReview(value.movieName)}>Delete</button>
        </div>)
      })}
      </div> 
    </div> 
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';

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
    Axios.post(`http://localhost:3001/api/insert`,{
      movieName:movieName,
      movieReview:movieReview
    }).then(()=>{
      alert("success")
      setMovieList([...movieList,{ID:movieList.length + 1,movieName:movieName,movieReview:movieReview}])
      setMovieName('')
      setMovieReview('')
    })
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
      </div>   
      <div>{movieList.map((value)=>{
        return <div key={value.ID}> 
        <h1>movie: {value.movieName}</h1>
        <p>review: {value.movieReview}</p>
        </div>})}</div> 
    </div>
  );
}

export default App;

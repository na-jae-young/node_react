import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  interface movieData{ID:number,movieName:string,movieReview:string}
  const [movieName,setMovieName] = useState('')
  const [movieReview,setMovieReview] = useState('')
  const [movieList,setMovieList] = useState<movieData[]>([])
  const [newReview, setNewReview] = useState('')

  useEffect( ()=>{
    Axios.get(`http://localhost:3001/api/get`).then((res)=>{
      setMovieList(res.data)
    })
  },[])

  const submitReview =  ()=>{
    if(movieName === '') return alert('영화제목을 입력하세요')
    if(movieReview === '') return alert('리뷰를 입력하세요') 
    Axios.post(`http://localhost:3001/api/insert`,{
      movieName:movieName,
      movieReview:movieReview
    }).then((res)=>{
      alert("insert success")
      setMovieList([...movieList,{
        ID:res.data[0].ID , movieName:movieName,movieReview:movieReview
      }])
      setMovieName('')
      setMovieReview('')
    }).catch(()=>{
      alert('insert error 관리자에 문의')
    })
  }

  const deleteReview = (ID:number):any => {
    Axios.delete(`http://localhost:3001/api/delete/${ID}`)
    .then((res)=>{alert("delete success")})
    .catch(()=>{alert('delete error 관리자에 문의')})
    const newMovieList=movieList.filter((val)=>{return val.ID !== ID});
    setMovieList(newMovieList)
  }

  const updateReview = (ID:number,newReview:string):any=> { 
    if(!newReview)return alert('리뷰를 입력하세요')
    Axios.put(`http://localhost:3001/api/update`,{ID:ID,newReview:newReview})
    .then(()=>{
      // eslint-disable-next-line array-callback-return
      const newList = movieList.map(val=>{if(val.ID === ID){val.movieReview = newReview} return val})
      setMovieList(newList)
      setNewReview('')
      alert('update success')
    }).catch(()=>{
      setNewReview('')
      alert('update error 관리자에 문의')
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
        
      {movieList.map((value)=>{
        return (<div key={value.ID} className="card"> 
        <h1>movie: {value.movieName}</h1>
        <p>review: {value.movieReview}</p>
        <input 
          type="text" 
          placeholder='review' 
          id='reviewUpdate'
          value={newReview}
          onChange={(e)=>{setNewReview(e.target.value)}}>
        </input>
        <button onClick={()=>updateReview(value.ID,newReview)}>Update</button>
        <button onClick={()=>deleteReview(value.ID)}>Delete</button>
        </div>)
      })}
      </div> 
    </div> 
  );
}

export default App;

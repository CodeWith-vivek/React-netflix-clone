import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from "@/assets/icons/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieVideos } from '@/features/movies/services/movieService'

const Player = () => {

    const {id}=useParams()

    const navigate=useNavigate()

    const [apiData,setApiData]=useState({
        name:"",
        key:"",
        published_at:"",
        type:""
    })

    useEffect(()=>{

        getMovieVideos(id)
          .then((results) => setApiData(results[0]))
          .catch((err) => console.error(err));
    },[id])

  return (
    <div className="player">
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
        <iframe src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" width="90%" height="90%" title="trailer" allowFullScreen></iframe>
        <div className="player-info">
            <p>{apiData.published_at.slice(0,10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
        </div>
      
    </div>
  )
}

export default Player

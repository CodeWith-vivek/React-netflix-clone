import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const {id}=useParams()

    const navigate=useNavigate()

    const [apiData,setApiData]=useState({
        name:"",
        key:"",
        published_at:"",
        type:""
    })

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
   Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    useEffect(()=>{

        axios
          .request(options)
          .then((res) => setApiData(res.data.results[0]))
          .catch((err) => console.error(err));
    },[])

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

import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import { Link } from 'react-router-dom'

import axios from 'axios'



const TitleCards = ({title,category}) => {

    const [apiData,setApiData]=useState([])
    const cardsRef = useRef();

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    
    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    useEffect(() => {

        axios
          .request(options)
          .then((res) => setApiData(res.data.results))
          .catch((err) => console.error(err));


      cardsRef.current.addEventListener("wheel", handleWheel);
    }, []);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import { Link } from 'react-router-dom'

import { TMDB_IMAGE_BASE_URL } from '@/lib/tmdb'
import { getMoviesByCategory } from '../../services/movieService'

const TitleCards = ({title,category}) => {

    const [apiData,setApiData]=useState([])
    const cardsRef = useRef();


    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    useEffect(() => {

        getMoviesByCategory(category || undefined)
          .then(setApiData)
          .catch((err) => console.error(err));


      cardsRef.current.addEventListener("wheel", handleWheel);
    }, [category]);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={TMDB_IMAGE_BASE_URL+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

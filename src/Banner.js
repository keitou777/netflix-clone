import React, {useEffect, useState} from 'react';
import axios from "./axios";
import requests from "./requests";
import "./Banner.css"
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    const [playTrailer, setPlayTrailer] = useState(false)

    const handleClick = () => {
        setPlayTrailer(!playTrailer);
    }

    const opts = {
        height: "390",
        width: "100%",
        
        playerVars: {
            controls: 0,
            autoplay: 1,
        }
    }

    useEffect(()=>{
        // get random movie info
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)])
            
        }
        fetchData();
    },[])

     useEffect(()=>{
         console.log("movie is good")
         console.log(movie)
        // ========= get trailerURL ============
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name|| movie?.title ||"")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch(error=> console.log(error))
        }
    },[movie])

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

  return (
<div>
    {playTrailer ?
        trailerUrl && <div className="banner_youtube">
                        <button 
                            className="banner_button"
                            onClick={()=>setPlayTrailer(!playTrailer)}
                            >Close Player</button>
                        <YouTube videoId={trailerUrl} opts={opts}/>
                    </div> :
        
    <header 
        className="banner" 
        style={{
            backgroundSize: "cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
            }}>
      <div className="banner_contents">
          <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
          <div className="banner_buttons">
              {trailerUrl &&
              <button 
                className="banner_button"
                onClick={()=>setPlayTrailer(!playTrailer)}
                    >Play Trailer</button>}
            
            <button className="banner_button">My List</button>
          </div>
          <h1 className='banner_description'>{truncate(movie.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>}
</div>
    
  )
}

export default Banner

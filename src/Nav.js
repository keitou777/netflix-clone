import React, { useEffect, useState } from 'react'
import "./Nav.css"


function Nav() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
            handleShow(true);
            } else {
            handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll",handleShow,true);
        }
        
    },[])

    return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className='nav_logo'
      src='https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
      alt="Netflix Logo"
      />
      <img className='nav_avatar'
      src='https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
      alt="Netflix Logo"
      />
    </div>
  )
}

export default Nav

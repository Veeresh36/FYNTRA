import React from 'react'
import { Link } from 'react-router-dom'
import style from '../pages/home.module.css'
import Homepros from '../pages/homepros'

import b1 from '../assets/carosel backgrounds/01.png'
import b2 from '../assets/carosel backgrounds/04.png'
import b4 from '../assets/carosel backgrounds/10.png'

function home() {

    setTimeout(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }, 3600000);

    return (
        <>
            <div className="main">
                <div id="carouselExampleCaptions" className={`carousel slide ${style.mainCarosel}`} data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className={`carousel-inner ${style.caro}`}>
                        <div className="carousel-item active">
                            <img src={b1} className="d-block w-100" alt="..."></img>
                        </div>
                        <div className="carousel-item">
                            <img src={b2} className="d-block w-100" alt="..."></img>
                        </div>
                        <div className="carousel-item">
                            <img src={b4} className="d-block w-100" alt="..."></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* all products */}

                {/* for seeing the add page */}
                {/* <Link to='/addps'>add</Link>
                <Link to='/admin'>admin</Link><br />
                <Link to='/allproducts'>allps</Link> */}
            </div>
            <Homepros />

        </>
    )
}

export default home

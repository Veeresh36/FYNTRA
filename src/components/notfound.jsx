import React from 'react'
import { useNavigate } from 'react-router-dom'

import error from '../assets/error.svg'
import back from '../assets/arrow.png' 

function notfound() {
    let navigate = useNavigate()
    return (
        <div style={{width:"100%", height:"88vh", overflow:"hidden"}}>
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <img style={{width:"40%"}} src={error} alt="" />
                <h5 style={{position:"absolute", bottom:"50px"}}>Go Back to <span onClick={() => navigate("/")} style={{cursor: "pointer", color: "#FFC727", fontWeight:"700", textDecoration:"underline"}}>&nbsp;HOME</span></h5>
            </div>
        </div>
    )
}

export default notfound

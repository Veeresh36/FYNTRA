import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import style from '../pages/profile.module.css'
import img1 from '../assets/about pers.jpeg'

function pofileUser() {
    let imgs = [{ imglink: img1 }]

    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!token || role != 'user') {
        navigate("/login");
        return;
    }

    return (
        <>
            <div className={style.container}>

                <div className={style.rightBox}>
                    <div className={style.profileMenu}>
                        {imgs.length <= 0 ? <div className="uploadImg">
                            <input type="file" name="" id="" />
                        </div> :
                            <div className={style.profileImgBox}>
                                {imgs.map(img =>
                                    <>
                                        <img src={img.imglink} className={style.profileImg} />
                                    </>
                                )}
                            </div>}
                        <ul>
                            <li><NavLink to="/userinfo" target='_blank'>Personal Information</NavLink></li>
                            <li><NavLink to="/forgot">Change Password</NavLink></li>
                            <li><NavLink onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('role')
                                navigate('/')
                                window.location.reload();
                            }} className={style.logout}>Logout</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className={style.leftBox}></div>
                {/* <table className=' table-bordered w-100' border="3">
                    <tr>
                            <th>firstName</th>
                            <th>LastName</th>
                            <th>Email id</th>
                            <th>mobile No</th>
                    </tr>
                    {
                        data.map(user =>
                            <>
                                <tr>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobilenumber}</td>
                                </tr>
                            </>
                        )
                    }
                </table> */}
            </div>
        </>
    )
}

export default pofileUser

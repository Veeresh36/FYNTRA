import React, { useEffect, useState } from 'react'
import style from '../pages/userinfo.module.css'
import { useNavigate } from 'react-router-dom'
import { userDetails } from '../config/config'




function userinfo() {
    let [data, setData] = useState([])
    let navigate = useNavigate()

    let getData = async () => {
        let token = localStorage.getItem("token");
        let role = localStorage.getItem("role");
        if (!token || role != 'user') {
            navigate("/login");
            return;
        }

        let response = userDetails();
        let result = await response;
        console.log(result);
        setData(result)
    }
    console.log(data);

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className={style.container}>
                <div className={style.content}>
                    <h1>Personal Information</h1>
                    {data.map(user =>
                        <>
                            <div className={style.infoBox}>
                                <label>Full Name</label>
                                <span>{user.firstName} {user.lastName}</span>
                            </div >
                            <div className={style.infoBox}>
                                <label>City Name</label>
                                <span>{user.cityname}</span>
                            </div >
                            <div className={style.infoBox}>
                                <label>Email Id</label>
                                <span>{user.email}</span>
                            </div >
                            <div className={style.infoBox}>
                                <label>Mobile Number</label>
                                <span>{user.mobilenumber}</span>
                            </div >
                        </>
                    )
                    }
                </div >
            </div >
        </>
    )
}

export default userinfo

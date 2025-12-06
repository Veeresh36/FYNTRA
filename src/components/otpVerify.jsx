import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from '../components/otpverify.module.css'

function otpVerify({ email, submitHandler, disableBtn, timer, setOtpPage }) {
    let navigate = useNavigate()
    let [otp, setOtp] = useState("")

    // Otp data stored in object
    let otpData = {
        userotp: otp,
        useremail: email
    }

    // otp verification handler
    let otpHandler = async (e) => {
        e.preventDefault()
        let response = await fetch(`http://localhost:5001/verifyotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(otpData),
        });
        let result = await response.json()

        if (response.ok) {
            alert(result.message);
            navigate('/');
        } else {
            alert(result.message)
        }
    }

    // edit btn handler
    let eidtBtnHandler = () => {
        setOtpPage(false)
    }


    return (
        <>
            <div className={style.otpContainer}>
                <form onSubmit={otpHandler}>
                    <h2>OTP Verification</h2>
                    <span className={style.subtle}>Enter your 6-digit code here</span>
                    <input type="text" tabIndex="1" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} className='form-control' />
                    <div className={style.reactions}>
                        <span className={style.resend}>We’ll send it again for you <button onClick={submitHandler} disabled={disableBtn}>&nbsp;Resend</button> &nbsp; {timer}</span>

                        <span className={style.email}><span className={style.mail}>{email}</span> &nbsp; <button onClick={eidtBtnHandler} disabled={disableBtn} >edit Email</button></span>

                    </div>
                    <br />
                    <button type="submit" className={style.btn} >submit</button>
                </form>
            </div>
        </>
    )
}

export default otpVerify

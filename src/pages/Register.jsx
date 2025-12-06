import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../pages/register.module.css'
import loginstyle from '../components/otpverify.module.css'
import Citylist from '../components/citieslist'
import { userregister } from '../config/config'
import Otpverify from '../components/otpVerify'


import regimg from '../assets/register/02.jpg'



function Register() {


    let [otpPage, setOtpPage] = useState(false)
    let [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: "",
        cityid: ""
    })
    let [disableBtn, setDisableBtn] = useState(true)
    let [timer, setTimer] = useState(59)

    const fields = [{ type: "text", name: "firstName", placeholder: "first Name" },
    { type: "text", name: "lastName", placeholder: "Last Name" },
    { type: "email", name: "email", placeholder: "Email Id" },
    { type: "tel", name: "number", placeholder: "Mobile No" },
    { type: "password", name: "password", placeholder: "Password" }]


    // TIMER 
    const startTimer = () => {
        setDisableBtn(true);
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setDisableBtn(false)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    // submit handler
    let submitHandler = async (e) => {
        e.preventDefault()

        let response = await userregister(formData)
        alert(response.message);
        if (response.status === 200) {
            console.log(response.message)
            setOtpPage(true)
            startTimer()
            setTimer(59)

        } else if (response.status === 409) {
            setOtpPage(false); // IF EMAIL IS EXSIST THEN ITS NOT REDIRECT TO OTP PAGE
        } else {
            response
        }
    }

    // TEXT BOX HANDLER
    let textBoxHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(formData);

    let getCItyData = (cityid) => {
        setFormData(prevData => ({
            ...prevData, cityid: cityid
        }))
    }

    return (
        <>
            <div className={` ${style.container}`}>

                {
                    otpPage == false ?
                        <>
                            <div className={`${style.img_box}`}>


                                <img src={regimg} alt="" />
                            </div>
                            <div className={`col-lg-12 ${style.content}`}>
                                <Link to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={style.arrow}>
                                        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                                    </svg>
                                </Link>
                                <h1 className={style.h1}>Start Shopping with Your Free Account!</h1>
                                <form onSubmit={submitHandler}>
                                    {
                                        fields.map(box =>
                                            <>
                                                <div className={`mb-2 ${style.box}`}>
                                                    <input type={box.type} name={box.name} onChange={textBoxHandler} className='form-control' placeholder={box.placeholder} required />
                                                </div>

                                            </>
                                        )
                                    }
                                    <div className="mb-3">
                                        <Citylist getCItyData={getCItyData} />
                                    </div>
                                    <label class={style.checkboxlabel}>
                                        <input type="checkbox" id="bigCheck" required />
                                        <span class={style.customcheckbox}></span>
                                        <span className={style.policy}>I agree to the Terms & Conditions and Privacy Policy</span>
                                    </label>
                                    <div className="mb-3">
                                        <input type="submit" />
                                    </div>
                                    <div className={style.loginhere}>
                                        <span className={style.login}>Already have an account? <Link to="/login">Log in here</Link></span>
                                    </div>
                                </form>
                            </div>
                        </> :
                        <>
                            <div className={loginstyle.otpContainer}>
                                <Otpverify email={formData.email} submitHandler={submitHandler} disableBtn={disableBtn} timer={timer} setOtpPage={setOtpPage} />
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Register

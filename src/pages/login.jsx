// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../pages/login.module.css'
import { userLogin } from '../config/config'
import { useNavigate } from 'react-router-dom'

// Images
import regimg from '../../src/assets/register/02.jpg'
import fb from '../../src/assets/register/fb.png'
import gg from '../../src/assets/register/gg.png'

function Login({ updateRole }) {
    let navigate = useNavigate()

    // form data state
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // input fields
    const fields = [
        { type: "email", name: "email", placeholder: "Email Id / Mobile No" },
        { type: "password", name: "password", placeholder: "Password" }
    ]

    // submit handler
    let submitHandler = async (e) => {
        e.preventDefault()
        let response = await userLogin(formData)
        let result = await response.json()

        if (response.status === 200) {
            let token = localStorage.setItem("token", result.token)
            let role = localStorage.setItem("role", result.role)
            updateRole(result.role)

            console.log("token", result.token);
            console.log("role", result.role);

            // “Even though the server already syncs the cart when you log in, this extra step on the client side is added just to be safe — in case something goes wrong or gets missed.”)
            let cart = JSON.parse(localStorage.getItem("cart")) || []
            if (cart.length > 0) {
                await fetch("http://localhost:5001/cartproducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${result.token}`
                    },
                    body: JSON.stringify({
                        products: cart.map(item => ({
                            productId: item.Productid,
                            quantity: item.quantity
                        }))
                    })
                })
                localStorage.removeItem("cart")
            }

            navigate("/users")
        } else {
            alert(result.message)
        }
    }

    let textBoxHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className={`${style.login_container}`}>
                <div className={`${style.img_box}`}>
                    <img src={regimg} alt="" />
                </div>
                <div className={`col-lg-12 ${style.content}`}>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={style.arrow}>
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h1>Back for more? Log in and explore 🛍️</h1>
                    <form onSubmit={submitHandler}>
                        {
                            fields.map(box =>
                                <div className={`mb-3 ${style.box}`} key={box.name}>
                                    <input type={box.type} name={box.name} onChange={textBoxHandler} className={`form-control ${style.loginBox}`} placeholder={box.placeholder} required />
                                </div>
                            )
                        }

                        <div className={`mb-3 ${style.forpass}`}>
                            <Link to="/forgot" className={style.forgot}>Can’t remember your password?</Link>
                        </div>
                        <div className="mb-3">
                            <input type="submit" className={style.btn} />
                        </div>

                        {/* <div className={style.socialMedia}>
                            <div className={style.google}>
                                <img src={gg} alt="" />
                                <span>Google</span>
                            </div>
                            <div className={style.facebook}>
                                <img src={fb} alt="" />
                                <span>Apple</span>
                            </div>
                        </div> */}

                        <div className={style.register}>
                            <span>i don't have an account? <Link to="/signup">Register here</Link></span>
                        </div>
                        <div className={`${style.adminlogin}`}>
                            <span>Administrator Access ? <Link to="/admin">Admin Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

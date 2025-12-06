import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../admin/adminlogin.module.css';
import admin from '../../assets/register/admin.png';

const fields = [
    { type: "email", name: "email", placeholder: "Hey Admin, your ID please 🙂" },
    { type: "password", name: "password", placeholder: "Unlock with your password" }
];

function AdminLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input box changes
    const textBoxHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form submit handler
    const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await fetch("http://localhost:5001/adminlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("Admin login response:", result);

        if (!response.ok) {
            setError(result.message || "Login failed");
            setLoading(false);
            return;
        }

        // ✅ Successful login
        alert("Login successful!");
        localStorage.setItem('role', 'admin');
        localStorage.setItem('token', result.token || "");
        navigate("/dashbord");
    } catch (err) {
        console.error("Login error:", err);
        setError("Server not responding. Try again later.");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className={style.admin_container}>
            {/* Image section */}
            <div className={style.img_box}>
                <img src={admin} alt="Admin login" />
            </div>

            {/* Login form section */}
            <div className={`col-lg-12 ${style.content}`}>
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="currentColor"
                        className={style.arrow}>
                        <path fillRule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd" />
                    </svg>
                </Link>

                <h1>Welcome back, Admin!</h1>

                {/* Form start */}
                <form onSubmit={submitHandler}>
                    {fields.map((box, i) => (
                        <div key={i} className={`mb-3 ${style.box}`}>
                            <input
                                type={box.type}
                                name={box.name}
                                onChange={textBoxHandler}
                                value={formData[box.name]}
                                className={`form-control ${style.loginBox}`}
                                placeholder={box.placeholder}
                                required
                            />
                        </div>
                    ))}

                    <div className={`mb-3 ${style.forpass}`}>
                        <Link to="/forgot" className={style.forgot}>
                            You can’t remember your password?
                        </Link>
                    </div>

                    {error && (
                        <div className="text-danger mb-2 text-center">{error}</div>
                    )}

                    <div className="mb-3">
                        <input
                            type="submit"
                            className={style.btn}
                            value={loading ? "Logging in..." : "Login"}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;

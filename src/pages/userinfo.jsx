import React, { useEffect, useState } from 'react';
import style from '../pages/userinfo.module.css';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
    const [data, setData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!token || role !== 'user') {
            navigate("/login");
            return;
        }
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const res = await fetch("http://localhost:5001/userinfo", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (res.ok) {
                setData(result[0]);
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const saveUserInfo = async () => {
        try {
            const res = await fetch("http://localhost:5001/userinfo", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                setEditMode(false);
            } else {
                alert(result.message || "Failed to update");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h1 className={style.title}>Personal Information</h1>

                <div className={style.infoWrapper}>
                    <div className={style.infoBox}>
                        <label>Full Name</label>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={data.firstName || ""}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={data.lastName || ""}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    style={{ marginTop: "10px" }}
                                />
                            </>
                        ) : (
                            <span>{data.firstName} {data.lastName}</span>
                        )}
                    </div>

                    <div className={style.infoBox}>
                        <label>Street</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="street"
                                value={data.street || ""}
                                onChange={handleChange}
                                placeholder="Street"
                            />
                        ) : (
                            <span>{data.street}</span>
                        )}
                    </div>

                    <div className={style.infoBox}>
                        <label>City</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="city"
                                value={data.city || ""}
                                onChange={handleChange}
                                placeholder="City"
                            />
                        ) : (
                            <span>{data.city}</span>
                        )}
                    </div>

                    <div className={style.infoBox}>
                        <label>Email</label>
                        {editMode ? (
                            <input
                                type="email"
                                name="email"
                                value={data.email || ""}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                        ) : (
                            <span>{data.email}</span>
                        )}
                    </div>

                    <div className={style.infoBox}>
                        <label>Mobile Number</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="mobilenumber"
                                value={data.mobilenumber || ""}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                            />
                        ) : (
                            <span>{data.mobilenumber}</span>
                        )}
                    </div>
                </div>

                {!editMode ? (
                    <button onClick={() => setEditMode(true)} className="btn border border-success mt-5">
                        Edit Info
                    </button>
                ) : (
                    <button onClick={saveUserInfo} className="btn btn-success mt-5">
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
}

export default UserInfo;

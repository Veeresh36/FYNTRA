import React, { useEffect, useState } from 'react'
import style from '../admin/dashbord.module.css'
import Sidebar from '../admin/sidemenu'
import { useNavigate } from 'react-router-dom';
import { getUser, deleteUser, getOrders } from '../../config/config'

function dashbord() {

    let [userData, setUserData] = useState([]);
    let [latestOrders, setLatestOrders] = useState([]);

    let navigate = useNavigate();

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    // athorization checking
    if (!token || role != 'admin') {
        navigate("/admin");
    }

    // letest orderd items
    let getLetestOrders = async () => {
        let response = await getOrders()
        let result = await response;
        setLatestOrders(result)
    }

    console.log("opros", latestOrders);


    // getting user information
    let userinfo = async () => {
        let response = await getUser();
        let result = await response;
        setUserData(result);
    }
    console.log("user data", userData);

    // delete user permanently
    const deleteHandler = async (userId) => {
        const result = await deleteUser(userId);

        if (result) {
            alert(result.message);
            setUserData((prev) => prev.filter((u) => u.userid !== userId));
        } else {
            alert(result.message || "Failed to delete user");
        }
    };

    // order page handler
    const orderPageHandler = () => {
        navigate(`/Orders`);
    }


    useEffect(() => {
        userinfo();
        getLetestOrders();
    }, [])


    return (
        <>
            <div className={style.dashbord}>
                <Sidebar />
                <div className={style.container}>
                    <div className="orderContainer">
                        <h3>Latest Orders</h3>
                        <div className={style.orders}>
                            {latestOrders.slice(0, 4).map((order) => {
                                const payment = Number(order.paymentmethod) === 1 ? "COD" : "Online";

                                return (
                                    <div className={style.subContainer} onClick={orderPageHandler} key={order.orderId}>
                                        <div className={style.card}>
                                            <img
                                                className={style.orderImg}
                                                src={`http://localhost:5001/upload/${order.productImg}`}
                                                alt={order.productname}
                                            />

                                            <div className={style.body}>
                                                <p>Order ID: {(Number(order.orderId) + 485965).toString().slice(-5)}</p>
                                                <p className={style.productName}>Product: {order.productname}</p>

                                                <div className={style.QP}>
                                                    <p>Quantity: {order.productqty}</p>
                                                    <p>Payment: {payment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    <div className={style.usersList}>
                        <h3>Accounts Overview</h3>
                        <div className="userDetails">

                            <table>
                                <tr>
                                    <th>User Id:</th>
                                    <th>Name:</th>
                                    <th>Email:</th>
                                    <th>delete user</th>
                                </tr>
                                {
                                    userData.map((user, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td><button onClick={(e) => deleteHandler(user.userid)} className='btn btn-danger'>delete user</button></td>
                                        </tr>
                                    )
                                }
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default dashbord

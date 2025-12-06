import React, { useEffect, useState } from 'react';
import style from '../admin/orders.module.css';
import Sidebar from '../admin/sidemenu';
import { getOrders, updateOrderStatus } from '../../config/config';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    let navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await getOrders();
        let result = await response
        setOrders(response);
    };

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if(!token || role!='admin'){
        navigate("/admin");
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update delivery status
    const handleStatusChange = async (orderId, newStatus) => {
        console.log("orderId:", orderId);
        console.log("status:", newStatus);
        
        try {
            // Update in backend
            await updateOrderStatus(orderId, newStatus);

            // Update in frontend (without reloading)
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId ? { ...order, deliverystatus: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className={`container ${style.container}`}>
                {orders.length > 0 ? <div className={style.bottom}>
                    <h1 className="text-center mt-3">Order Items</h1>

                    {orders.map((order) => {
                        const payment = Number(order.paymentmethod) === 1 ? "COD" : "Online";

                        return (
                            <div className={style.subContainer} key={order.orderId}>
                                <div className={style.card}>
                                    <img
                                        className={style.orderImg}
                                        src={`http://localhost:5001/upload/${order.productImg}`}
                                        alt={order.productname}
                                    />

                                    <div className={style.body}>
                                        <p>USER ID : {order.userid}</p>
                                        <p>Order ID: {(Number(order.orderId) + 485965).toString().slice(-5)}</p>
                                        <p>Product: {order.productname}</p>

                                        <div className={style.QP}>
                                            <p>Quantity: {order.productqty}</p>
                                            <p>Payment: {payment}</p>
                                        </div>

                                        {/* Editable Delivery Status */}
                                        <div className="mt-2">
                                            <label><strong>Status:</strong> </label>
                                            <select
                                                value={order.deliverystatus}
                                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)} className="form-select w-50 mt-1">
                                                <option value="Preparing">Preparing</option>
                                                <option value="picked by delivery partner">Picked by delivery partner</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div> : <h2 className='text-center w-100 text-secondary'>waiting for orders...</h2>}
            </div>
        </>
    );
}

export default Orders;

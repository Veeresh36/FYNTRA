import React, { useEffect, useState } from 'react'
import style from '../components/cashDely.module.css'
import { Address, sendOrderDetails, updateUserAddress, getUserAddress } from '../config/config'
import { useNavigate } from 'react-router-dom'

function CashOn({ orderItems }) {
    const [cartItems, setCartItems] = useState([])
    const [userLoc, setUserLoc] = useState(null)
    const [userAddress, setUserAddress] = useState({
        street: "",
        landmark: "",
        city: "",
        pincode: ""
    })

    let navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({
        addressid: "",
        paymentmethod: "",
        paymentstatus: "",
        deliverystatus: ""
    })

    const [paymentData, setPaymentData] = useState({
        fullname: "",
        cardNumber: "",
        monthYear: "",
        CVV: ""
    })

    console.log('cashOn', orderItems);


    const [isEditing, setIsEditing] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false)

    // fetch cart
    const getCartProducts = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const response = await fetch("http://localhost:5001/getallpros", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                const result = await response.json()
                const normalized = result.map(item => ({
                    ...item,
                    quantity: item.qty || item.quantity || 1
                }))
                setCartItems(normalized)
            } catch (err) {
                console.error("Error fetching backend cart:", err)
            }
        } else {
            const products = JSON.parse(localStorage.getItem("cart")) || []
            setCartItems(products)
        }
    }

    // fetch address
    const fetchUserAddress = async () => {
        try {
            const result = await getUserAddress();

            if ( result.length > 0) {
                setUserLoc(result[0]);          // pick the first address
                setShowAddressForm(false);
            } else if (result && result.street) {
                setUserLoc(result);
                setShowAddressForm(false);
            } else {
                setUserLoc(null);
                setShowAddressForm(true);
            }
        } catch (error) {
            console.error("Error fetching user address:", error);
            setUserLoc(null);
            setShowAddressForm(true);
        }
    };


    // address handlers
    const textBoxHandler = (e) => {
        const { name, value } = e.target
        setUserAddress({ ...userAddress, [name]: value })
    }

    // Add or update address (combined)
    const submitHandler = async (e) => {
        e.preventDefault();

        let response = isEditing
            ? await updateUserAddress(userAddress)
            : await Address(userAddress);

        alert(isEditing ? "Address updated successfully" : "Address added successfully");

        // Update UI immediately with returned address
        if (response.data) setUserLoc(response.data);

        // Reset and close form
        setUserAddress({ street: "", landmark: "", city: "", pincode: "" });
        setIsEditing(false);
        setShowAddressForm(false);
    };

    // Handle edit address btn
    const handleEdit = () => {
        setUserAddress(userLoc || { street: "", landmark: "", city: "", pincode: "" })
        setIsEditing(true)
        setShowAddressForm(true)
    }

    // handle addAddress btn
    const handleAddAddress = () => {
        setUserAddress({ street: "", landmark: "", city: "", pincode: "" })
        setIsEditing(false)
        setShowAddressForm(true)
    }

    // handle cancel btn
    const handleCancel = () => {
        setShowAddressForm(false)
        setIsEditing(false)
        setUserAddress({ street: "", landmark: "", city: "", pincode: "" })
    }

    // card payment handler
    const paymentDataHandler = (e) => {
        const { name, value } = e.target
        setPaymentData({ ...paymentData, [name]: value })
    }

    // payment mode handler
    const handlePayment = async (e) => {
        const method = e.currentTarget.value
        if (!userLoc) {
            alert("Please add a delivery address before proceeding!")
            return
        }

        if (method === "Online") {
            const { fullname, cardNumber, monthYear, CVV } = paymentData
            if (!fullname || !cardNumber || !monthYear || !CVV) {
                alert("Please fill all payment details before proceeding.")
                return
            }
        }

        let paymentmethod = method === "COD" ? 1 : 2
        let paymentStatus = method === "Online" ? 2 : 1

        const orderData = {
            addressid: userLoc.addressid || userLoc.id,
            paymentmethod,
            paymentstatus: paymentStatus,
            deliverystatus: "Preparing"
        }

        const response = await sendOrderDetails(orderData)
        const result = await response.json()

        if (response.ok) {
            alert(` Order placed successfully! ${method === "COD" ? `\nPlease pay ₹${grandTotal} upon delivery.` : ""}`)
            navigate("/userorders")
        } else {
            console.error("backend error:", result)
            alert("Failed to place order.")
        }

        setOrderDetails(orderData)
    }

    useEffect(() => {
        getCartProducts()
        fetchUserAddress()
    }, [])

    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const deliveryCharge = 9
    const grandTotal = totalPrice + deliveryCharge

    return (
        <div className={style.mainCart}>
            <div className={style.leftPage}>
                <div className={`container ${style.container}`}>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <div className={`row ${style.cardsContent}`} key={item.Productid}>
                                    <div className={`col-lg-12 ${style.maincontainer}`}>
                                        <div className={`card ${style.card}`}>
                                            <div className={style.productRow}>
                                                <div className={style.productDetails}>
                                                    <h5 className={style.title}>{item.productname}</h5>
                                                    <div className={style.priceInfo}>
                                                        <span className={style.price}>Qty: {item.quantity}</span>
                                                        <span className={style.itemTotal}>₹{item.quantity * item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={`row ${style.cardsContent}`}>
                                <div className={`col-lg-12 ${style.maincontainer}`}>
                                    <div className={`card ${style.grandTotalCard}`}>
                                        <div className={style.grandTotalBody}>
                                            <div className={style.grandTotalRow}>
                                                <span className={style.grandTotalLabel}>Grand Total:</span>
                                                <span className={style.grandTotalAmount}>₹{grandTotal}</span>
                                            </div>
                                            <div className={style.deliveryNote}>
                                                <small>Includes delivery charges</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h3>No products in cart</h3>
                    )}
                </div>
            </div>

            {cartItems.length > 0 && (
                <div className={style.rightPage}>
                    <div className={`container ${style.container}`}>
                        {/* DELIVERY ADDRESS */}
                        <div className="deliLoc mt-5">
                            <h2>Delivery Address</h2>
                            <br />
                            {userLoc && !showAddressForm && (
                                <div className="card card-body mb-3">
                                    <h5>Saved Address</h5>
                                    <p>
                                        {userLoc.street}, {userLoc.landmark && `${userLoc.landmark}, `}
                                        {userLoc.city} - {userLoc.pincode}
                                    </p>
                                    <button className="btn btn-outline-primary mt-2" onClick={handleEdit}>
                                        Update Address
                                    </button>
                                </div>
                            )}
                            {!userLoc && !showAddressForm && (
                                <div className="card card-body mb-3">
                                    <p>No address saved. Please add your delivery address.</p>
                                    <button className="btn btn-primary mt-2" onClick={handleAddAddress}>
                                        Add Delivery Address
                                    </button>
                                </div>
                            )}
                            {showAddressForm && (
                                <form className="card card-body" onSubmit={submitHandler}>
                                    <h4>{isEditing ? 'Update Address' : 'Add New Address'}</h4>
                                    <div className={style.firstField}>
                                        <div className="name"><br />
                                            <span>House No. / Building / Street</span>
                                            <input
                                                name="street"
                                                value={userAddress.street}
                                                onChange={textBoxHandler}
                                                type="text"
                                                placeholder="Ex: 63/1 Shanth Nagar"
                                                required
                                            />
                                        </div>
                                        <div className="cardNum">
                                            <span>Landmark (Optional)</span>
                                            <input
                                                name="landmark"
                                                value={userAddress.landmark}
                                                onChange={textBoxHandler}
                                                type="text"
                                                placeholder="IBMR College Backside"
                                            />
                                        </div>
                                    </div>
                                    <div className={style.secondField}>
                                        <div className={style.month}>
                                            <span>City / Town</span>
                                            <input
                                                name="city"
                                                value={userAddress.city}
                                                onChange={textBoxHandler}
                                                type="text"
                                                placeholder="Hubballi, Dharwad, Bangalore..."
                                                required
                                            />
                                        </div>
                                        <div className={style.cvv}>
                                            <span>Pincode</span>
                                            <input
                                                name="pincode"
                                                value={userAddress.pincode}
                                                onChange={textBoxHandler}
                                                type="text"
                                                placeholder="580025"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary p-3 mt-3 flex-fill">
                                            {isEditing ? 'Update Address' : 'Save Address'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary p-3 mt-3"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* ================= PAYMENT METHODS ================= */}
                        <br /><br />
                        <h2>Payment Method</h2>

                        <div className="onlinePay">
                            <p>
                                <button className="btn btn-warning mt-3 w-100 text-start p-3" type="button" data-bs-toggle="collapse" data-bs-target="#onlinePay">
                                    Online Payment
                                </button>
                            </p>
                            <div className="collapse" id="onlinePay">
                                <div className="card card-body">
                                    <div className={style.paymentInfo}>
                                        <div className={style.firstField}>
                                            <div className="name">
                                                <span>Full Name</span>
                                                <input onChange={paymentDataHandler} value={paymentData.fullname} type="text" name='fullname' placeholder='Ex : John Doe' />
                                            </div>
                                            <div className="cardNum">
                                                <span>Card Number</span>
                                                <input onChange={paymentDataHandler} value={paymentData.cardNumber} type="text" name='cardNumber' placeholder='XXXX XXXX XXXX' />
                                            </div>
                                        </div>
                                        <div className={style.secondField}>
                                            <div className={style.month}>
                                                <span>Expiry Date</span>
                                                <input onChange={paymentDataHandler} value={paymentData.monthYear} type="month" name='monthYear' placeholder='MM/YY' />
                                            </div>
                                            <div className={style.cvv}>
                                                <span>CVV</span>
                                                <input onChange={paymentDataHandler} value={paymentData.CVV} type="number" name='CVV' placeholder='CVV' />
                                            </div>
                                        </div>
                                        <button className='btn btn-success w-100 mt-2 p-3' value="Online" onClick={handlePayment}>
                                            <strong>Proceed to Pay ₹ {grandTotal}</strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="onlinePay">
                            <p>
                                <button className="btn btn-warning mt-3 w-100 text-start p-3" type="button" data-bs-toggle="collapse" data-bs-target="#cashon">
                                    Cash On Delivery
                                </button>
                            </p>
                            <div className="collapse" id="cashon">
                                <div className="card card-body">
                                    <div className={style.CODDetails}>
                                        <span><strong>Grand Total: ₹ {grandTotal}</strong></span>
                                        <div className={style.deliveryNote}>
                                            <small>Pay when your order arrives</small>
                                        </div>
                                    </div>
                                    <button className='btn btn-success p-3 mt-3' value="COD" onClick={handlePayment}>Confirm Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CashOn

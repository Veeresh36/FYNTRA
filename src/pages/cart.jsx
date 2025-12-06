import React, { useEffect, useState } from 'react'
import style from '../pages/cart.module.css'
import { useNavigate } from 'react-router-dom'
import { userCart } from '../components/addtocart'

function Cart({ setOrderItems }) {
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()
    const { totalItems, setTotalItems } = userCart();

    // Fetch cart products (backend if logged in, else localStorage)
    const getCartProducts = async () => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                const response = await fetch("http://localhost:5001/getallpros", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                const result = await response.json()
                console.log("Fetched from backend:", result)

                const normalized = result.map(item => ({
                    ...item,
                    quantity: item.qty || item.quantity || 1
                }))
                setCartItems(normalized)
                setOrderItems(normalized)
            } catch (err) {
                console.error("Error fetching backend cart:", err)
            }
        } else {
            const products = JSON.parse(localStorage.getItem("cart")) || []
            setCartItems(products)
            setOrderItems(products)
        }
    }

    // Update backend quantity
    const updateBackendQuantity = async (productId, quantity) => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            const response = await fetch("http://localhost:5001/updatecart", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId, quantity })
            })
            const result = await response.json()
            console.log("Backend updated:", result)
        } catch (error) {
            console.error("Error updating backend cart:", error)
        }
    }

    // Update localStorage
    const updateLocalStorage = (products) => {
        localStorage.setItem('cart', JSON.stringify(products))
        setCartItems(products)
    }

    // Increase quantity
    const increaseQuantity = (id) => {
        const token = localStorage.getItem('token')
        const updatedCart = cartItems.map(item => {
            if (item.Productid === id) {
                const newQty = item.quantity + 1
                if (token) updateBackendQuantity(id, newQty)
                return { ...item, quantity: newQty }
            }
            return item
        })

        if (!token) updateLocalStorage(updatedCart)
        setCartItems(updatedCart)
    }

    // Decrease quantity
    const decreaseQuantity = (id) => {
        const token = localStorage.getItem('token')
        const updatedCart = cartItems.map(item => {
            if (item.Productid === id && item.quantity > 1) {
                const newQty = item.quantity - 1
                if (token) updateBackendQuantity(id, newQty)
                return { ...item, quantity: newQty }
            }
            return item
        })

        if (!token) updateLocalStorage(updatedCart)
        setCartItems(updatedCart)
    }

    // Remove product
    const removeProduct = async (id) => {
        const token = localStorage.getItem('token')
        const updatedCart = cartItems.filter(item => item.Productid !== id)

        if (token) {
            try {
                await fetch(`http://localhost:5001/removecart/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                console.log("Product removed from backend cart")
            } catch (err) {
                console.error("Error removing product:", err)
            }
        } else {
            updateLocalStorage(updatedCart)
        }

        setCartItems(updatedCart)
        setTotalItems(updatedCart.length)
    }

    // Checkout handler
    const checkoutHandler = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        } else {
            navigate("/cashondely")
        }
    }

    // Login handler
    const loginHandler = () => {
        navigate("/login")
    }

    // Fetch cart initially
    useEffect(() => {
        getCartProducts()
    }, [])

    // Update total items whenever cart changes
    useEffect(() => {
        setTotalItems(cartItems.length)
    }, [cartItems])

    const token = localStorage.getItem('token')

    return (
        <div className={style.mainCart}>
            {/* Left Page - Product List */}
            <div className={style.leftPage}>
                <div className={`container ${style.container}`}>
                    {cartItems.length > 0 ? cartItems.map((item) => (
                        <div className={`row ${style.cardsContent}`} key={item.Productid}>
                            <div className={`col-lg-4 ${style.maincontainer}`}>
                                <div className={`card ${style.card}`}>
                                    <img
                                        src={`http://localhost:5001/upload/${item.imgpath}`}
                                        className={style.cartImg}
                                        alt={item.productname}
                                    />
                                    <div className={`card-body ${style.cartBody}`}>
                                        <h5 className={`card-title ${style.title}`}>{item.productname}</h5>
                                        <span className={style.price}>Price : ₹{item.price}</span><br />

                                        {/* Quantity Controls */}
                                        <div className={style.qtyControls}>
                                            <button
                                                onClick={() => decreaseQuantity(item.Productid)}
                                                disabled={item.quantity <= 1}
                                            >-</button>

                                            <span style={{ margin: "0 10px" }}>{item.quantity}</span>

                                            <button onClick={() => increaseQuantity(item.Productid)}>+</button>
                                        </div>

                                        <br />
                                        <span
                                            onClick={() => removeProduct(item.Productid)}
                                            className={`text-danger ${style.remove}`}
                                        >
                                            Remove Product
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : <h3>No products in cart</h3>}
                </div>
            </div>

            {/* Right Page - Order Summary */}
            {cartItems.length > 0 && (
                <div className={style.rightPage}>
                    <div className={`container ${style.container}`}>
                        <span className='fw-bold'>Order Summary</span>
                        <hr className={style.tophr} />

                        {cartItems.map(item => (
                            <div className="finalAmt" key={item.Productid}>
                                <div className={style.ppr}>
                                    <span className={style.pname}>{item.productname}</span>
                                    <span>₹{Number(item.price) * Number(item.quantity || 1)}</span>
                                </div>
                            </div>
                        ))}

                        <hr />
                        <div className={style.total}>
                            <span className='text-dark'><strong>Total :</strong></span>
                            <span className='text-dark'>
                                <strong>
                                    ₹{cartItems.reduce(
                                        (sum, item) => sum + (Number(item.price) * Number(item.quantity || 1)), 0
                                    )}
                                </strong>
                            </span>
                        </div>

                        <div className="btns">
                            {token ? (
                                // User is logged in - show checkout button
                                <div className="btn btn-warning d-flex flex-end mt-5 p-3"
                                    onClick={checkoutHandler}>
                                    Proceed to Checkout
                                </div>
                            ) : (
                                // User is not logged in - show login button
                                <div className="btn btn-primary d-flex flex-end mt-5 p-3"
                                    onClick={loginHandler}>
                                    Login to Checkout
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
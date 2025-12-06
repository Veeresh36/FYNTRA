import React, { createContext, useContext, useEffect, useState } from 'react';

export const productContext = createContext();

export default function Addtocart({ children }) {
    const [alertMsg, setAlertMsg] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    // 🛒 Fetch total cart items (for both guest and logged-in)
    const getCartItems = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const res = await fetch("http://localhost:5001/getallpros", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setCartItems(data);
                setTotalItems(data.length);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(localCart);
            setTotalItems(localCart.length);
        }
    };

    // 🛍️ Add product to cart
    const carthandler = async (product) => {
        const token = localStorage.getItem("token");

        if (!token) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingIndex = cart.findIndex(item => item.Productid === product.Productid);

            if (existingIndex === -1) {
                cart.push({
                    ...product,
                    imgpath: product.images?.[0]?.imgpath || "",
                    quantity: 1,
                });
            } else {
                cart[existingIndex].quantity += 1;
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            setCartItems(cart);
            setTotalItems(cart.length);
            setAlertMsg("Product added to cart!");
        } else {
            try {
                const res = await fetch("http://localhost:5001/cartproducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        productId: product.Productid,
                        quantity: 1,
                    }),
                });

                const result = await res.json();

                if (res.status === 200) {
                    setAlertMsg("Product added to cart!");
                    getCartItems(); // refresh cart count
                    localStorage.removeItem("cart");
                } else {
                    setAlertMsg("Failed to add to cart!");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                setAlertMsg("Something went wrong!");
            }
        }
    };

    // Auto-hide alert message
    useEffect(() => {
        if (alertMsg) {
            const timer = setTimeout(() => setAlertMsg(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [alertMsg]);

    // Fetch cart count when app loads
    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <productContext.Provider value={{
            carthandler,
            alertMsg,
            totalItems,
            cartItems,
            getCartItems,
            setTotalItems,
        }}>
            {children}
        </productContext.Provider>
    );
}

// Custom hook to use cart context
export const userCart = () => useContext(productContext);

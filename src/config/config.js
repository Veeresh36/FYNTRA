export const mainurl = `http://localhost:5001`;

// geting the citylist
export const citylist = async () => {
    let response = await fetch(`${mainurl}/citylist`)
    let result = await response.json();
    return result
}

// inserting user data
export const userregister = async (formData) => {
    let response = await fetch(`${mainurl}/insertdata`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    let result = await response.json()
    return { status: response.status, message: result.message };
}

// UESER LOGIN sending the emailid and passowrd to backend
export const userLogin = async (formData) => {
    let response = await fetch(`${mainurl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    return response
}

// geting user data
export const userDetails = async () => {
    let response = await fetch(`${mainurl}/userdeatils`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    let result = await response.json();
    return result
}

// fetching the categories from BK
export const categories = async () => {
    let response = await fetch(`${mainurl}/catlistforproducts`)
    let result = await response.json();
    return result
}

// addps categouries
export const addproscategories = async () => {
    let response = await fetch(`${mainurl}/categories`)
    let result = await response.json();
    return result
}

// forgot password
export const forgotPass = async (formData) => {
    let token = localStorage.getItem("token")
    let response = await fetch(`${mainurl}/updatepassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(formData),

    })
    let result = await response.json()
    return result
}

// all Products
export const allProducts = async () => {
    let response = await fetch(`${mainurl}/allproducts`)
    let result = await response.json();
    return result
}

// Add Address
export const Address = async (useraddress) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${mainurl}/useraddress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(useraddress),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to add address");
    return data; // { message, data }
};

// Update Address
export const updateUserAddress = async (useraddress) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${mainurl}/updateUserAddress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(useraddress),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update address");
    return data; // { message, data }
};

// geting user address from backend
export const getUserAddress = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${mainurl}/getaddress`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    const result = await response.json();
    return result;
};

// sending orderDetails to backend
export const sendOrderDetails = async (orderDetails) => {
    let token = localStorage.getItem("token");
    let response = await fetch(`${mainurl}/orderDetailes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails)
    })
    return response
}

// getting ordered details for user
export const getOrderDetails = async () => {
    let token = localStorage.getItem("token");

    let response = await fetch(`${mainurl}/orderProducts`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    let result = await response.json()
    return result
}

// getting order details for admin
export const getOrders = async () => {
    let token = localStorage.getItem("token");

    let response = await fetch(`${mainurl}/allorders`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    let result = await response.json()
    return result
}

// updating delivery status by admin
export const updateOrderStatus = async (orderId, newStatus) => {
    let response = await fetch(`http://localhost:5001/updateOrderStatus/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliverystatus: newStatus })
    });
    let result = await response.json();
    return result;
};

// get userdata (admin access)
export const getUser = async () => {

    const response = await fetch(`${mainurl}/getuser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

// delete user (admin access)
export const deleteUser = async (userId) => {

    const response = await fetch(`${mainurl}/userid/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const result = await response.json();
    return result;
};

// update product status 
export const updateProductStatus = async (productId, status) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${mainurl}/updateProductStatus/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Update failed");
    return result;
};



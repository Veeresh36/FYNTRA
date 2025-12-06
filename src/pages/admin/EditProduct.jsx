import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../admin/sidemenu";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productname: "",
        price: "",
        descs: "",
        pstatus: "1",
    });

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Load single product
    useEffect(() => {
        if (!token || role !== "admin") {
            navigate("/admin");
            return;
        }

        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5001/product/${id}`);
                const data = await res.json();
                setProduct({
                    productname: data.productname,
                    price: data.price,
                    descs: data.descs,
                    pstatus: String(data.pstatus),
                });
            } catch (err) {
                console.error("Error loading product:", err);
            }
        };

        fetchProduct();
    }, [id, navigate, token, role]);

    // Handle input changes
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    // Submit updated product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:5001/update-product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });

            alert("✅ Product updated successfully!");
            navigate("/manageProducts");
        } catch (err) {
            console.error("Update failed:", err);
            alert("❌ Failed to update product");
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1, padding: "20px" }}>
                <h2>Edit Product</h2>

                <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
                    <div style={{ marginBottom: "12px" }}>
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="productname"
                            value={product.productname}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Description</label>
                        <textarea
                            name="descs"
                            value={product.descs}
                            onChange={handleChange}
                            className="form-control"
                            rows="4"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Status</label>
                        <select
                            name="pstatus"
                            value={product.pstatus}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="1">Visible</option>
                            <option value="0">Out of Stock</option>
                            <option value="-1">Hidden</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;

import React, { useEffect, useState } from "react";
import style from "../admin/managepros.module.css";
import Sidebar from "../admin/sidemenu";
import { useNavigate } from "react-router-dom";
import { allProducts, updateProductStatus } from "../../config/config";

function ManagePros() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [openDropdownFor, setOpenDropdownFor] = useState(null); // productid of open menu
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Load products
    const allPros = async () => {
        try {
            const result = await allProducts(); // <- assume this returns parsed data
            console.log("allProducts result:", result);
            const list = Array.isArray(result) ? result : [result];
            setProducts(list);
        } catch (err) {
            console.error("Error fetching products:", err);
            setProducts([]);
        }
    };

    // Update status
    const handleStatusChange = async (productId, newStatus) => {
        try {
            console.log("Updating status:", productId, newStatus);
            // Optional: send numeric status to backend if backend expects number
            const statusToSend = typeof newStatus === "string" ? Number(newStatus) : newStatus;

            const resp = await updateProductStatus(productId, statusToSend);
            console.log("updateProductStatus response:", resp);

            // If backend returns error format, you might want to check resp.success etc.
            // Update UI locally (optimistic after successful response)
            setProducts((prev) =>
                prev.map((p) => (p.productid === productId ? { ...p, pstatus: String(newStatus) } : p))
            );

            setMessage({ type: "success", text: "Status updated" });
            setTimeout(() => setMessage(null), 2000);
            setOpenDropdownFor(null);
        } catch (err) {
            console.error("Error updating product status:", err);
            setMessage({ type: "error", text: "Update failed" });
            setTimeout(() => setMessage(null), 2500);
        }
    };

    // edit handler
    const editHandler = (productId) => {
        navigate( `/editproducts/${productId}`);
    }

    useEffect(() => {
        if (!token || role !== "admin") {
            navigate("/admin");
            return;
        }
        allPros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusText = (s) =>
        s === "1" ? "Visible" : s === "0" ? "Out of Stock" : s === "-1" ? "Hidden" : "Unknown";

    const getStatusClass = (s) =>
        s === "1" ? "btn-success" : s === "0" ? "btn-warning" : s === "-1" ? "btn-danger" : "btn-secondary";

    return (
        <div className={style.manageProductsContainer}>
            <Sidebar />
            <div className={style.manageProductsContent}>
                <h1>Manage Products</h1>

                {message && (
                    <div
                        style={{
                            padding: "8px 12px",
                            marginBottom: 12,
                            borderRadius: 6,
                            background: message.type === "success" ? "#d4edda" : "#f8d7da",
                            color: message.type === "success" ? "#155724" : "#721c24",
                        }}
                    >
                        {message.text}
                    </div>
                )}

                <div className={style.allpros}>
                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        products.map((product) => {
                            const status = String(product.pstatus ?? "1"); // ensure string
                            return (
                                <div className={style.product} key={product.Productid}>
                                    <div className={style.card}>
                                        <img
                                            className={style.productImg}
                                            src={`http://localhost:5001/upload/${product.imgpath}`}
                                            alt={product.productname}
                                        />
                                        <div className="body">
                                            <h6>{product.productname}</h6>
                                            <p className={style.proDesc}>{product.descs}</p>
                                            <span className="text-success">₹{product.price}</span>
                                        </div>
                                    </div>

                                    <div className={style.action} style={{ display: "flex", gap: 8, alignItems: "center" }} onClick={() => editHandler(product.Productid)}>
                                        <button className="btn btn-primary">Edit</button>

                                        {/* Button that shows current status */}
                                        <button
                                            className={`btn ${getStatusClass(status)}`}
                                            onClick={() => setOpenDropdownFor(openDropdownFor === product.Productid ? null : product.Productid)}
                                        >
                                            {getStatusText(status)}
                                        </button>

                                        {/* Simple React dropdown menu */}
                                        {openDropdownFor === product.Productid && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    background: "white",
                                                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                                                    borderRadius: 6,
                                                    overflow: "hidden",
                                                    zIndex: 50,
                                                }}
                                            >
                                                <button
                                                    className="dropdown-item"
                                                    style={{ padding: "8px 12px", display: "block", width: 180, textAlign: "left" }}
                                                    onClick={() => handleStatusChange(product.Productid, "1")}
                                                >
                                                    Show
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    style={{ padding: "8px 12px", display: "block", width: 180, textAlign: "left" }}
                                                    onClick={() => handleStatusChange(product.Productid, "0")}
                                                >
                                                    Out Of Stock
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    style={{ padding: "8px 12px", display: "block", width: 180, textAlign: "left" }}
                                                    onClick={() => handleStatusChange(product.Productid, "-1")}
                                                >
                                                    Hide
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManagePros;

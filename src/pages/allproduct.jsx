import React, { useEffect, useState } from 'react'
import { allProducts } from '../config/config'
import style from '../pages/allprds.module.css'
import { useNavigate } from 'react-router-dom'
import { userCart } from '../components/addtocart'

function AllProduct({ setProds }) {

    let { carthandler, alertMsg } = userCart();

    let navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let response = await allProducts();
        let result = await response;
        setProducts(result);
    };

    setProds(products)
    // console.log(products);

    // product description page redirect using productid
    let prodetails = (product) => {
        // console.log(product);
        navigate(`/product`, { state: { product: product.Productid } });
        // console.log(product.Productid);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {products.length === 0 ? (
                <div className="text-center py-5">
                    <h5>Loading products...</h5>
                </div>
            ) : (
                <div className={`container-fluid ${style.container}`}>
                    {alertMsg && (
                        <div className={`alert alert-success text-center ${style.alertBox}`} role="alert">
                            {alertMsg}
                        </div>
                    )}
                    <div className={style.row}>
                        <div className={style.mainCard}>

                            <div className={style.products}>
                                {
                                    products.map((pros) => (
                                        <div className={`card ${style.productCard}` }
                                            style={{ display: pros.pstatus === 1 ? "block" : "none" }}
                                            onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <h5 className="card-title">{pros.productname}</h5>
                                                <h5 className="card-title">₹{pros.price}/-</h5>
                                            </div>
                                            {/* <button className='btn btn-dark' onClick={() => carthandler(pros)}>Add to cart</button> */}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AllProduct;
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from '../pages/homepros.module.css'
import { allProducts } from '../config/config'

import ads from '../assets/products/ads.png'

function homepros() {
    let navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let response = await allProducts();
        let result = await response;
        setProducts(result);
    };

    let carthandler = (product) => {
        let token = localStorage.getItem('token')
        console.log(token);
        if (!token) {
            let cart = JSON.parse(localStorage.getItem('cart')) || []
            let existingProducts = cart.findIndex(item => item.Productid == product.Productid)

            if (existingProducts == -1) {
                cart.push({ ...product, quantity: 1 })
            } else {
                cart[existingProducts].quantity += 1;
            }

            console.log(existingProducts);
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }



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
                    <div className={style.row}>

                        <div className={style.mainCard}>
                            <div className={style.topContent}>
                                <h3>Grab These Limited-Time Offers</h3>
                            </div>
                            <div className={style.products}>
                                {
                                    products.slice(5, 13).filter((_, index) => index % 2 === 0).map((pros) => (
                                        <div className={`card ${style.productCard}`} key={pros.id} onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <div className={style.cardbody}>
                                                    <h5 className="card-title">{pros.productname}</h5>
                                                    <h5 className={style.price}>₹{pros.price}/-</h5>

                                                    <div className={style.rating}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < (pros.rating || 4) ? style.starFilled : style.starEmpty}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={style.mainCard}>
                            <div className={style.topContent}>
                                <h3>Most Loved Mobiles This Season</h3>
                            </div>
                            <div className={style.products}>
                                {
                                    products.slice(0, 5).map((pros) => (
                                        <div className={`card ${style.productCard}`} key={pros.id} onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <div className={style.cardbody}>
                                                    <h5 className="card-title">{pros.productname}</h5>
                                                    <h5 className={style.price}>₹{pros.price}/-</h5>

                                                    <div className={style.rating}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < (pros.rating || 4) ? style.starFilled : style.starEmpty}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={style.mainCard}>
                            <div className={style.topContent}>
                                <h3>Smart Gadgets You’ll Love</h3>
                            </div>
                            <div className={style.products}>
                                {
                                    products.slice(18, 22).map((pros) => (
                                        <div className={`card ${style.productCard}`} key={pros.id} onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <div className={style.cardbody}>
                                                    <h5 className="card-title">{pros.productname}</h5>
                                                    <h5 className={style.price}>₹{pros.price}/-</h5>

                                                    <div className={style.rating}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < (pros.rating || 4) ? style.starFilled : style.starEmpty}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={style.mainCard}>
                            <div className={style.topContent}>
                                <h3>Grab These Limited-Time Offers</h3>
                            </div>
                            <div className={style.products}>
                                {
                                    products.slice(4, 13).filter((_, index) => index % 2 === 0).map((pros) => (
                                        <div className={`card ${style.productCard}`} key={pros.id} onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <div className={style.cardbody}>
                                                    <h5 className="card-title">{pros.productname}</h5>
                                                    <h5 className={style.price}>₹{pros.price}/-</h5>

                                                    <div className={style.rating}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < (pros.rating || 4) ? style.starFilled : style.starEmpty}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={style.mainCard}>
                            <div className={style.topContent}>
                                <h3>Grab These Limited-Time Offers</h3>
                            </div>
                            <div className={style.products}>
                                {
                                    products.slice(14, 18).map((pros) => (
                                        <div className={`card ${style.productCard}`} key={pros.id} onClick={() => prodetails(pros)}>
                                            <img
                                                src={`http://localhost:5001/upload/${pros.imgpath}`}
                                                className={style.pimg}
                                                alt={pros.productname}
                                            />
                                            <div className={style.cardbody}>
                                                <div className={style.cardbody}>
                                                    <h5 className="card-title">{pros.productname}</h5>
                                                    <h5 className={style.price}>₹{pros.price}/-</h5>

                                                    <div className={style.rating}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < (pros.rating || 4) ? style.starFilled : style.starEmpty}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
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

export default homepros

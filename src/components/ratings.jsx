import React, { useEffect, useState } from "react";
import style from "../components/ratings.module.css";
import { CiStar } from "react-icons/ci";
import { allProducts } from '../config/config'
import { useLocation } from "react-router-dom";

function Ratings() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [products, setProducts] = useState([])
    const location = useLocation();
    const { productid } = location.state || {}; // get it safely

    console.log("Product ID received:", productid);

    let getProducts = async () => {
        let response = await allProducts();
        let result = await response;
        setProducts(result);
    }

    let submitFeedback = async () => {

    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleSubmit = async () => {
        let pid = products.Productid
    };



    return (
        <div className={style.ratingsContainer}>
            <div className={style.card}>
                <h2 className={style.title}>Rate Your Experience</h2>

                <div className={style.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`${style.star} ${rating >= star ? style.activeStar : ""}`}
                            onClick={() => setRating(star)}
                        >
                            <CiStar />
                        </span>
                    ))}
                </div>

                <textarea
                    className={style.textarea}
                    placeholder="Write your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>

                <button className={style.submitBtn} onClick={submitFeedback}>
                    Submit Feedback
                </button>
            </div>
        </div>
    );
}

export default Ratings;


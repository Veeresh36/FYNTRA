import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../admin/addps.module.css'
import Dropzone from '../../components/dropZone'
import { addproscategories } from '../../config/config'

import prd from '../../assets/addproduct/01.png'

function addps() {

    let navigate = useNavigate()

    let [products, setProducts] = useState({
        productName: "",
        catid: "",
        descs: "",
        price: "",
        productmodel: "",
        qty: ""
    })
    let [catpros, setCatPros] = useState([])

    let [images, setImages] = useState([])

    let allCats = async () => {
        let response = await addproscategories()
        setCatPros(response)
    }

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (role != 'admin' || !token) {
        navigate("/admin");
    }

    useEffect(() => {
        allCats()
    }, [])

    let textBoxHandler = (e) => {
        const { name, value } = e.target
        setProducts({ ...products, [name]: value })
    };
    // console.log(products);

    let submitHandler = async (e) => {
        e.preventDefault(); // stop page reload

        if (!e.target.checkValidity()) {
            e.target.reportValidity(); // show browser validation messages
            return;
        }

        const formHandler = new FormData();

        images.forEach(img => {
            formHandler.append("images", img.file)
        });

        formHandler.append("productName", products.productName);
        formHandler.append("catid", products.catid);
        formHandler.append("descs", products.descs);
        formHandler.append("price", products.price);
        formHandler.append("productmodel", products.productmodel);
        formHandler.append("qty", products.qty);

        let response = await fetch(`http://localhost:5001/addproducts`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formHandler,
        });

        let result = await response.json();

        if (response.status === 200) {
            alert(result.message);
            setImages([]);
            setProducts({
                productName: "",
                catid: "",
                descs: "",
                price: "",
                productmodel: "",
                qty: ""
            });
        }
        if(productName= "", catid= "", descs= "",
                price= "", productmodel= "", qty= ""){
                    alert("please fill all fields")
                }
    };



    return (
        <>
            <div className={`${style.addPrd}`}>
                <div className={`${style.productsCat} `}>
                    <div className={style.header}>
                        <h5><img className={style.prdimg} src={prd} alt="" />Add New Product</h5>
                    </div>
                    <div className={`${style.prddivs}`}>
                        {/* left div */}
                        <div className={`${style.right_data}`}>
                            <div className={style.cate}>
                                <h4>Category</h4>
                                <span>Product Category</span>
                                {/* product category dropdown */}
                                <select name="catid" value={products.catid} onChange={textBoxHandler}>
                                    <option value="all">All</option>
                                    {
                                        catpros.map(catdata =>
                                            <>
                                                <Link to={catdata.rout} ><option value={catdata.catid}>{catdata.catname}</option></Link>
                                            </>
                                        )
                                    }
                                </select>
                            </div>

                            {/* img upload -------------------------------------------------- */}
                            <div className={style.imgUp}>
                                <Dropzone images={images} setImages={setImages} />
                            </div>
                        </div>
                        <div className={`${style.left_data}`}>
                            <div className={style.details}>
                                <h2>General Information</h2>
                                {/* product name */}
                                <h4>Product Name</h4>
                                <input type="text" name='productName' value={products.productName} onChange={textBoxHandler} required placeholder='Product name' />

                                {/* product description */}
                                <h4>Product Description</h4>
                                <textarea value={products.descs} required onChange={textBoxHandler} name="descs" placeholder='Write a clear and engaging description of your product. Include details such as features, size, color, or materials, and highlight the key benefits that make it stand out to customers.' rows={10}></textarea>
                                <div className={style.persInfo}>
                                    {/* sihirt or etc size */}
                                    {/* <div className={style.size}>
                                        <h4>Size</h4>
                                        <span>Pick Available Size</span>
                                        <div className={style.bodySize}>
                                            <button>XS</button>
                                            <button>S</button>
                                            <button>M</button>
                                            <button>L</button>
                                            <button>XL</button>
                                            <button>XXL</button>
                                        </div>
                                    </div> */}

                                    {/* gender */}
                                    {/* <div className={style.gender}>
                                        <h4>Gender</h4>
                                        <span>Pick Available Gendler</span>
                                        <div className={style.options}>
                                            <label><input type="radio" name='gender' />Male</label>
                                            <label><input type="radio" name='gender' />Female</label>
                                            <label><input type="radio" name='gender' />Unisex</label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* pricing n stocks update */}
                            <div className={`${style.PnS}`}>
                                <h4>Pricing and Stock</h4>
                                <div className={style.PsnSs}>
                                    <div className={style.right}>
                                        <h5>Base Pricing</h5>
                                        <input type="number" value={products.price} onChange={textBoxHandler} placeholder='Price' name="price" required />
                                        <h5>SKU</h5>
                                        <input type="text" value={products.productmodel} onChange={textBoxHandler} placeholder='SKU' name='productmodel' required/>
                                        {/* <h5>Discount</h5>
                                        <input type="text" name="" id="" /> */}
                                    </div>
                                    <div className={style.left}>
                                        <h5>Stock</h5>
                                        <input type="number" value={products.qty} onChange={textBoxHandler} placeholder='Qantity' name='qty' required />

                                        {/*<h5>Discount Type</h5>
                                        <input type="text" />*/}
                                    </div>
                                </div>
                                <button onClick={submitHandler} className={style.padd}>Add Product</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addps

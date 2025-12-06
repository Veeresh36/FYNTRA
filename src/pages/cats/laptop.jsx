import React, { useState } from 'react'
import { useEffect } from 'react'
import style from '../../pages/cats/cates.module.css'
import { useNavigate } from 'react-router-dom';

function laptop({ fillpros }) {

  let navigate = useNavigate()

  let prodetails = (product) => {
    // console.log(product);
    navigate(`/product`, { state: { product: product.Productid } });
    // console.log(product.Productid);
  }

  return (
    <div className={`container-fluid ${style.container}`}>
      <div className={style.row}>
        <div className={style.mainCard}>
          <div className={style.products} >
            {
              fillpros.map(pros =>
                <>
                  <div className={`card ${style.productCard}`} style={{ display: pros.pstatus === 1 ? "block" : -1 ? "none" : "block" }} onClick={() => prodetails(pros)} >
                    <img src={`http://localhost:5001/upload/${pros.imgpath}`} className={style.pimg} alt="..."></img>
                    <div className={style.cardbody}>
                      <h5 className="card-title">{pros.productname}</h5>
                      <h5 className='card-title'>₹{pros.price}/-</h5>
                    </div>
                  </div>
                </>
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default laptop

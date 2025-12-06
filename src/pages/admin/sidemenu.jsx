import React, { useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import style from '../admin/sidemenu.module.css'
import '../../../src/index.css'
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";



import logo from '../../assets/admin/adlogo.png'
import smlogo from '../../assets/addproduct/favicon.png'
import s1 from '../../assets/admin/as1.png'
import s2 from '../../assets/admin/as2.png'
import s3 from '../../assets/admin/as3.png'
import s4 from '../../assets/admin/as4.png'
import s5 from '../../assets/admin/as5.png'
import s6 from '../../assets/admin/as6.png'

function sidemenu() {

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActiveParent = location.pathname.startsWith("/addps") || location.pathname.startsWith("/manageps");


    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || role != 'admin') {
        navigate("/admin");
    }

    const logoutHandler = () =>{
        let token = localStorage.removeItem('token')
        let role = localStorage.removeItem('role')
        navigate("/")
    }

    return (
        <>
            <div className={`${style.sideMenuContainer}`}>
                <Link to="/dashbord">
                    <img src={logo} className='d-none d-lg-block' alt="fyntra" />
                    <img src={smlogo} className={`d-sm-block d-lg-none ${style.smlogo}
                `} alt="fyntra" />
                </Link>
                <hr />
                <h3 className={`${style.menu}`}>MEAN MENU</h3>
                <ul className={`nav nav-pills flex-column ${style.sideMenu}`}>
                    <li className={`nav-item ${style.navItems} `}>
                        <NavLink aria-current="page" to="/dashbord" className={({ isActive }) => `nav-link ${style.LinknavLink} ${isActive ? "active" : ""}`} ><abbr title="Dashbord"><img src={s1} /><span className={`${style.links}`}>Dashbord</span></abbr></NavLink>
                    </li>

                    <li className={`nav-item ${style.navItems}`}>
                        <button onClick={() => setOpen(!open)} type='button' className={`nav-link ${style.LinknavLink} ${isActiveParent ? "active" : ""}`}><abbr title="Products"><img src={s2} alt="products" /><span className={`${style.links}`}>Products</span></abbr></button>
                        {/* sub manu open / short circute evaluation */}
                        {open && (
                            <ul>
                                <li><NavLink className={({ isActive }) => `nav-link dropdown-item ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/addps" href="#"><IoMdAdd className='text-dark' /><span className={`${style.links}`}>Add Products</span></NavLink></li>
                                <li><NavLink className={({ isActive }) => `nav-link dropdown-item ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/manageProducts" href="#"><RxUpdate className='text-dark' /><span className={`${style.links}`}>Manage Products</span></NavLink></li>
                            </ul>
                        )}
                    </li>




                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink className={({ isActive }) => `nav-link ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/Orders"><abbr title="Orders"><img src={s3} alt="orders" /><span className={`${style.links}`}>Orders</span></abbr></NavLink>
                    </li>
                    {/* <li className={`nav-item ${style.navItems}`}>
                        <NavLink className={({ isActive }) => `nav-link ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/"><abbr title="Reviews"><img src={s4} alt="reviews" /><span className={`${style.links}`}>Reviews</span></abbr></NavLink>
                    </li>
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink className={({ isActive }) => `nav-link ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/"><abbr title="Transactions"><img src={s5} alt="transactions" /><span className={`${style.links}`}>Transactions</span></abbr></NavLink>
                    </li>
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink className={({ isActive }) => `nav-link ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/"><abbr title="Settings"><img src={s6} alt="settings" /><span className={`${style.links}`}>Settings</span></abbr></NavLink>
                    </li> */}
                    <li className={`nav-item ${style.navItems}`}>
                        <NavLink onClick={()=>logoutHandler()} className={({ isActive }) => `nav-link ${style.LinknavLink}
                        } ${isActive ? "active" : ""}`} to="/"><abbr title="logout"><img src={s3} alt="orders" /><span className={`${style.links}`}>Logout</span></abbr></NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default sidemenu
import React, { useEffect, useState } from 'react'
import { citylist } from '../config/config'

function citieslist({getCItyData}) {

    let [cities, setCities] = useState([])
    let [filterCities, setfilterCities] = useState([])
    let [search, setSerch] = useState([])

    // geting the data from backend
    let getdata = async () => {
        let data = await citylist();
        setCities(data);
    }

    //serch handler
    let serchHandler = (e) => {
        let val = e.target.value
        setSerch(val)

        // filtering the data
        setfilterCities(val ? cities.filter(city => city.cityname.toLowerCase().startsWith(val.toLowerCase())
        ) : []);
    }

    // selection handler
    let citySelectionHandler=(city)=>{
        setSerch(city.cityname)
        setfilterCities([])
        getCItyData(city.cityid)
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <div className="box">
                <div className="col-lg-12 mt-3">
                    <input type="text" placeholder='select city' onChange={serchHandler} value={search} className='form-control' />

                        {
                            filterCities.length > 0 &&
                            <ul>
                                {
                                    // cityName displaying
                                    filterCities.map(data=>
                                        <>
                                        <li onClick={()=>citySelectionHandler(data)} style={{cursor:"pointer", marginLeft:"-30px", marginTop:"10px", listStyle:"none"}} >{data.cityname}</li>
                                        </>
                                    )
                                }
                            </ul>
                        }

                </div>
            </div>
        </>
    )
}

export default citieslist

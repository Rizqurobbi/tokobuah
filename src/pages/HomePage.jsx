import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../helper';

const HomePage =(props)=>{
    const [product,setProduct] =useState([])
    useEffect(()=>{
        getProduct()
    },[])
    const getProduct =()=>{
        axios.get(`${API_URL}/products`)
        .then((res)=>{
            setProduct(res.data)
            console.log("data123",product)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const PrintProduct=()=>{
        return product.map((value,index)=>{
            return <p>{value.nama}</p>
        })
    }
    return(
        <div>
            <text>Halo</text>
            {PrintProduct()}
        </div>
    )
}
export default HomePage
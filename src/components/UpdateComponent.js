import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params=useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails= async ()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    

    const updateProduct = async () => {
        console.warn(name,price,category,company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
           method:"put",
           body:JSON.stringify({name,price,category,company}),
           headers:{
            'Content-Type':"Application/json"
           }
        });
        result = await result.json();
        console.log(result)
        navigate('/')

    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter Product name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder='Enter Product price' className='inputbox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            
            <input type="text" placeholder='Enter Product category' className='inputbox' value={category} onChange={(e) => { setCategory(e.target.value) }} />

            <input type="text" placeholder='Enter Product company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            
            <button onClick={updateProduct} className='appbutton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct

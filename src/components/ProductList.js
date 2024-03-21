import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        if(result){
            setProducts(result)
        }else{
            setProducts([])
        }
        
    }
    const deleteHandler= async(id)=>{
        let result = await fetch('http://localhost:5000/product/${id}',{
            method:"Delete",
        });
        result =await result.json();
        if(result){
            getProducts()
        }

    }
     
    const searchHandle = async (event)=>{
        let key = event.target.value;
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result =await result.json();
        if(result){
            setProducts(result)
        }else{
            getProducts();
        }
    }
    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input className='search-product-box' type="text" placeholder='Search Product' onChange={searchHandle}/>
            <ul>
                <li>Sl.no</li>
                <li>name</li>
                <li>price</li>
                <li>category</li>
                <li>company</li>
                <li>Operation</li>
            </ul>
            {
              products.length>0 ?  products.map((item,index) => 
                    <ul>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteHandler(item.id)}>Delete</button>
                        <Link to={"/update/"+item._id}>Update</Link></li>
                    </ul>
                )
                :<h1> No Result Found</h1>
            }
        </div>
    )
}

export default ProductList

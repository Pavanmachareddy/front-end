import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await axios.post('http://127.0.0.1:5000/add-product', { name, price, category, company, userId })
        console.log('result', result.data)
        console.warn(result)

    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter Product name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder='Enter Product price' className='inputbox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input type="text" placeholder='Enter Product category' className='inputbox' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input type="text" placeholder='Enter Product company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct} className='appbutton'>Add Product</button>
        </div>
    )
}

export default AddProduct

import React, { useState, useEffect } from 'react';
import alertify from 'alertifyjs';
import axios from '../../utils/axios';
import './addProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({admin}) => {
    const [error, setError] = useState(false);
    const [mess, setMess] = useState(null);
    const [formValues, setFormValues] = useState({});
    const data = new FormData();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!admin) {
            navigate('/');
        }
    },[admin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const files = e.target.image.files;
        for (let img of files){
            data.append('image', img);
        }
        data.append('name', formValues.name);
        data.append('price', formValues.price);
        data.append('category', formValues.category);
        data.append('stock', formValues.stock);
        data.append('short_desc', formValues.short_desc);
        data.append('long_desc', formValues.long_desc);
        if(!formValues.name || !formValues.category || !formValues.image || !formValues.short_desc || !formValues.long_desc || !formValues.stock || !formValues.price) {
            setError(true)
        } else {
            axios.post('/admin/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/products');
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(res.data);
                })
                .catch(err => {
                    setError(false)
                    setMess(err.response.data)
                });
        }
    };

    return (
        <div className="container">
            <div className="addRoom__container">
                <div className='addRoomInfo'>
                    <div className="addRoomInfo__board">
                        <div className='addRoomInfo__board-title'>
                        <h2>Add New Product</h2>
                        </div>
                        <div className="addRoomInfo__board-table">
                        <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Product Name</label>
                                </div>
                                <input type="text" name="name" onChange={handleChange} placeholder="Enter Product Name"/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Category</label>
                                </div>
                                <select type="text" name="category" onChange={handleChange} >
                                    <option hidden>Enter Category</option>
                                    <option value="iphone">Iphone</option>
                                    <option value="ipad">Ipad</option>
                                    <option value="macbook">Macbook</option>
                                    <option value="airpod">Airpod</option>
                                    <option value="watch">Watch</option>
                                    <option value="mouse">Mouse</option>
                                    <option value="keyboard">Keyboard</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Stock</label>
                                </div>
                                <input type="number" name="stock" onChange={handleChange} placeholder="Enter Stock"/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Price</label>
                                </div>
                                <input type="number" name="price" onChange={handleChange} placeholder="Enter Price"/>
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Upload image (4 images)</label>
                                </div>
                                <input type="file" name="image" onChange={handleChange} multiple />
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Short Description</label>
                                </div>
                                <textarea name="short_desc" id="short_desc" cols="20" rows="4"
                                    placeholder="Enter Short Description"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Long Description</label>
                                </div>
                                <textarea name="long_desc" id="long_desc" cols="20" rows="7"
                                    placeholder="Enter Long Description"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" type="submit">Add Product</button> 
                            </div>
                            
                        </form>
                        </div>
                        <div className="error">
                            {error && <span className="error">Must Enter All Information!</span>}
                            {mess && <span className="error">{mess}</span>}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default AddProduct
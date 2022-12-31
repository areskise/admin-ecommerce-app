import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './editProduct.css';
import alertify from 'alertifyjs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({admin}) => {
    const [error, setError] = useState(false);
    const [product, setProduct] = useState([]);
    const [mess, setMess] = useState(null);
    const data = new FormData();
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(admin) {
            axios.get(`/products/${params.id}`)
              .then((res) => {
                  setProduct(res.data);
              })
              .catch(err => console.log(err));
        } else {
            navigate('/');
        }
      }, [admin, navigate, params.id]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const files = e.target.image.files;
        for (let img of files){
            data.append('image', img);
        }
        data.append('id', params.id);
        data.append('name', e.target.name.value);
        data.append('price', e.target.price.value);
        data.append('category', e.target.category.value);
        data.append('stock', e.target.stock.value);
        data.append('short_desc', e.target.short_desc.value);
        data.append('long_desc', e.target.long_desc.value);
        if(!e.target.name.value || !e.target.category.value || !e.target.short_desc.value || !e.target.long_desc.value || !e.target.stock.value || !e.target.price.value) {
            setError(true)
        } else {
            axios.put('/admin/update', data, {
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
                        <h2>Edit Product</h2>
                        </div>
                        <div className="addRoomInfo__board-table">
                        <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Product Name</label>
                                </div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter Product Name"
                                    defaultValue={product.name}
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Category</label>
                                </div>
                                <select type="text" name="category"  >
                                    <option value={product.category} hidden>{product.category}</option>
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
                                <input 
                                    type="number" 
                                    name="stock" 
                                     
                                    placeholder="Enter Stock"
                                    defaultValue={product.stock}
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Price</label>
                                </div>
                                <input 
                                    type="number" 
                                    name="price" 
                                     
                                    placeholder="Enter Price"
                                    defaultValue={product.price}
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Upload image (4 images)</label>
                                </div>
                                <input type="file" name="image"  multiple />
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Short Description</label>
                                </div>
                                <textarea 
                                    name="short_desc" 
                                    id="short_desc" 
                                    cols="20" rows="4"
                                    placeholder="Enter Short Description"
                                    
                                    defaultValue={product.short_desc}
                                ></textarea>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Long Description</label>
                                </div>
                                <textarea 
                                    name="long_desc" 
                                    id="long_desc" 
                                    cols="20" rows="7"
                                    placeholder="Enter Long Description"
                                    
                                    defaultValue={product.long_desc}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" type="submit">Edit Product</button> 
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

export default EditProduct
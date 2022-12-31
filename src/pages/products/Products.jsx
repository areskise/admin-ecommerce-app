import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import alertify from 'alertifyjs';
import convertMoney from '../../convertMoney';
import './products.css';

const Products = ({admin}) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;
    
    const navigate = useNavigate();

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if(admin) {
            axios.get(`/admin/products?limit=${limit}&page=${page}&search=${search}`)
                .then(res => {
                    setProducts(res.data.products)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
        } else {
            navigate('/');
        }
    }, [admin, limit, page, search, navigate]);

    const handleDelete = (id) => {
        const check = window.confirm('Are you sure delete this product?');
        if(check) {
            axios.delete(`/admin/delete?id=${id}`)
                .then(res => {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(res.data);
                    axios.get(`/admin/products?limit=${limit}&page=${page}`)
                        .then(res => {
                            setProducts(res.data.products)
                            setTotalPage(Math.ceil(res.data.count/limit))
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err.response.data);
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(err.response.data);
                });  
        }
    }

    if(page > totalPage) {
        setPage(page - 1)
    }
        
    const nextPage = () => {
        if(page < totalPage) {
            setPage(page + 1)
        } else {
            setPage(1)
        }
    }

    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1)
        } else {
            setPage(totalPage)
        }
    }

    return (
        <div className="container">
            <div className="hotel__container">
                <div className='hotelInfo'>
                    <div className="hotelInfo__board">
                        <h2>Products List</h2>
                        <div className='hotelInfo__board-title'>
                        <input 
                            type="text" 
                            className='search-input'
                            placeholder='Search Product'
                            onChange={onChangeSearch}
                        />
                        <a href="/addProduct">Add New</a>
                        </div>
                        <div className="hotelInfo__board-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><span></span>ID</th>
                                        <th><span></span>Name</th>
                                        <th><span></span>Price</th>
                                        <th><span></span>Image</th>
                                        <th><span></span>Category</th>
                                        <th><span></span>Edit</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{convertMoney(product.price)} VNĐ</td>
                                            <td>
                                                <div className='media align-items-center justify-content-center'>
													<img
														src={product.img1}
														alt='...'
														width='200'
													/>
												</div>
                                            </td>
                                            <td>{product.category}</td>
                                            <td><button className='delete-button' onClick={(e) => handleDelete(product._id)}>Delete</button></td>
                                            <td><a href={`/editProduct/${product._id}`} className='edit-button' >Update</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="end">{page} of {totalPage}</td>
                                        <td>
                                            <button className='paging__button' onClick={() => prevPage()}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                        
                                            <button className='paging__button' onClick={() => nextPage()}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Products
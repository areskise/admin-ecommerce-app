import React from 'react';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './users.css';

const Users = ({admin}) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;

    const navigate = useNavigate();

    useEffect(() => {
        if(admin) {
            axios.get(`/users?limit=${limit}&page=${page}`)
                .then(res => {
                    setUsers(res.data.users)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
        } else {
            navigate('/');
        }
    }, [admin, limit, page, navigate]);

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
            <div className="user__container">
                <div className='userInfo'>
                    <div className="userInfo__board">
                        <div className='userInfo__board-title'>
                        <h2>Users List</h2>
                        </div>
                        <div className="userInfo__board-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th><span></span>ID</th>
                                        <th><span></span>Full Name</th>
                                        <th><span></span>Email</th>
                                        <th><span></span>Phone</th>
                                        <th><span></span>Role</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={i}>
                                            <td>{user._id}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {page} of {totalPage}
                                            <span></span>
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

export default Users
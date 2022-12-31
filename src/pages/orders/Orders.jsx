import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import History from '../../components/history/History';
import axios from '../../utils/axios';
import './orders.css';

const Orders = ({admin}) => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;

    const navigate = useNavigate();

    useEffect(() => {
        if(admin) {
            axios.get(`/admin/histories?limit=${limit}&page=${page}`)
                .then(res => {
                    console.log(res.data.orders);
                    setOrders(res.data.orders)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
        } else {
            navigate('/');
        }
    },[admin, limit, page, navigate]);
    
    return (
        <div className="container">
            <div className="transactions__container">
                <div className='transactionsInfo'>
                    <div className="transactionsInfo__board">
                        <div className='transactionsInfo__board-title'>
                        <h2>History</h2>
                        </div>
                        <div className="transactionsInfo__board-table">
                            <History 
                                orders={orders} 
                                page={page}
                                setPage={setPage}
                                totalPage={totalPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Orders;
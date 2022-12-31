import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import History from '../../components/history/History';
import InfoBoard from '../../components/infoBoard/InfoBoard';
import axios from '../../utils/axios';
import './dashBoard.css';

const DashBoard = ({admin}) => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 8;

    const navigate = useNavigate();
    
    useEffect(() => {
        if(admin) {
            axios.get('/users')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err));
    
            axios.get(`/admin/histories?limit=${limit}&page=${page}`)
                .then(res => {
                    setOrders(res.data.orders)
                    setCount(res.data.count)
                    setTotalPage(Math.ceil(res.data.count/limit))
                })
                .catch(err => console.log(err));
        } else {
            navigate('/');
        }
    },[admin, limit, page, navigate]);
    
    return (
        <div className="container">
            <div className="dashboard__container">
                <InfoBoard users={users} orders={orders} count={count} />
                <div className='dashboardInfo'>
                    <div className="dashboardInfo__board">
                        <div className='dashboardInfo__board-title'>
                        <h2>History</h2>
                        </div>
                        <div className="dashboardInfo__board-table">
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

export default DashBoard;
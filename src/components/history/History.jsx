import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import convertMoney from '../../convertMoney';
import './history.css';

const History = ({orders, setPage, page, totalPage}) => {

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
        <table>
            <thead>
                <tr>
                    <th><span></span>ID User</th>
                    <th><span></span>Name</th>
                    <th><span></span>Phone</th>
                    <th><span></span>Address</th>
                    <th><span></span>Total</th>
                    <th><span></span>Delivery</th>
                    <th><span></span>Status</th>
                    <th><span></span>Detail</th>
                    </tr>
            </thead>
            <tbody>
                {orders.map((order, i) => (
                    <tr key={i}>
                        <td>{order.user.userId}</td>
                        <td>{order.user.fullName}</td>
                        <td>{order.user.phone}</td>
                        <td>{order.user.address}</td>
                        <td>{convertMoney(order.total)} VNĐ</td>
                        <td>Waiting for progressing</td>
                        <td>Waiting for pay</td>
                        <td><Link className="table__status" to={`/orders/${order._id}`}>View</Link></td>
                    </tr>
                ))}
            </tbody>
            { page && <tfoot>
                <tr>
                    <td></td>
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
            </tfoot>}
        </table>
    );
};

export default History;
import './infoBoard.css';
import {
    faUser,
    faTruckFast,
    faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import convertMoney from '../../convertMoney';

const InfoBoard = ({users, orders, count}) => {
  return (
    <div className="dashboardInfo__board-items">
        <div className="dashboardInfo__board-item" id="users">
            <h4>Users</h4>
            <p>{users.count}</p>
            <span><FontAwesomeIcon icon={faUser} /></span>
        </div>
        <div className="dashboardInfo__board-item" id="orders">
            <h4>Orders</h4>
            <p>{count}</p>
            <span><FontAwesomeIcon icon={faTruckFast} /></span>
        </div>
        <div className="dashboardInfo__board-item" id="earnings">
            <h4>Earnings</h4>
            <p>{convertMoney(orders.map(order => order.total).reduce((prev, curr) => prev + curr, 0))} VNĐ</p>
            <span>
                <FontAwesomeIcon icon={faSackDollar} />
            </span>
        </div>
    </div>
  );
};

export default InfoBoard;
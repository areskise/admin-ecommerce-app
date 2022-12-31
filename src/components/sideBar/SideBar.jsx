import {
    faUser,
    faCartPlus,
    faTruckFast,
    faMessage,
    faCartShopping,
    faBox,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../utils/axios";
import { useNavigate } from 'react-router-dom';
import './sideBar.css'

const SideBar = ({login, setLogin, admin, counselor}) => {
    const navigate = useNavigate();

    const logoutClick = async () => {
      try {
        await axios.post("/admin/logout")
        setLogin(false)
        navigate('/');
      } catch (err) {
        console.log(err.response.data)
      }
    };

  return (
    <div className="sidebar">
      <div className="center">
        {admin &&
            <ul>
            <div>
                <p className="title">MAIN</p>
                <li>
                <a href="/dashboard">
                    <FontAwesomeIcon icon={faBox} />
                    <span> Dashboard</span>
                </a>
                </li>
                <p className="title">CHAT</p>
                <li>
                <a href="/chat">
                    <FontAwesomeIcon icon={faMessage} />
                    <span> Chat</span>
                </a>
                </li>
                <p className="title">LISTS</p>
                <li>
                <a href="/users">
                    <FontAwesomeIcon icon={faUser} />
                    <span> Users</span>
                </a>
                </li>
                <li>
                <a href="/products">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span> Products</span>  
                </a>
                </li>
                <li>
                <a href="/orders">
                    <FontAwesomeIcon icon={faTruckFast} />
                    <span> Orders</span>
                </a>
                </li>
                <p className="title">NEW</p>
                <li>
                <a href="/addProduct">
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span> New Product</span>
                </a>
                </li>
                <p className="title">ADMIN</p>
                <li onClick={() => logoutClick()}>
                <a href="/">
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span> Logout</span>
                </a>
                </li>
            </div>
            </ul>
        }
        {counselor &&
            <ul>
            <div>
                <p className="title">CHAT</p>
                <li>
                <a href="/chat">
                    <FontAwesomeIcon icon={faMessage} />
                    <span> Chat</span>
                </a>
                </li>
                <p className="title">COUNSELOR</p>
                <li onClick={() => logoutClick()}>
                <a href="/">
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span> Logout</span>
                </a>
                </li>
            </div>
            </ul>
        }
        {!login &&
            <ul>
                <div>
                    <p className="title"></p>
                    <li>
                    <a href="/">
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span> Login</span>
                    </a>
                    </li>
                </div>
            </ul>
        }
      </div>
    </div>
  )
}

export default SideBar
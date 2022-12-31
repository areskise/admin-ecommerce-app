import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Cookies from 'universal-cookie';
import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/login/Login";
import DashBoard from "./pages/dashBoard/DashBoard";
import Users from "./pages/users/Users";
import Chat from "./pages/chat/Chat";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import Header from "./components/header/Header";
import DetailHistory from "./components/history/DetailHistory";

function App() {
  const cookies = new Cookies();
	const admin = cookies.get('admin');
	const counselor = cookies.get('counselor');
  const [login, setLogin] = useState(admin?admin:counselor);

  return (
    <BrowserRouter>
      <Header/>
      <SideBar login={login} setLogin={setLogin} admin={admin} counselor={counselor} />
      <Routes>
        <Route path="/" element={<Login setLogin={setLogin} admin={admin} counselor={counselor} />}/>
        <Route path="/dashBoard" element={<DashBoard admin={admin}/>}/>
        <Route path="/chat" element={<Chat login={login}/>}/>
        <Route path="/users" element={<Users admin={admin}/>}/>
        <Route path="/products" element={<Products admin={admin}/>}/>
        <Route path="/orders" element={<Orders admin={admin}/>}/>
        <Route path="/orders/:id" element={<DetailHistory admin={admin}/>}/>
        <Route path="/addProduct" element={<AddProduct admin={admin}/>}/>
        <Route path="/editProduct/:id" element={<EditProduct admin={admin}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './login.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setLogin, admin, counselor}) => {
	const cookies = new Cookies();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => { 
        if(admin) {
            navigate('/dashboard')
        }
        if(counselor) {
            navigate('/chat')
        }
    }, [admin, counselor, navigate]);

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };

        axios.post("/admin/login", user)
        .then((res) => {
            console.log(res.data.user.role);
            if(res.data.user.role === 'admin') {
                cookies.set('admin_token', res.data.token, {maxAge: 86400000})
                cookies.set('admin', res.data.user, {maxAge: 86400000})
                navigate('/dashboard');
                setLogin(true)
            }
            if(res.data.user.role === 'counselor') {
                cookies.set('admin_token', res.data.token, {maxAge: 86400000})
                cookies.set('counselor', res.data.user, {maxAge: 86400000})
                navigate('/chat');
                setLogin(true)
            }
        })
        .catch(error => {
            console.log(error.response.data);	
            setError(error.response.data)
        });
    };

  return (
    <div className='login'>
        <div className='container'>
            <h1 className='login-title'>Login</h1>
            <div className='item'>
                <input
                type='text'
                placeholder='Email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                className='input'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleLogin();
                    }
                }}
                />
            </div>
            <div className='item'>
                <input
                type='password'
                placeholder='Password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                className='input'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleLogin();
                    }
                }}
                />
            </div>
            <div className='item'>
                <button className='button' onClick={handleLogin}>
                    Login
                </button>
            </div>
            <div className='item'>
                {error && <span className="error">{error}</span>}
            </div>
        </div>
    </div>
  );
};

export default Login;
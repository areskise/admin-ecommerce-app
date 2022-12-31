import './login.css';
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setLogin, admin, counselor}) => {
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
            if(res.data.role === 'admin') {
                navigate('/dashboard');
                setLogin(true)
            }
            if(res.data.role === 'counselor') {
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
                />
            </div>
            <div className='item'>
                <input
                type='password'
                placeholder='Password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                className='input'
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
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import axios from '../../utils/axios';
import './chat.css';

// import io from 'socket.io-client';
// const socket = io('https://server-ecommerce-app.vercel.app/', { transports : ['websocket']});
import Pusher from 'pusher-js';
let pusher = new Pusher('eab36ba3e13ebc083cfe', {
    cluster: 'ap1',
	encrypted: true
});

let channel = pusher.subscribe('ecommerce-app');

const Chats = ({login}) => {
    const [textMessage, setTextMessage] = useState('');
    const [search, setSearch] = useState('');
    const [roomId, setRoomId] = useState();
    const [chatrooms, setChatrooms] = useState([]);
	const [message, setMessage] = useState([]);

	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);

    const navigate = useNavigate();

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const fetchRoom = () => {
        console.log(search);
        axios.get(`/chatrooms?search=${search}`)
                .then(res => {
                    console.log(res.data);
                    setChatrooms(res.data);
                    setError(false)
                })
                .catch(err => {
                    setError(true);
                    setChatrooms([]);
                    setMessage([]);
                })
    }

    useEffect(() => {
        if(login) {
            fetchRoom();
        } else {
            navigate('/');
        }
    }, [login, navigate, search]);

    const onChangeText = (e) => {
		setTextMessage(e.target.value);
	};

    const fetchMess = (roomId) => {
        console.log(roomId);
        if(roomId) {
            axios.get(`/chatrooms/getById?roomId=${roomId}`)
            .then(res => {
                console.log(res);
                    setRoomId(roomId);
                    setMessage(res.data.messages);
                })
                .catch(err => console.log(err))
        } else {
            setMessage([]);
        }
    }

	const handleClick = (roomId) => {
        fetchMess(roomId);
    }

    const handlerSend = () => {
        if(roomId) {
            const data = {
                message: textMessage,
                roomId: roomId,
                is_admin: true,
            };

            axios.put('/chatrooms/addMessage', data)
                .then(res => {
                    setTextMessage('');
                    // setTimeout(() => {
                    //     // socket.emit('send_message', data);
                    // 	// channel.trigger("send_message", data);
                    // }, 200);
                    setLoad(true)
                })
                .catch(err => console.log(err))
        } else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Select a room chat!');
        }
    }

    useEffect(() => {
		if (load) {
            fetchRoom();
            fetchMess(roomId);
			setLoad(false);
		}
	}, [load]);

	useEffect(() => {
        // socket.on('send_message', (data) => {
        //     console.log(data);
        //     setLoad(true);
        // });
		// socket.on('create_room', (data) => {
        //     console.log(data);
		// 	setLoad(true);
		// });
        // socket.on('end_room', (data) => {
        //     console.log(data);
        //     if(roomId===data.roomId) {
        //         setMessage([]);
        //     }
		// 	setLoad(true);
		// });
        channel.bind('send_message', function (data) {
            console.log('send_message: ', data);
            setLoad(true);
        });
        channel.bind('create_room', function (data) {
            console.log('create_room: ', data);
            setLoad(true);
        });
        channel.bind('end_room', function (data) {
            console.log('end_room: ', data);
            if(roomId===data.roomId) {
                setMessage([]);
            }
            setLoad(true);
        });
	}, []);

    return (
        <div className="container">
            <div className="chat__container">
                <div className='chatInfo'>
                    <div className="chatInfo__board">
                        <div className='chatInfo__board-title'>
                        <h2>Chat</h2>
                        </div>
                        <div className="chatInfo__board-table">
                            <div className="chatInfo__board-items">
                                <div className="chatInfo__board-chatRoom">
                                    <input 
                                        type="text" 
                                        className='text-message-input'
                                        placeholder='Search By Room Id'
                                        onChange={onChangeSearch}
                                    />
                                    <div className='room-content'>
                                        {chatrooms && chatrooms.map(chatroom => (
                                            <div className='room-id'>
                                                <div className={roomId!==chatroom._id ? 'room-item' : 'room_active'} key={chatroom._id} onClick={() => handleClick(chatroom._id)}>
                                                    <img
                                                        className='avatar'
                                                        src='https://img.icons8.com/color/36/000000/administrator-male.png'
                                                        alt='...'
                                                    />
                                                    <p>{chatroom._id}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {error && <div className='error'>No room id match search</div>}
                                </div>
                                <div className='chatInfo__board-message'>
                                <div className='message-content'>
								{message &&
									message.map((value) =>
										!value.is_admin ? (
											<div
												className='media media-chat '
											>
												<div className='media-body'>
                                                    <img
                                                        className='avatar'
                                                        src='https://img.icons8.com/color/36/000000/administrator-male.png'
                                                        alt='...'
                                                    />
													<p className='mess'>
                                                        Client: {value.message}
                                                    </p>
												</div>
											</div>
										) : (
											<div
												className='media media-chat media-chat-reverse'
											>
												{' '}
												<div className='media-body'>
													<p>
                                                        You: {value.message}
                                                    </p>
												</div>
											</div>
										)
									)}
							</div>
							<div className='publisher bt-1 border-light'>
								<input
									type='text'
                                    className='text-message-input'
									placeholder='Enter Message!'
									onChange={onChangeText}
									value={textMessage}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											handlerSend();
										}
									}}
								/>
								<a
									onClick={handlerSend}
									className='text-message-item'
									data-abc='true'>
									<i className='fa fa-paper-plane'></i>
								</a>
							</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    )
}

export default Chats
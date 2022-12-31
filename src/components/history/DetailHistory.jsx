import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import convertMoney from '../../convertMoney';
import axios from '../../utils/axios';
import './history.css';


function DetailHistory(props) {
	const { id } = useParams();

	const [cart, setCart] = useState([]);

	const [information, setInformation] = useState({});
	useEffect(() => {
		console.log(id);
		const fetchData = async () => {
			const response = await axios.get(`/histories/${id}`);

			console.log(response.data);
			
			setCart(response.data.products);

			setInformation(response.data);
		};

		fetchData();
	}, [id]);

	return (
		<div className='container'>
			<div className="transactions__container">
                <div className='transactionsInfo'>
                	<div className='transactionsInfo__board'>
						<div className='container'>
							<div>
								<div className='transactionsInfo__board-title'>
									<h1>DETAILS ORDERS</h1>
								</div>
							</div>
						</div>
						<div>
							<h2>Information Order</h2>
							<p>ID User: {information.user?.userId}</p>
							<p>Full Name: {information.user?.fullName}</p>
							<p>Phone: {information.user?.phone}</p>
							<p>Address: {information.user?.address}</p>
							<p>Total: {convertMoney(information.total)} VNĐ</p>
						</div>

						<div className="transactionsInfo__board-table">
							<table>
								<thead>
									<tr>
										<th><span></span>ID Product</th>
										<th><span></span>Image</th>
										<th><span></span>Name</th>
										<th><span></span>Price</th>
										<th><span></span>Quantity</th>
									</tr>
								</thead>
								<tbody>
									{cart &&
										cart.map((value) => (
											<tr key={value.product._id}>
												<td>{value.product._id}</td>
												<td>
													<div>
														<img
															src={value.product.img1}
															alt='...'
															width='200'
														/>
													</div>
												</td>
												<td>{value.product.name}</td>
												<td>{convertMoney(value.product.price)} VNĐ</td>
												<td>{value.quantity}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
            </div>
		</div>
	);
}

export default DetailHistory;

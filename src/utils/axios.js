import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
	baseURL: 'https://server-ecommerce-app.vercel.app/',
	withCredentials: true,
	headers: {
		'content-type': 'application/json',
	},
});

instance.interceptors.request.use(async (config) => {
	// Handle token here ...
	const cookies = new Cookies();
	const token = cookies.get('admin_token');
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}
	return config;
});

export default instance;

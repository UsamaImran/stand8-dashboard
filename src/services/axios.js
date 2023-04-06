import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('token');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export default axios;

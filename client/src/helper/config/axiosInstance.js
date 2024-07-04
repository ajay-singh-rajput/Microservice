import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL || 'http://localhost:8080',
    withCredentials:true
});


const setToken = (token) => {
    Cookies.set('token', token, { expires: 7 }); 
    axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
};

const removeToken = () => {
    Cookies.remove('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
};

const token = Cookies.get('token');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
    axiosInstance.defaults.cookies = token;
}
const getToken = ()=>{
    return Cookies.get('token');
}

export { axiosInstance, setToken, removeToken, getToken };

export default axiosInstance;

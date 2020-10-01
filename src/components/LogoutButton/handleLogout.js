import axiosInstance from '../../auth/axiosApi'

export default function handleLogout() {
    try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
    }
    catch (e) {
        //console.log(e);
    }
};
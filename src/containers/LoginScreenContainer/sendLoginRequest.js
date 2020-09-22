import axiosInstance from '../../auth/axiosApi'
import {TOKEN_OBTAIN_URL} from '../../api_urls'

export default async function sendLoginRequest(username,password) {

    const response = await axiosInstance.post(TOKEN_OBTAIN_URL, {
        username: username,
        password: password
    });
    
    return response;

};
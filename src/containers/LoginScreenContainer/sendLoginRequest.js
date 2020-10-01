import axiosInstance from '../../auth/axiosApi'
import {TOKEN_OBTAIN_URL} from '../../api_urls'

export default async function sendLoginRequest(email,password) {

    const response = await axiosInstance.post(TOKEN_OBTAIN_URL, {
        email: email,
        password: password
    });

    return response;

};

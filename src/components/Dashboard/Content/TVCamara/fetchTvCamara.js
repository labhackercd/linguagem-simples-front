import axiosInstance from '../../../../auth/axiosApi'
import {API_TV_CAMARA_URL} from './../../../../api_urls'


export default async fetchTVCamara => {

    //TODO - Change api call and uncomment line at agenciaCamara.js
    const response = await axiosInstance.get(API_TV_CAMARA_URL, {
    });
    //console.log("CODE: " +response.status)
    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
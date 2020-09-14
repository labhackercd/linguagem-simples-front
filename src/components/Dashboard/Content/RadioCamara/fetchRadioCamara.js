import axiosInstance from '../../../../auth/axiosApi'
import {API_RADIO_CAMARA_URL} from '../../../../api_urls'

export default async fetchDataRadioCamara => {

    const response = await axiosInstance.get(API_RADIO_CAMARA_URL,);
    //console.log(response)

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
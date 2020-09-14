import axiosInstance from '../../../../auth/axiosApi'
import {API_RADIO_AGENCY_URL} from '../../../../api_urls'

export default async fetchDataAgenciaCamara => {

    const response = await axiosInstance.get(API_RADIO_AGENCY_URL, {
    });

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
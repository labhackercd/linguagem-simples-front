import axiosInstance from '../../../../auth/axiosApi'
import {API_SAVED_CONTENTS_URL} from './../../../../api_urls'

export default async function fetchDataSavedContentCamara(sessionId) {
   
    //TODO - Change api call and uncomment line at agenciaCamara.js
    //console.log(API_SAVED_CONTENTS_URL)
    const response = await axiosInstance.get((API_SAVED_CONTENTS_URL+"?session__id="+sessionId), {
    });
    

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
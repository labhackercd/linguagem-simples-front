import axiosInstance from '../../../auth/axiosApi.js'
import {API_SESSIONS_URL} from '../../../api_urls'

export default async fetchData => {

  const response = await axiosInstance.get(API_SESSIONS_URL, {});
  
  //console.log("CODE: " +response.status)
  
  if(response.status===200){
    return response.data;
  }else{
    return null;
  }

};
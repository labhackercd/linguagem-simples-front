import axiosInstance from '../../../auth/axiosApi.js'
import {API_SESSIONS_URL_NOT_LIVE, API_SESSIONS_CURRENT_LIVE_URL} from '../../../api_urls'

export async function fetchData() {

  const response = await axiosInstance.get(API_SESSIONS_URL_NOT_LIVE);
  
  //console.log("CODE: " +response.status)
  
  if(response.status===200){
    return response.data;
  }else{
    return null;
  }

};


export async function fetchCurrentSessionsData() {

  const response = await axiosInstance.get(API_SESSIONS_CURRENT_LIVE_URL);
  //console.log(response)
  
  if(response.data.length > 0){
    return response.data;
  }else{
    return null;
  }

};
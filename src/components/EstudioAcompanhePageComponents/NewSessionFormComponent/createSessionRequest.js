import axiosInstance from '../../../auth/axiosApi.js'
import {API_SESSIONS_URL} from '../../../api_urls'

export default async function createSessionRequest(info) {

  const response = await axiosInstance.post(API_SESSIONS_URL,info);

  if(response.status===201){

    return response.data;
  }

};

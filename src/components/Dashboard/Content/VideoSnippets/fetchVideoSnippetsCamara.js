import axiosInstance from '../../../../auth/axiosApi'
import {API_VIDEOS_SNIPPETS} from '../../../../api_urls'


export default async function fetchSessionVideos(sessionIdDadosAbertos){
    const response = await axiosInstance.get((API_VIDEOS_SNIPPETS+sessionIdDadosAbertos), {});

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }
}

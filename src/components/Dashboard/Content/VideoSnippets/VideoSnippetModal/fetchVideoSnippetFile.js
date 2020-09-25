import axiosInstance from '../../../../../auth/axiosApi'
import {API_FILE_VIDEO_URL} from '../../../../../api_urls'

export default async function getSnippetVideoFromUrl(videoUrl){
    
    const response = await axiosInstance.post((API_FILE_VIDEO_URL), {url: videoUrl})

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }
    
}

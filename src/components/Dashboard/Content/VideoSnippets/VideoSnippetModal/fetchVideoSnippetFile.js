import axiosInstance from '../../../../../auth/axiosApi'

export default async function getSnippetVideoFromUrl(videoUrl){

    const response = await axiosInstance.post(('/file-video/'), {url: videoUrl})

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }
    
}

import axiosInstance from '../../../../auth/axiosApi'
import {API_SAVED_CONTENTS_URL} from '../../../../api_urls'


export default async function postSaveContent(content_type,content_info,sessionId){

    try{
        const response = await axiosInstance.post(API_SAVED_CONTENTS_URL, {
            content_type: content_type,
            title: content_info.titulo,
            url: "https://"+content_info.url,
            session: sessionId
        });
        //console.log(response)

        if(response.status === 201){
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
   
}
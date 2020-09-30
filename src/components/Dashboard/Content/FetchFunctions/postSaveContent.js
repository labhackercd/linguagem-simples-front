import axiosInstance from '../../../../auth/axiosApi'
import {API_SAVED_CONTENTS_URL} from '../../../../api_urls'


export  async function postSaveContent(content_type,content_info,sessionId){

    try{
        const response = await axiosInstance.post(API_SAVED_CONTENTS_URL, {
            content_type: content_type,
            title: content_info.titulo,
            url: "https://"+content_info.url,
            session: sessionId,
            id_saved_content: content_info.id
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

export  async function deleteSavedContent(savedContentId){

    try{
        const response = await axiosInstance.delete(API_SAVED_CONTENTS_URL+savedContentId);
        //console.log(response)

        if(response.status === 204){ // Sucess removed
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
   
}
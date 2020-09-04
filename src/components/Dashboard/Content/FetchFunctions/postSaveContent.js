import axiosInstance from '../../../../auth/axiosApi'

export default async function postSaveContent(content_type,content_info,sessionId){
    //console.log(content_info)
    try{
        const response = await axiosInstance.post('/saved-contents/', {
            content_type: content_type,
            title: content_info.titulo,
            url: "https://"+content_info.url,
            session: sessionId
        });


        if(response.status === 201){
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
   
}
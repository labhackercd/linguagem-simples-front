import axiosInstance from '../../../../auth/axiosApi'


export default async function fetchDataSavedContentCamara(sessionId) {
   
    //TODO - Change api call and uncomment line at agenciaCamara.js
    const response = await axiosInstance.get(("/saved-contents/?session__id="+sessionId), {
    });
    //console.log(response)

    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
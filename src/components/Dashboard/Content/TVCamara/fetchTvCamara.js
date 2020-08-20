import axiosInstance from '../../../../auth/axiosApi'


export default async fetchTVRadioCamara => {

    //TODO - Change api call and uncomment line at agenciaCamara.js
    const response = await axiosInstance.get("/sessions/", {
    });
    console.log("CODE: " +response.status)
    if(response.status===200){
        return response.data;
    }else{
        return null;
    }

};
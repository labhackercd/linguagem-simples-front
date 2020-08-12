import axiosInstance from '../../../auth/axiosApi.js'

export default async fetchData => {

  const response = await axiosInstance.get("/sessions/", {
  });
  console.log("CODE: " +response.status)
  if(response.status===200){
    return response.data;
  }else{
    return null;
  }

};
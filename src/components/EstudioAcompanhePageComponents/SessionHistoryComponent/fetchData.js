import axiosInstance from '../../../auth/axiosApi.js'

export default async fetchData => {

  const response = await axiosInstance.get("/sessions/", {
  });
  console.log("Sessions sendo obtidas")

  if(response.status===200){
    //this.setState({sessionsList:result.data})
    return response.data;
  }else{
    return null;
  }

};
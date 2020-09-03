import axiosInstance from './../../auth/axiosApi'

export default async function fetchData(dashboarId){
  console.log(dashboarId)
  const response = await axiosInstance.get(("/sessions/"+dashboarId+"/"), {});

  return response
  /*
  if(response.status===200){
    return response;
  }else{
    return "Erro";
  */

};
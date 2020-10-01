import axiosInstance from './../../auth/axiosApi'
import {API_SESSIONS_URL} from './../../api_urls'

export async function fetchData(dashboarId){
  //console.log(dashboarId)
  const response = await axiosInstance.get((API_SESSIONS_URL+dashboarId+"/"), {});
  //console.log(response)
  return response
  /*
  if(response.status===200){
    return response;
  }else{
    return "Erro";
  */

};

export async function changeBroadcastingStatus(dashboardInfo, broadcastingStatus) {
  let sessionId = dashboardInfo.id;
  try {
    const response = await axiosInstance.patch((API_SESSIONS_URL+sessionId+'/'), {
      id: sessionId,
      enable: broadcastingStatus,
    })
    return response;
  } catch(e) {
    console.log("Change BroadCastingStatus error")
  }
}

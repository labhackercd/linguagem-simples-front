import axiosInstance from './../../../auth/axiosApi'
import axios from 'axios'

export async function fetchFeedUpdates(sessionId){
    if(!sessionId) { return "Please provide a valid session Id"}
    const response = await axiosInstance.get(('/publications/?session__id=' + sessionId))
    if(response.status === 200) {
      return response.data
    }
    return response
}

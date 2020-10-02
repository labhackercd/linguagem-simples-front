import axiosInstance from './../../../auth/axiosApi'
import axios from 'axios'
import {API_PUBLICATIONS_URL, API_SESSIONS_URL} from './../../../api_urls'

export async function fetchFeedUpdates(sessionId){
    if(!sessionId) { return "Please provide a valid session Id"}
    const response = await axiosInstance.get((API_PUBLICATIONS_URL + '?session__id=' + sessionId))
    if(response.status === 200) {
      return response.data
    }
    return response
}

export async function deletePostFromFeed(publicationId) {
  if(!publicationId) { return "Please provide a valid publication id" }
  const response = await axiosInstance.patch((API_PUBLICATIONS_URL + publicationId + "/"), {
          state: 'inactive'
      })
  if(response.status === 200) {
    return response.data
  }
}

export async function submitSummaryContent(sessionID, textFieldValue) {
    const url = API_SESSIONS_URL + sessionID + '/';
    if(!textFieldValue) { return "Please provide a valid publication id"}
    const response = await axiosInstance.patch(url, {
            id: sessionID,
            resume: textFieldValue
        })
    if(response.status === 200) {
      return response.data
    }
  }

import axiosInstance from '../../../../auth/axiosApi'
import axios from 'axios'
import {API_SESSIONS_URL,API_CD_EVENTOS_PLENARIO} from './../../../../api_urls'

export async function updateSession(sessionId,sessionIdDadosAbertos){
    const response = await axiosInstance.patch((API_SESSIONS_URL+sessionId+'/'), {id_session_dados_abertos: sessionIdDadosAbertos})
    if((parseInt(response.data.id_session_dados_abertos) === parseInt(sessionIdDadosAbertos))){
     //The session was succesfully updated
        return true;
    }else{
        return false
    }
}

export async function checkIfSessionsAlreadyExistsInSILEG(sessionDate) {
    const date = sessionDate
    //const date = (moment(sessionDate).format('YYYY-MM-DD'))
    const url =  API_CD_EVENTOS_PLENARIO+"&dataInicio="+date+"&dataFim="+date+"&ordem=ASC&ordenarPor=dataHoraInicio";

    const response = await axios.get(url)
    return  response.data;


}
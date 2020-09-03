import axiosInstance from './../../../auth/axiosApi'
import * as moment from 'moment'
import axios from 'axios'

export async function updateSession(sessionId,sessionIdDadosAbertos){
    const response = await axiosInstance.patch(('/sessions/'+sessionId+'/'), {id_session_dados_abertos: sessionIdDadosAbertos})
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
    const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos?codTipoEvento=110&dataInicio="+date+"&dataFim="+date+"&ordem=ASC&ordenarPor=dataHoraInicio";

    const response = await axios.get(url)
    return  response.data;


}
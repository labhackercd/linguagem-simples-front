import axios from 'axios'
import {API_CD_PAUTA_SESSAO_PLENARIO} from '../../../../../api_urls'

export default async function fetchAgendaOfTheDay(sessionIdDadosAbertos) {

    const url = API_CD_PAUTA_SESSAO_PLENARIO+sessionIdDadosAbertos+"/1"
    
    const response= await axios.get(url)
    //console.log(response)
    return  response.data;
}

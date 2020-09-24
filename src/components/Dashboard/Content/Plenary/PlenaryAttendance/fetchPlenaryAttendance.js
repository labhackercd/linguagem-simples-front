import axios from 'axios'
import {API_CD_PRESENCA_VOTACAO_PLENARIO} from '../../../../../api_urls'

export default async function fetchPlenaryAttendance() {
    //const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const url = API_CD_PRESENCA_VOTACAO_PLENARIO;
    const response = await axios.get(url);

    
    return  response.data;
}




import axios from 'axios'
import {API_CD_ORIENTACAO_VOTACAO, API_CD_NOMINAL_VOTACAO, API_CD_ITENS_EM_VOTACAO} from '../../../../../api_urls'

export async function fetchOrientationVote(votacaoId) {
    //const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const url = API_CD_ORIENTACAO_VOTACAO+votacaoId;
    const response = await axios.get(url);

    //console.log(response)
    return  response.data;
}

export async function fetchNominalVote(votacaoId) {
    //const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const url = API_CD_NOMINAL_VOTACAO+votacaoId;
    const response = await axios.get(url);

    //console.log(response)
    return  response.data;
}


export async function fetchVotingList(sessionIdDadosAbertos) {

    //const date = (moment(sessionDate).format('YYYY-MM-DD'))
    //const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos/"+sessionIdDadosAbertos+"/pauta";
    const url =  API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos;
    const response = await axios.get(url)
    //console.log(response)
    //console.log(response)
    return  response.data;
}

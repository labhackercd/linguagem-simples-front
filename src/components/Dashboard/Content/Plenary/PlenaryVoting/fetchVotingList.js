import axios from 'axios'


export default async function fetchVotingList(sessionIdDadosAbertos) {

    //const date = (moment(sessionDate).format('YYYY-MM-DD'))
    //const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos/"+sessionIdDadosAbertos+"/pauta";
    const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const response = await axios.get(url)
    
    console.log(response)
    return  response.data;
}

import axios from 'axios'


export default async function fetchOrientationVote(votacaoId) {

    //const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const url = "https://liderancadigital.camara.leg.br/proxy_pass/secod-wsVotDecom-orientacao"+votacaoId;
    const response = await axios.get(url);
    
    //console.log(response)
    return  response.data;
}

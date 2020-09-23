import axios from 'axios'

export default async function fetchPlenaryAttendance() {
    //const url =  "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/"+sessionIdDadosAbertos;
    const url = "https://infoleg.camara.gov.br/ws-plenario/api/presenca?local=P";
    const response = await axios.get(url);
    //console.log(response)

    //console.log(response)
    return  response.data;
}




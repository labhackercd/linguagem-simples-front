import axios from 'axios'


export default async function fetchAgendaOfTheDay(sessionIdDadosAbertos) {
    //console.log("funcao", sessionIdDadosAbertos)

    //const date = (moment(sessionDate).format('YYYY-MM-DD'))
    const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos/"+sessionIdDadosAbertos+"/pauta";
    
    const response = await axios.get(url)
    //console.log(response)
    return  response.data;
}
import axios from 'axios' 
import {API_CD_EVENTOS} from '../../../../api_urls'

export default async function getYoutubeVideoUrl(sessionIdDadosAbertos){
    const response = await axios.get(API_CD_EVENTOS+sessionIdDadosAbertos);

    return response.data.dados.urlRegistro;
}
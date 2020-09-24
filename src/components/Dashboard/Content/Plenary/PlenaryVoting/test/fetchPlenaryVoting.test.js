import MockAdapter from "axios-mock-adapter"
import {fetchOrientationVote, fetchVotingList} from '../fetchPlenaryVoting'
import {API_CD_ORIENTACAO_VOTACAO, API_CD_ITENS_EM_VOTACAO} from '../../../../../../api_urls'
import axios from 'axios'

describe('Test fetchOrientationVote fetch data ', () => {
    var data = null; 
    
    var votacaoId=1;
    const dados = [
        {
          "regime": "Urgência (Art. 155, RICD)",
          "codRegime": 21,
          "ordem": 6,
        }
      ]
    
    test("Testing when it works", async (done) => {
        var mockAxios = new MockAdapter(axios);
        // Return a fixed timestamp when moment().format() is called
        const url = API_CD_ORIENTACAO_VOTACAO+votacaoId;

        await mockAxios.onGet(url).replyOnce(200,dados);

        data = await fetchOrientationVote(votacaoId)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mockAxios.restore();
        done()
    });

});

describe('Test fetchVotingList fetch data ', () => {
    var data = null; 
    var votacaoId=1;
    var sessionIdDadosAbertos=1;
    const dados = [
        {
          "regime": "Urgência (Art. 155, RICD)",
          "codRegime": 21,
          "ordem": 6,
        }
      ]
    
    test("Testing when it works", async (done) => {
        var mockAxios = new MockAdapter(axios);
        // Return a fixed timestamp when moment().format() is called
        const url = API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos;

        await mockAxios.onGet(url).replyOnce(200,dados);

        data = await fetchVotingList(sessionIdDadosAbertos)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mockAxios.restore();
        done()
    });

});


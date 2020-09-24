import MockAdapter from "axios-mock-adapter"
import fetchAgendaOfTheDay from './../fetchAgendaOfTheDay'
import axios from 'axios'
import {API_CD_PAUTA_SESSAO_PLENARIO} from '../../../../../../api_urls'



describe('Test fetchAgendaOfTheDay fetch data ', () => {
    var data = null; 
    var mockAxios = new MockAdapter(axios);
    var sessionIdDadosAbertos = 59896;
    const dados = [
        {
          "ordem": 7,
          "proposicaoNome": "PL 6407/2013",
          "codProposicao": 593065,
          "situacaoItem": 2,
          "codParlamentarRelator": 1117239,
          "nomRelator": "Laercio Oliveira",
          "partidoRelator": "PP        ",
          "ufRelator": "SE",
          "bolRelatorPresente": 1
        }
      ]
    
    test("Test if checkIfSessionsAlreadyExistsInSILEG correctly", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const url =  API_CD_PAUTA_SESSAO_PLENARIO+sessionIdDadosAbertos+"/1";

        await mockAxios.onGet(url).replyOnce(200,{
            data: dados
        });

        data = await fetchAgendaOfTheDay(sessionIdDadosAbertos)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    afterAll(() => {
        mockAxios.restore();
    });


});


import MockAdapter from "axios-mock-adapter"
import fetchAgendaOfTheDay from './../fetchAgendaOfTheDay'
import axios from 'axios'



describe('Test fetchAgendaOfTheDay fetch data ', () => {
    var data = null; 
    var mockAxios = new MockAdapter(axios);
    var sessionIdDadosAbertos = 59896;
    const dados = [
        {
          "regime": "Urgência (Art. 155, RICD)",
          "codRegime": 21,
          "ordem": 6,
          "proposicao_": {
            "id": 2229142,
            "uri": "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2229142",
            "siglaTipo": "PDL",
            "codTipo": 550,
            "numero": 28,
            "ano": 2019,
            "ementa": "Exclui da Área Indígena São Marcos a área urbana da sede do Município de Pacaraima (RR)."
          },
          "uriProposicaoRelacionada": "",
          "situacaoItem": "Retirado",
          "uriVotacao": ""
        },
      ]
    
    test("Test if checkIfSessionsAlreadyExistsInSILEG correctly", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos/"+sessionIdDadosAbertos+"/pauta";

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


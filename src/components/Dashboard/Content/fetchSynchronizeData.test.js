import moxios from 'moxios'
import axiosInstance from './../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {checkIfSessionsAlreadyExistsInSILEG, updateSession} from './fetchSynchronizeData'
import moment from 'moment'
import axios from 'axios'

describe('Test updateSession function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);

    test("Test if FetchData returns true when it has worked correct", async (done) => {
        var data = null;
        const dashboarId = 1;
        const sessionIdDadosAbertos = 59895;
        
        mock.onPatch("/sessions/"+dashboarId+"/").replyOnce(200,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                username: "jpnsoares",
                first_name: "",
                last_name: "",
                email: "jpnsoares@email.com",
                profile: "editor"
            },
            location: "plenary",
            date: "2020-09-02",
            type_session: "virtual",
            situation_session: "pre_session",
            resume: "string",
            enable: true,
            id_session_dados_abertos: "59895"
        });


        data = await updateSession(dashboarId,sessionIdDadosAbertos);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data).toBeTruthy()
        done()
    });

    test("Test if FetchData returns false when it has not worked correct", async (done) => {
        var data = null;
        const dashboarId = 1;
        const sessionIdDadosAbertos = 50000;
        
        mock.onPatch("/sessions/"+dashboarId+"/").replyOnce(200,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                username: "jpnsoares",
                first_name: "",
                last_name: "",
                email: "jpnsoares@email.com",
                profile: "editor"
            },
            location: "plenary",
            date: "2020-09-02",
            type_session: "virtual",
            situation_session: "pre_session",
            resume: "string",
            enable: true,
            id_session_dados_abertos: "59895"
        });


        data = await updateSession(dashboarId,sessionIdDadosAbertos);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data).not.toBeTruthy()
        done()
    });

    afterAll(() => {
        mock.restore();
    });
});


describe('Test checkIfSessionsAlreadyExistsInSILEG fetch data ', () => {
    var data = null; 
    var mockAxios = new MockAdapter(axios);
    const dados = {
        "dados": [
          {
            "id": 59895,
            "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895",
            "dataHoraInicio": "2020-09-01T11:00",
            "dataHoraFim": "2020-09-01T14:30",
            "situacao": "Encerrada",
            "descricaoTipo": "Sessão Deliberativa",
            "descricao": "Sessão Deliberativa Extraordinária (virtual)",
            "localExterno": null,
            "orgaos": [
              {
                "id": 180,
                "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/180",
                "sigla": "PLEN",
                "nome": "Plenário",
                "apelido": "Plenário",
                "codTipoOrgao": 26,
                "tipoOrgao": "Plenário Virtual"
              }
            ],
            "localCamara": {
              "nome": "Plenário da Câmara dos Deputados",
              "predio": null,
              "sala": null,
              "andar": null
            }
          }
        ],
        "links": [
          {
            "rel": "self",
            "href": "https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=2020-09-01&dataFim=2020-09-01&ordem=ASC&ordenarPor=dataHoraInicio"
          }
        ]
    }
    
    test("Test if checkIfSessionsAlreadyExistsInSILEG correctly", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const date = '2020-01-09'
        const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos?codTipoEvento=110&dataInicio="+date+"&dataFim="+date+"&ordem=ASC&ordenarPor=dataHoraInicio";

        await mockAxios.onGet(url).replyOnce(200,{
            data: dados
        });

        data = await checkIfSessionsAlreadyExistsInSILEG('2020-01-09')
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    afterAll(() => {
        mockAxios.restore();
    });


});


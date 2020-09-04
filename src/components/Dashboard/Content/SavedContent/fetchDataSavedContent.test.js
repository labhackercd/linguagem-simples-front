import axiosInstance from '../../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import fetchDataSavedContentCamara from './fetchDataSavedContent'
import axios from 'axios'

describe('Test SavedContentFetch function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);

    test("Test if FetchData returns data when it has not worked as expected", async (done) => {
        var data = null;
        const dashboarId = 1;
        
        await mock.onGet('saved-contents/?session__id=1').reply(201)
        //console.log(response)

        data = await fetchDataSavedContentCamara(dashboarId);
        expect(data).toBeNull();

        done()
    });
    
    test("Test if FetchData returns data when it has  worked correct", async (done) => {
        var data = null;
        const dashboarId = 1;
        const savedContentMockData = [
            {
              "id": 2,
              "created": "2020-09-03T14:25:35.161495-03:00",
              "content_type": "news",
              "title": "Especialistas criticam permissão para rede social pedir documento de identidade do usuário",
              "url": "http://www.camara.leg.br/noticias/619950-ESPECIALISTAS-CRITICAM-PERMISSAO-PARA-REDE-SOCIAL-PEDIR-DOCUMENTO-DE-IDENTIDADE-DO-USUARIO",
              "session": 1
            },
            {
              "id": 3,
              "created": "2020-09-03T14:59:36.657775-03:00",
              "content_type": "tv",
              "title": "TV Câmara ",
              "url": "http://www.camara.leg.br/radio/radioagencia/560001-SINAL-DA-RADIO-CAMARA-CHEGA-A-MANAUS",
              "session": 1
            },
            {
              "id": 4,
              "created": "2020-09-03T15:14:03.465319-03:00",
              "content_type": "radio",
              "title": "Sinal da Rádio Câmara chega a Manaus",
              "url": "http://www.camara.leg.br/radio/radioagencia/560001-SINAL-DA-RADIO-CAMARA-CHEGA-A-MANAUS",
              "session": 1
            },
            {
                "id": 5,
                "created": "2020-09-03T15:14:03.465319-03:00",
                "content_type": "",
                "title": "Null item for test",
                "url": "http://www.camara.leg.br/null",
                "session": 1
            }
        ]
        
        await mock.onGet('saved-contents/?session__id='+dashboarId).reply(200,savedContentMockData)


        data = await fetchDataSavedContentCamara(dashboarId);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    afterAll(() => {
        mock.restore();
    });
});



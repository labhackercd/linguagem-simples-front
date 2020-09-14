import Youtube from '../index'
import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axios from 'axios'
import getYoutubeVideoUrl from '../fetchYoutubeVideoUrl'
import {API_CD_EVENTOS} from '../../../../../api_urls'


test("Test if youtube returns transmission not available when sessionID is null", async (done) => {
    const component = mount(<Youtube sessionIdDadosAbertos={null}></Youtube>);
    //console.log(component.debug())
    //console.log(component.text())
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch(/Transmissão não disponível/i)

    done()
});

describe('Test if youtube returns as expected when correct information are provided', () => {
    //var mock = new MockAdapter(axios);
    const sessionMockData = {
          "dados": {
            "uriDeputados": null,
            "uriConvidados": null,
            "fases": null,
            "id": 59895,
            "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895",
            "dataHoraInicio": "2020-09-01T11:00",
            "dataHoraFim": "2020-09-01T14:30",
            "situacao": "Encerrada",
            "descricaoTipo": "Sessão Deliberativa",
            "descricao": "Sessão Deliberativa Extraordinária (virtual)\r\n",
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
            "requerimentos": [],
            "localCamara": {
              "nome": "Plenário da Câmara dos Deputados",
              "predio": null,
              "sala": null,
              "andar": null
            },
            "urlDocumentoPauta": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895/pauta",
            "urlRegistro": "https://www.youtube.com/watch?v=DlNbwp9U0wI"
          },
          "links": [
            {
              "rel": "self",
              "href": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895"
            },
            {
              "rel": "related",
              "href": "https://www.youtube.com/watch?v=DlNbwp9U0wI",
              "type": "text/html"
            }
          ]
        ,
        "status": 200,
        "statusText": "",
        "headers": {
          "cache-control": "private",
          "content-type": "application/json;charset=UTF-8",
          "link": "<https://dadosabertos.camara.leg.br/api/v2/eventos/59895>; rel=\"self\",<https://www.youtube.com/watch?v=DlNbwp9U0wI>; rel=\"related\",",
          "x-total-count": "1"
        },
        "config": {
          "url": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895",
          "method": "get",
          "headers": {
            "Accept": "application/json, text/plain, */*"
          },
          "transformRequest": [
            null
          ],
          "transformResponse": [
            null
          ],
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1
        },
        "request": {}
      }

    test("Test if FetchData returns data when  has worked correct", async (done) => {
        var data = null;
        var sessionIdDadosAbertos = 1
        var mock = new MockAdapter(axios);
        
        await mock.onGet(API_CD_EVENTOS+sessionIdDadosAbertos).replyOnce(200,sessionMockData);

        data = await getYoutubeVideoUrl(sessionIdDadosAbertos);
        //console.log(data)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mock.restore();
        done();
    });

    test("Test Youtube video content lifeclycle with data been loaded", async (done) => {

      var sessionIdDadosAbertos = 1;
      var mock = new MockAdapter(axios);
      await mock.onGet(API_CD_EVENTOS+sessionIdDadosAbertos).replyOnce(200,sessionMockData)
              
      const wrapper = await mount(<Youtube sessionIdDadosAbertos={sessionIdDadosAbertos}/>);

      setImmediate(() => {
        wrapper.update();

        const videoDiv = wrapper.find("#transmissaoYoutubeDlNbwp9U0wI").at(0);

        expect(videoDiv).not.toBeNull();
        expect(videoDiv).not.toBeUndefined();
       
        mock.restore();
        done();
     })

  });


    afterAll(() => {
       // mock.restore();
    });
});

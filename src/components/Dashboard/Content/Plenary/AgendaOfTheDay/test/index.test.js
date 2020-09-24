import React from 'react';
import { mount} from 'enzyme';
import AgendaOfTheDay from './../index'
import axios from 'axios'
import MockAdapter from "axios-mock-adapter"
import {API_CD_PAUTA_SESSAO_PLENARIO} from '../../../../../../api_urls'



describe('Testing lifeclycle ', () => {

  var mockInstance = new MockAdapter(axios);
  const mockedResponse = {
    "data": [
      {
        "ordem": 1,
        "proposicaoNome": "REQ 2144/2020",
        "codProposicao": 2260444,
        "situacaoItem": 2,
        "codParlamentarRelator": null,
        "nomRelator": null,
        "partidoRelator": null,
        "ufRelator": null,
        "bolRelatorPresente": 0
      },
      {
        "ordem": 2,
        "proposicaoNome": "MPV 961/2020",
        "codProposicao": 2251926,
        "situacaoItem": 2,
        "codParlamentarRelator": 1117208,
        "nomRelator": "João Campos",
        "partidoRelator": "REPUBLIC  ",
        "ufRelator": "GO",
        "bolRelatorPresente": 1
      },
    ],
    "status": 200,
    "statusText": "OK",
    "headers": {
      "cache-control": "private",
      "content-length": "406",
      "content-type": "application/json;charset=utf-8"
    },
    "config": {
      "url": "https://liderancadigital.camara.leg.br/proxy_pass/ws-pauta-itens-da-pauta/59896/1",
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
  
  test("should render the AgendaOfTheDay component and match snapshot ", async (done) => {

    const sessionIdDadosAbertos = 1;
  
    await mockInstance.onGet(API_CD_PAUTA_SESSAO_PLENARIO+sessionIdDadosAbertos+"/1").reply(200,mockedResponse.data)
            
    const component = mount(<AgendaOfTheDay sessionIdDadosAbertos={1}/>);
  
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
  
    done();
  });

  

  afterAll(() => {
      mockInstance.restore();
  });


});
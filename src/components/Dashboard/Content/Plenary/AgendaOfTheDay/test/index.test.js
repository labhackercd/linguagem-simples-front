import React from 'react';
import { mount} from 'enzyme';
import AgendaOfTheDay from './../index'
import axios from 'axios'
import MockAdapter from "axios-mock-adapter"



describe('Testing lifeclycle ', () => {

  var mockInstance = new MockAdapter(axios);
  const mockedResponse = {
    "data": {
      "dados": [
        {
          "regime": "Urgência (Art. 155, RICD)",
          "codRegime": 21,
          "ordem": 7,
          "proposicao_": {
            "id": 593065,
            "uri": "https://dadosabertos.camara.leg.br/api/v2/proposicoes/593065",
            "siglaTipo": "PL",
            "codTipo": 139,
            "numero": 6407,
            "ano": 2013,
            "ementa": "Dispõe sobre medidas para fomentar a Indústria de Gás Natural e altera a Lei nº 11.909, de 4 de março de 2009.  NOVA EMENTA: Dispõe sobre as atividades relativas ao transporte de gás natural, de que trata o art. 177 da Constituição Federal, e sobre as atividades de escoamento, tratamento, processamento, estocagem subterrânea, acondicionamento, liquefação, regaseificação e comercialização de gás natural; altera as Leis nºs 9.478, de 6 de agosto de 1997, e 9.847, de 26 de outubro de 1999; e revoga a Lei nº 11.909, de 4 de março de 2009, e dispositivo da Lei nº 10.438, de 26 de abril de 2002."
          },
          "uriProposicaoRelacionada": "",
          "situacaoItem": "Encerramentos",
          "uriVotacao": ""
        },
      ],
      "links": [
        {
          "rel": "self",
          "href": "https://dadosabertos.camara.leg.br/api/v2/eventos/59896/pauta"
        }
      ]
    },
    "status": 200,
  }
  
  test("should render the AgendaOfTheDay component and match snapshot ", async (done) => {

    const sessionIdDadosAbertos = 1;
  
    await mockInstance.onGet("https://dadosabertos.camara.leg.br/api/v2/eventos/"+sessionIdDadosAbertos+"/pauta").reply(200,mockedResponse.data)
            
    const component = mount(<AgendaOfTheDay sessionIdDadosAbertos={1}/>);
  
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
  
    done();
  });

  

  afterAll(() => {
      mockInstance.restore();
  });


});
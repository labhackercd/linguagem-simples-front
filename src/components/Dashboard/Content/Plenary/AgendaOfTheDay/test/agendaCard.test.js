import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import AgendaCard from './../agendaCard'


it("should render the AgendaCard component and match snapshot ", () => {
   
      const pautaInfo = {
        "regime": "Matéria Sobre a Mesa",
        "codRegime": 99,
        "ordem": 1,
        "proposicao_": {
          "id": 2260444,
          "uri": "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2260444",
          "siglaTipo": "REQ",
          "codTipo": 392,
          "numero": 2144,
          "ano": 2020,
          "ementa": "Requer a urgência na tramitação e a imediata inclusão na Ordem do Dia do Projeto de Lei nº 6.537/2019, no Plenário da Câmara dos Deputados."
        },
        "uriProposicaoRelacionada": "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2234707/",
        "situacaoItem": "Retirado",
        "uriVotacao": ""
      };
    
    const sessionIdDadosAbertos = 59896;

    const component = shallow(<AgendaCard pautaInfo={pautaInfo} sessionIdDadosAbertos={sessionIdDadosAbertos}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import AgendaCard from './../agendaCard'


it("should render the AgendaCard component and match snapshot ", () => {
   
      const pautaInfo = {
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
    
    const sessionIdDadosAbertos = 59896;

    const component = shallow(<AgendaCard pautaInfo={pautaInfo} sessionIdDadosAbertos={sessionIdDadosAbertos}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
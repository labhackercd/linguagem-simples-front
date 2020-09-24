import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import CongressPersonLine from '../congressPersonLine'


describe('Testing News Card', () => {

    it("should render the NewsCard component and match snapshot ", () => {
      var mockedPropsdata={
            carteira: 190,
            datInicioOrdemDia: null,
            datInicioSessao: null,
            datRegistroPresencaPlenario: null,
            nomReduzido: "Abílio Santana",
            nomSessao: null,
            numLegislatura: 56,
            numPosicaoUF: 16,
            numSessao: 0,
            sigPartido: "PL",
            sigUF: "BA",
            tipoPresenca: "A"
        };

      const component = mount(<CongressPersonLine data={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });
  
  
  });
  

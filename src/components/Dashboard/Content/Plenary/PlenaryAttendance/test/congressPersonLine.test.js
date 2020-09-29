import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import CongressPersonLine from '../congressPersonLine'


describe('Testing News Card', () => {

    it("should render the NewsCard component and match snapshot ", () => {
      var mockedPropsdata={
        "ideCadastro": 204379,
        "tipoMembro": "T",
        "nome": "Acácio Favacho",
        "partido": "PROS",
        "uf": "AP",
        "dataPresenca": "01/09/2020 14:39:38",
        "legendaPresenca": "P",
        "presencaContabilizada": true,
        "presencaExcedida": false,
        "titular": true,
        "suplente": false,
        "presente": true
      }

      const component = mount(<CongressPersonLine data={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });
  
  
  });
  

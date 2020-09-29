import React from 'react';
import VoteNominalCard from '../voteNominalCard.js'
import { mount} from 'enzyme';

describe('Testing Vote Nominal Card', () => {

    test("should render the  Vote Nominal Card component", () => {
      var mockedPropsdata={
        "ideItemVotacao": 33398,
        "codOrientacaoVotacao": "S",
        "sigPartido": "LAB",
        "nomOrientacaoVotacao": "Sim",
        "nomOrientacaoVotacaoResumido": "Sim",
        "sigUF":"DF",
        "nomReduzido":"Deputado X",
      }
      const component = mount(<VoteNominalCard data={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });

    test("should render the  Vote Nominal Card component in Lib orientation", () => {
        var mockedPropsdata={
            "ideItemVotacao": 33398,
            "codOrientacaoVotacao": "L",
            "sigPartido": "LAB",
            "nomOrientacaoVotacao": "Lib",
            "nomOrientacaoVotacaoResumido": "Lib",
            "sigUF":"DF",
            "nomReduzido":"Deputado X",
          }
        const component = mount(<VoteNominalCard  data={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });

      test("should render the  Vote Nominal Card component in Nao orientation", () => {
        var mockedPropsdata={
            "ideItemVotacao": 33398,
            "codOrientacaoVotacao": "N",
            "sigPartido": "LAB",
            "nomOrientacaoVotacao": "Não",
            "nomOrientacaoVotacaoResumido": "Não",
            "sigUF":"DF",
            "nomReduzido":"Deputado X",
          }
        const component = mount(<VoteNominalCard  data={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });
  });
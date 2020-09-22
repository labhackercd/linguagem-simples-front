import React from 'react';
import VoteOrientationCard from '../voteOrientationCard.js'
import { mount} from 'enzyme';

describe('Testing Vote Orientation Card', () => {

    test("should render the  Vote Orientation Card component", () => {
      var mockedPropsdata={
        "ideItemVotacao": 33398,
        "numOrdemOrientacao": 1,
        "nomRepresentacaoPartidaria": "PDT",
        "nomRepresentacaoPartidariaPainel": "PDT",
        "codOrientacaoVotacao": "S",
        "nomOrientacaoVotacao": "Sim",
        "nomOrientacaoVotacaoResumido": "Sim"
      }
      const component = mount(<VoteOrientationCard key={mockedPropsdata.ideItemVotacao} info={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });

    test("should render the  Vote Orientation Card component in Lib orientation", () => {
        var mockedPropsdata={
          "ideItemVotacao": 33398,
          "numOrdemOrientacao": 2,
          "nomRepresentacaoPartidaria": "PDT",
          "nomRepresentacaoPartidariaPainel": "PDT",
          "codOrientacaoVotacao": "L",
          "nomOrientacaoVotacao": "Lib",
          "nomOrientacaoVotacaoResumido": "Lib"
        }
        const component = mount(<VoteOrientationCard key={mockedPropsdata.ideItemVotacao} info={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });

      test("should render the  Vote Orientation Card component in Nao orientation", () => {
        var mockedPropsdata={
          "ideItemVotacao": 33398,
          "numOrdemOrientacao": 3,
          "nomRepresentacaoPartidaria": "PDT",
          "nomRepresentacaoPartidariaPainel": "PDT",
          "codOrientacaoVotacao": "N",
          "nomOrientacaoVotacao": "Não",
          "nomOrientacaoVotacaoResumido": "Não"
        }
        const component = mount(<VoteOrientationCard key={mockedPropsdata.ideItemVotacao} info={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });
  });
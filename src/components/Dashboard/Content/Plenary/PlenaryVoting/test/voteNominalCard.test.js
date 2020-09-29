import React from 'react';
import VoteNominalCard from '../voteNominalCard.js'
import { mount} from 'enzyme';

describe('Testing Vote Nominal Card', () => {

    test("should render the  Vote Nominal Card component", () => {
      var mockedPropsdata={
        "codTipoMembroComissao": "T",
        "codTipoParlamentar": "D",
        "ideCadastroParlamentar": 123456,
        "nomParlamentarPainelEletronico": "Deputado X",
        "bolRelator": false,
        "sigPartidoPoliticoAtual": "LAB",
        "sigUfEleito": "CD",
        "indVagaPorPartido": true,
        "indContabilizarVoto": 0,
        "dataPresenca": "01/09/2020 15:01:22.520",
        "dataVoto": null,
        "codTipoVoto": "S",
        "nomTipoVoto": "Sim"
      }
      const component = mount(<VoteNominalCard data={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });

    test("should render the  Vote Nominal Card component in default orientation", () => {
      var mockedPropsdata={
        "codTipoMembroComissao": "T",
        "codTipoParlamentar": "D",
        "ideCadastroParlamentar": 123456,
        "nomParlamentarPainelEletronico": "Deputado X",
        "bolRelator": false,
        "sigPartidoPoliticoAtual": "LAB",
        "sigUfEleito": "CD",
        "indVagaPorPartido": true,
        "indContabilizarVoto": 0,
        "dataPresenca": "01/09/2020 15:01:22.520",
        "dataVoto": null,
        "codTipoVoto": "",
        "nomTipoVoto": ""
      }
        const component = mount(<VoteNominalCard  data={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });

      test("should render the  Vote Nominal Card component in Nao orientation", () => {
        var mockedPropsdata={
          "codTipoMembroComissao": "T",
          "codTipoParlamentar": "D",
          "ideCadastroParlamentar": 123456,
          "nomParlamentarPainelEletronico": "Deputado X",
          "bolRelator": false,
          "sigPartidoPoliticoAtual": "LAB",
          "sigUfEleito": "CD",
          "indVagaPorPartido": true,
          "indContabilizarVoto": 0,
          "dataPresenca": "01/09/2020 15:01:22.520",
          "dataVoto": null,
          "codTipoVoto": "N",
          "nomTipoVoto": "Não"
        }
        const component = mount(<VoteNominalCard  data={mockedPropsdata}/>);
    
        expect(component.exists()).toEqual(true);
      });
  });
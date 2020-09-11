import React from 'react';
import {shallow} from "enzyme/build";
import RadioCamaraContent from './radioCamara'
import RadioCard from './radioCard'

import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from './../../../../auth/axiosApi'
import {API_RADIO_CAMARA_URL, API_SAVED_CONTENTS_URL} from './../../../../api_urls'
import CircularProgress from '@material-ui/core/CircularProgress';


it("should render the RadioCamaraContent section", () => {
    const component = shallow(<RadioCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

describe('Testing Radio Card', () => {

  it("Should render the RadioCard component and match snapshot ", () => {
    var mockedPropsdata={
      info: {
        retrancas: [ 'Consumidor' ],
        id: 619693,
        veiculo: 'radio',
        ano: 2020,
        data: '2020-04-14T07:00:16-0300',
        titulo: 'Projeto de Lei yyy/2020',
        resumo: 'Resumo',
        materia: 'Texto texto texto PEC 300/2008',
        dataOrdenacao: '2020-04-14T07:00:16-0300',
        rodape: '',
        url: 'www.camara.leg.br/noticias/619693-PROJETO-DE-LEI-YYY/2020',
        temaPortal: [ 'Consumidor' ],
        temaAutomatico: [ '' ],
        comissoes: [ [Object], [Object], [Object] ],
        imagem: [ [Object], [Object] ]
      },
      sessionId: undefined
    }
    const component = shallow(<RadioCard info={mockedPropsdata} sessionId={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

  test("Test", async (done) => {
    var mockInstance = new MockAdapter(axiosInstance);
    var mockedPropsdata={
        id: 618134,
        url: "www.camara.leg.br/radio/618134-DEPUTADOS-E-SENADORES-FECHAM-ACORDO-PARA-ANALISAR-PEC-DA-2ª-INSTANCIA",
        titulo: "Deputados e senadores fecham acordo para analisar PEC da 2ª Instância",
        data: "2019-11-26T18:00:22-0200"
    }
      await mockInstance.onPost(API_SAVED_CONTENTS_URL).replyOnce(200,mockedPropsdata)
              
      const wrapper = await mount(<RadioCard info={mockedPropsdata} sessionId={1}/>);
    
      setImmediate(() => {
        wrapper.update();
        //console.log(wrapper.debug())
        const button = wrapper.find("#saveButtonRadio618134").at(0);
        console.log(button.debug());
        button.simulate('click')
        //searchField.instance().value = "presential";
        //searchField.simulate("change");
        //expect(wrapper.find("input").at(0).prop('value')).toEqual("presential");
       
        mockInstance.restore();
        done();
     })

  });

});

describe('Testing lifeclycle of RadioCamaraComponent content', () => {

  test("Test radio content lifeclycle when data is not loaded", async (done) => {
                 
      const wrapper = await mount(<RadioCamaraContent sessionId={1}/>);

      setImmediate(() => {
        wrapper.update();
        //console.log(wrapper.debug())
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).toBeTruthy()
        done();
     })

  });

  test("Test radio content lifeclycle with data been loaded", async (done) => {
    var mockInstance = new MockAdapter(axiosInstance);
    const radioMockData = {
      "took": 157,
      "timed_out": false,
      "_shards": { "total": 5, "successful": 5, "skipped": 0, "failed": 0 },
      "hits": {
        "total": 53083,
        "max_score": null,
        "hits": [
          {
            "_index": "radioagencia",
            "_type": "radioagencia",
            "_id": "560001",
            "_score": 1.0,
            "_source": {
              "audios": [
                {
                  "titulo": "Sinal da Rádio Câmara chega a Manaus",
                  "url": "https://imagem.camara.gov.br/internet/midias/Radio/2019/06/ultimas_20190613_ar_radio_camara_em_manaus.mp3"
                }
              ],
              "id": 560001,
              "veiculo": "radio-camara",
              "ano": 2020,
              "data": "2020-05-13T16:25:00-0300",
              "categoria": "Radioagencia",
              "titulo": "Sinal da Rádio Câmara chega a Manaus",
              "resumo": "Uma parceria entre a Câmara dos Deputados e a Câmara Municipal de Manaus permitiu a montagem da FM no Amazonas",
              "materia": "O sinal da Rádio Câmara acaba de chegar à Amazônia. Entrou no ar a 11ª emissora da Rede Legislativa de Rádio - a Rádio Câmara em Manaus. A capital manauara é a quinta a receber o sinal da rede. Uma parceria entre a Câmara dos Deputados e a Câmara Municipal de Manaus permitiu a montagem da FM no Amazonas. Na capital manauara, a Rádio Câmara irá trazer tanto as notícias do Poder Legislativo federal quanto do municipal. Assim como em Brasília, a Rádio Câmara em Manaus também vai levar ao ouvinte uma diversidade de programas jornalísticos e culturais. Secretário de Comunicação da Câmara dos Deputados, o deputado Fábio Shiochet (PSL-SC) destacou a importância da expansão da Rede Legislativa de Rádio para a Amazônia. \"Um fato que acaba aproximando o Congresso Nacional, a Câmara dos Deputados do cidadão de Manaus e, assim, a gente chegando a praticamente todo o Brasil. Cada vez mais, a gente aproxima o dia a dia do congressista ao dia a dia do brasileiro.\" O presidente da Câmara Municipal de Manaus, Joelson Silva (PSDB), concorda que a rádio é uma importante ferramenta de comunicação para aproximar a população manauara dos vereadores. Além de Brasília e Manaus, a Rádio Câmara está hoje em Balneário Camboriú, Santa Catarina; em Bauru, São Paulo; em Chapadinha, Maranhão; em Cuiabá, Mato Grosso; em Itamarandiba e Pouso Alegre, Minas Gerais; em João Pessoa, Paraíba; e em Salvador e Teixeira de Freitas, na Bahia. A Rede Legislativa de Rádio tem mais de 128 canais em implantação, por todo o país. Há ainda 327 solicitações de canal a serem atendidas pelo Ministério da Ciência, Tecnologia, Inovações e Comunicações.Reportagem - Ana Raquel Macedo",
              "dataOrdenacao": "2020-05-13T16:25:00-0300",
              "rodape": "Reportagem - Ana Raquel Macedo",
              "url": "www.camara.leg.br/radio/radioagencia/560001-SINAL-DA-RADIO-CAMARA-CHEGA-A-MANAUS",
              "retrancas": ["Administração Pública", "Comunicação"],
              "tags": [
                "amazônia",
                "inclusão digital",
                "inclusão social",
                "radiodifusão"
              ],
              "ufs": [
                { "sigla": "AM", "nome": "Amazonas", "id": 4 },
                { "sigla": "BA", "nome": "Bahia", "id": 16 },
                { "sigla": "MA", "nome": "Maranhão", "id": 8 },
                { "sigla": "MG", "nome": "Minas Gerais", "id": 17 },
                { "sigla": "MT", "nome": "Mato Grosso", "id": 21 },
                { "sigla": "PA", "nome": "Pará", "id": 3 },
                { "sigla": "PB", "nome": "Paraíba", "id": 12 },
                { "sigla": "SC", "nome": "Santa Catarina", "id": 26 },
                { "sigla": "SP", "nome": "São Paulo", "id": 20 }
              ],
              "deputados": [{ "nomeDeputado": "Macedo", "id": 178867 }],
              "programas": [
                "MP deve beneficiar trabalhadores prejudicados com derramamento de óleo"
              ]
            },
            "sort": [1589397900000, 1.0]
          },
      
        ]
      }
    }
      
      await mockInstance.onGet(API_RADIO_CAMARA_URL).replyOnce(200,radioMockData)
              
      const wrapper = await mount(<RadioCamaraContent sessionId={1}/>);

      setImmediate(() => {
        wrapper.update();
        //console.log(wrapper.debug())
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).not.toBeTruthy();
        const searchField = wrapper.find("input").at(0);
        //console.log(searchField.debug());
        searchField.instance().value = "presential";
        searchField.simulate("change");
        //expect(wrapper.find("input").at(0).prop('value')).toEqual("presential");
       
        mockInstance.restore();
        done();
     })

  });

});
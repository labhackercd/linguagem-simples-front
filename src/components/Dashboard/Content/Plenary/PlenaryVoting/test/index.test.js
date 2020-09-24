import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import PlenaryVoting from '../index.js'
import {API_CD_ITENS_EM_VOTACAO,API_CD_ORIENTACAO_VOTACAO} from '../../../../../../api_urls.js'


describe('Testing lifeclycle of PlenaryVoting content', () => {

    test("Test PlenaryVoting content lifeclycle when data is not loaded", async (done) => {
                   
        const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          //console.log(wrapper.debug())
          const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
          expect(containsSpinner).toBeTruthy()
          done();
       })
  
    });

    test("Test PlenaryVoting content lifeclycle get votation itens server error", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;

        
        await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).replyOnce(404)
                
        const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.text()).toMatch(/Erro/i)
          mockInstance.restore();
          done();
       })
    });

    test("Test PlenaryVoting content lifeclycle get orientation vote error", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;

      var mock1 = {
        data:  [{
            "ideItemVotacao": 33389,
            "ideReuniao": 59896,
            "titulo": "REQ 2144/2020 - Requerimento de Urgência (Art. 155 do RICD) nº 2144/2020",
            "tituloReuniao": null,
            "ideProposicao": 2260444,
            "nomeRelator": null,
            "ideCadastroRelator": 0,
            "codTipoRelator": null,
            "ideCadastroPresidente": 178946,
            "nomeParlamentarPresidente": "Soraya Santos ",
            "indVagaPorPartido": true,
            "exibeResultadoFinal": 0,
            "exibeOrientacao": true,
            "dataAberturaRegistroVotacao": null,
            "dataFechamentoRegistroVotacao": null,
            "dataUltimaConsolidacaoVotacao": null,
            "dataUltimaAlteracaoVotacao": null,
            "nomeLocalVotacao": "Plenário da Câmara dos Deputados",
            "emExibicao": false,
            "siglaOrgao": null,
            "txtResultado": null,
            "indVotacaoSimbolica": 0,
            "cancelado": false
          }],

        "status": 200,
        "statusText": "OK",
        "headers": {
          "cache-control": "private",
          "content-type": "application/json;charset=utf-8"
        },
        "config": {
          "url": "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/59896",
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

        await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).reply(200,mock1.data); 
                
        const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
          expect(containsSpinner).not.toBeTruthy();

          const selectField = wrapper.find("#votation-list-item-slect");
          //console.log(selectField.debug());
          wrapper.find('select').simulate('change',{target: { value : '33389'}});
  
          mockInstance.restore();
          done();
       })
    });

    test("Test PlenaryVoting content lifeclycle server sucess", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;
      var votacaoId = 33389;
      var mock1 = {
        data:  [{
            "ideItemVotacao": 33389,
            "ideReuniao": 59896,
            "titulo": "REQ 2144/2020 - Requerimento de Urgência (Art. 155 do RICD) nº 2144/2020",
            "tituloReuniao": null,
            "ideProposicao": 2260444,
            "nomeRelator": null,
            "ideCadastroRelator": 0,
            "codTipoRelator": null,
            "ideCadastroPresidente": 178946,
            "nomeParlamentarPresidente": "Soraya Santos ",
            "indVagaPorPartido": true,
            "exibeResultadoFinal": 0,
            "exibeOrientacao": true,
            "dataAberturaRegistroVotacao": null,
            "dataFechamentoRegistroVotacao": null,
            "dataUltimaConsolidacaoVotacao": null,
            "dataUltimaAlteracaoVotacao": null,
            "nomeLocalVotacao": "Plenário da Câmara dos Deputados",
            "emExibicao": false,
            "siglaOrgao": null,
            "txtResultado": null,
            "indVotacaoSimbolica": 0,
            "cancelado": false
          }],

        "status": 200,
        "statusText": "OK",
        "headers": {
          "cache-control": "private",
          "content-type": "application/json;charset=utf-8"
        },
        "config": {
          "url": "https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/59896",
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
      var mock2 =   {
        "data": [
          {
            "ideItemVotacao": 33399,
            "numOrdemOrientacao": 1,
            "nomRepresentacaoPartidaria": "PT",
            "nomRepresentacaoPartidariaPainel": "PT",
            "codOrientacaoVotacao": "S",
            "nomOrientacaoVotacao": "Sim",
            "nomOrientacaoVotacaoResumido": "Sim"
          },
          {
            "ideItemVotacao": 33399,
            "numOrdemOrientacao": 2,
            "nomRepresentacaoPartidaria": "PSL",
            "nomRepresentacaoPartidariaPainel": "PSL",
            "codOrientacaoVotacao": "S",
            "nomOrientacaoVotacao": "Sim",
            "nomOrientacaoVotacaoResumido": "Sim"
          },
  
        ],
        "status": 200,
        "statusText": "OK",
        "headers": {
          "cache-control": "private",
          "content-length": "494",
          "content-type": "application/json;charset=utf-8"
        },
        "config": {
          "url": "https://liderancadigital.camara.leg.br/proxy_pass/secod-wsVotDecom-orientacao33399",
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

        await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).reply(200,mock1.data).onGet(API_CD_ORIENTACAO_VOTACAO+votacaoId).reply(200,mock2.data); 
                
        const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
          expect(containsSpinner).not.toBeTruthy();

          const selectField = wrapper.find("#votation-list-item-slect");
          //console.log(selectField.debug());
          wrapper.find('select').simulate('change',{target: { value : '33389'}});
  
          mockInstance.restore();
          done();
       })
    });

  

   /*
    test("Test agencia content lifeclycle with data not been loaded", async (done) => {
      var mockInstance = new MockAdapter(axiosInstance);
      const agenciaMockData = {
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
        
        await mockInstance.onGet(API_RADIO_AGENCY_URL).replyOnce(200,agenciaMockData)
                
        const wrapper = await mount(<AgenciaCamaraContent sessionId={1}/>);
  
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

    */
  });
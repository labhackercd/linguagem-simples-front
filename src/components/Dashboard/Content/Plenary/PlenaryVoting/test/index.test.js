import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import PlenaryVoting from '../index.js'
import {API_CD_ITENS_EM_VOTACAO,API_CD_ORIENTACAO_VOTACAO,API_CD_VOTACAO_ITEM} from '../../../../../../api_urls.js'


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

    test("Test PlenaryVoting content lifeclycle nominal vote server sucess", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;
      var votacaoId = 33389;
      // Mock List
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
      //Mock -> Votação Nominal
      var mock2 =   {
        "itemVotacao": {
          "ideItemVotacao": 33456,
          "ideReuniao": 59896,
          "titulo": "PL 6407/2013 - Req Ret Pauta - Requerimento para Retirada de Pauta ",
          "tituloReuniao": "Sessão Deliberativa Extraordinária (virtual)",
          "ideProposicao": 593065,
          "nomeRelator": null,
          "ideCadastroRelator": 0,
          "codTipoRelator": null,
          "ideCadastroPresidente": 74693,
          "nomeParlamentarPresidente": "Rodrigo Maia ",
          "indVagaPorPartido": true,
          "exibeResultadoFinal": 1,
          "exibeOrientacao": false,
          "dataAberturaRegistroVotacao": "01/09/2020 19:08:39",
          "dataFechamentoRegistroVotacao": "01/09/2020 19:11:07",
          "dataUltimaConsolidacaoVotacao": "01/09/2020 19:11:07",
          "dataUltimaAlteracaoVotacao": "01/09/2020 19:11:07",
          "nomeLocalVotacao": "Plenário da Câmara dos Deputados",
          "emExibicao": false,
          "siglaOrgao": "PLEN    ",
          "cancelado": false
        },
        "artigoVotoPresidente": "Art.17",
        "comissoes": [
          {
            "numOrdem": 1,
            "ideOrgao": 180,
            "siglaComissao": "PLEN    ",
            "representacoes": [
              {
                "bloco": {
                  "ideRepresentacaoPartidaria": 5235,
                  "nomRepresentacaoPartidaria": "PLEN"
                },
                "qtdVagas": 513,
                "partidos": [
                  {
                    "siglaPartido": "PLEN",
                    "qtdVagas": 513,
                    "parlamentares": [
                      {
                        "codTipoMembroComissao": "T",
                        "codTipoParlamentar": "D",
                        "ideCadastroParlamentar": 204554,
                        "nomParlamentarPainelEletronico": "Abílio Santana    ",
                        "bolRelator": false,
                        "sigPartidoPoliticoAtual": "PL",
                        "sigUfEleito": "BA",
                        "indVagaPorPartido": true,
                        "indContabilizarVoto": 0,
                        "dataPresenca": "01/09/2020 15:01:22.520",
                        "dataVoto": null,
                        "codTipoVoto": null,
                        "nomTipoVoto": null
                      },
                      {
                        "codTipoMembroComissao": "T",
                        "codTipoParlamentar": "D",
                        "ideCadastroParlamentar": 74044,
                        "nomParlamentarPainelEletronico": "Wilson Santiago   ",
                        "bolRelator": false,
                        "sigPartidoPoliticoAtual": "PTB",
                        "sigUfEleito": "PB",
                        "indVagaPorPartido": true,
                        "indContabilizarVoto": 1,
                        "dataPresenca": "01/09/2020 18:07:42.653",
                        "dataVoto": "01/09/2020 19:10:15.000",
                        "codTipoVoto": "N",
                        "nomTipoVoto": "Não"
                      },
                      {
                        "codTipoMembroComissao": "T",
                        "codTipoParlamentar": "D",
                        "ideCadastroParlamentar": 204463,
                        "nomParlamentarPainelEletronico": "WladimirGarotinho ",
                        "bolRelator": false,
                        "sigPartidoPoliticoAtual": "PSD",
                        "sigUfEleito": "RJ",
                        "indVagaPorPartido": true,
                        "indContabilizarVoto": 1,
                        "dataPresenca": "01/09/2020 14:55:48.073",
                        "dataVoto": "01/09/2020 19:09:39.000",
                        "codTipoVoto": "N",
                        "nomTipoVoto": "Não"
                      },
                      {
                        "codTipoMembroComissao": "T",
                        "codTipoParlamentar": "D",
                        "ideCadastroParlamentar": 160592,
                        "nomParlamentarPainelEletronico": "Zeca Dirceu       ",
                        "bolRelator": false,
                        "sigPartidoPoliticoAtual": "PT",
                        "sigUfEleito": "PR",
                        "indVagaPorPartido": true,
                        "indContabilizarVoto": 0,
                        "dataPresenca": "01/09/2020 18:08:04.247",
                        "dataVoto": null,
                        "codTipoVoto": null,
                        "nomTipoVoto": null
                      }
                    ]
                  }
                ]
              }
            ],
            "naoMembros": null
          }
        ],
        "qtdVotantes": 310,
        "qtdSim": 85,
        "qtdNao": 224,
        "qtdAbs": 0,
        "qtdPre": 1,
        "qtdObs": 0,
        "qtdQuorum": 310
      }

        await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).reply(200,mock1.data)
                          .onGet(API_CD_VOTACAO_ITEM+votacaoId).reply(200,mock2); 
                
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

    test("Test PlenaryVoting content lifeclycle orientation vote server sucess", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;
      var votacaoId = 33389;
      // Mock List
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
      //Mock -> Votação orientacao
      var mock2 =[
        {
          "ideItemVotacao": 33389,
          "numOrdemOrientacao": 1,
          "nomRepresentacaoPartidaria": "PT",
          "nomRepresentacaoPartidariaPainel": "PT",
          "codOrientacaoVotacao": "N",
          "nomOrientacaoVotacao": "Não",
          "nomOrientacaoVotacaoResumido": "Não"
        },
        {
          "ideItemVotacao": 33389,
          "numOrdemOrientacao": 2,
          "nomRepresentacaoPartidaria": "PSL",
          "nomRepresentacaoPartidariaPainel": "PSL",
          "codOrientacaoVotacao": "L",
          "nomOrientacaoVotacao": "Liberado",
          "nomOrientacaoVotacaoResumido": "Lib"
        },
      ];
      
      await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).reply(200,mock1.data)
                        .onGet(API_CD_VOTACAO_ITEM+votacaoId).reply(204)
                        .onGet(API_CD_ORIENTACAO_VOTACAO+votacaoId).replyOnce(200,mock2);             
      const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);

      setImmediate(() => {
        wrapper.update();
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).not.toBeTruthy();

        const selectField = wrapper.find("#votation-list-item-slect");
        //console.log(selectField.debug());
        wrapper.find('select').simulate('change',{target: { value : '33389'}});
        
        setImmediate(() => {
          wrapper.update();
          mockInstance.restore();
          done();
        })
      })
    });

    test("Test PlenaryVoting content lifeclycle orientation vote server error", async (done) => {
      var mockInstance = new MockAdapter(axios);
      var sessionIdDadosAbertos = 1;
      var votacaoId = 33389;
      // Mock List
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

      await mockInstance.onGet(API_CD_ITENS_EM_VOTACAO+sessionIdDadosAbertos).reply(200,mock1.data)
                        .onGet(API_CD_VOTACAO_ITEM+votacaoId).reply(204)
                        .onGet(API_CD_ORIENTACAO_VOTACAO+votacaoId).replyOnce(404);             
      const wrapper = await mount(<PlenaryVoting sessionIdDadosAbertos={1}/>);

      setImmediate(() => {
        wrapper.update();
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).not.toBeTruthy();

        const selectField = wrapper.find("#votation-list-item-slect");
        //console.log(selectField.debug());
        wrapper.find('select').simulate('change',{target: { value : '33389'}});
        
        setImmediate(() => {
          wrapper.update();
          mockInstance.restore();
          done();
        })
      })
    });

  });
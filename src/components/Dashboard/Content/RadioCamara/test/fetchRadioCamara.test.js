import axiosInstance from '../../../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"

import {API_RADIO_CAMARA_URL} from '../../../../../api_urls'

import fetchRadioCamara from '../fetchRadioCamara'


describe('Test Fetch Radio Camara function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);
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

    test("Test if FetchData returns data when it has worked correct", async (done) => {
        var data = null;
        
        mock.onGet(API_RADIO_CAMARA_URL).replyOnce(200,radioMockData);

        data = await fetchRadioCamara();
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();

        done()
    });

    test("Test if FetchData returns null when it has not worked correct", async (done) => {
        var data = null;
        
        mock.onGet(API_RADIO_CAMARA_URL).replyOnce(201,{});

        data = await fetchRadioCamara();
        expect(data).toBeNull();

        done()
    });

    afterAll(() => {
        mock.restore();
    });
});

  
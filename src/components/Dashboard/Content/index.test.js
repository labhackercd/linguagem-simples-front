import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './index';
import {shallow} from "enzyme/build";
import Youtube from './youtubeTransmission'
import ExternalContentPanel from './externalContentPanel'
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axios from 'axios'
import axiosInstance from './../../../auth/axiosApi'

it("should render the content section", () => {
    const component = shallow(<ExternalContentPanel/>);
    expect(component).toMatchSnapshot();
});

it("should render the external content section", () => {
    const component = shallow(<Content/>);
    expect(component).toMatchSnapshot();
});

it("should return iframe of youtube content section", () => {
    const sessionID = 1;
    const youtubeVideo = Youtube(sessionID);
    expect(youtubeVideo.props.className).toBe("video")
});


/*
describe('Testing lifeclycle ', () => {
    var data = null; 
    var mockAxios = new MockAdapter(axios);
    var mockInstance = new MockAdapter(axiosInstance);
    const dados = {
        "dados": [
          {
            "id": 59895,
            "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/59895",
            "dataHoraInicio": "2020-09-01T11:00",
            "dataHoraFim": "2020-09-01T14:30",
            "situacao": "Encerrada",
            "descricaoTipo": "Sessão Deliberativa",
            "descricao": "Sessão Deliberativa Extraordinária (virtual)",
            "localExterno": null,
            "orgaos": [
              {
                "id": 180,
                "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/180",
                "sigla": "PLEN",
                "nome": "Plenário",
                "apelido": "Plenário",
                "codTipoOrgao": 26,
                "tipoOrgao": "Plenário Virtual"
              }
            ],
            "localCamara": {
              "nome": "Plenário da Câmara dos Deputados",
              "predio": null,
              "sala": null,
              "andar": null
            }
          }
        ],
        "links": [
          {
            "rel": "self",
            "href": "https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=2020-09-01&dataFim=2020-09-01&ordem=ASC&ordenarPor=dataHoraInicio"
          }
        ]
    }
    const sessionInfo = {
        "id": 1,
        "author": {
          "id": 1,
          "is_superuser": true,
          "username": "jpnsoares",
          "first_name": "",
          "last_name": "",
          "email": "jpnsoares@email.com",
          "profile": "editor"
        },
        "location": "plenary",
        "date": "2020-09-01",
        "type_session": "virtual",
        "situation_session": "pre_session",
        "resume": "string",
        "enable": true,
        "id_session_dados_abertos": ""
      }
    
    test("Test sync lifeclycle", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const date = '2020-09-01'
        const url =  "https://dadosabertos.camara.leg.br/api/v2/eventos?codTipoEvento=110&dataInicio="+date+"&dataFim="+date+"&ordem=ASC&ordenarPor=dataHoraInicio";

        await mockAxios.onGet(url).reply(200,{dados})
                
        await mockInstance.onPatch("/sessions/1/").reply(200,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                username: "jpnsoares",
                first_name: "",
                last_name: "",
                email: "jpnsoares@email.com",
                profile: "editor"
            },
            location: "plenary",
            date: "2020-09-02",
            type_session: "virtual",
            situation_session: "pre_session",
            resume: "string",
            enable: true,
            id_session_dados_abertos: "59895"
        });
        

        const  wrapper = mount(<Content sessionID={1} sessionInfo={sessionInfo}/>);
        const button = wrapper.find("button").at(0);
        button.simulate('click')

    });

    afterAll(() => {
        mockAxios.restore();
    });


});*/
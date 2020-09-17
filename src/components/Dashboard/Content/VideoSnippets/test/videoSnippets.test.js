import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import VideoSnippets from '../videoSnippets'
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import SnippetCard from '../videoSnippetCard'
import {API_VIDEOS_SNIPPETS} from '../../../../../api_urls'
import axiosInstance from '../../../../../auth/axiosApi'

  
describe('Testing VideoSnippet Component', () => {
    const mockSessionId = 1;
    const mockSessionInfoPreSessionStatus ={
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
        "resume": "",
        "enable": true,
        "id_session_dados_abertos": "59895"
    }
    const mockSessionInfoStartedSessionStatus ={
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
        "situation_session": "started_session",
        "resume": "",
        "enable": true,
        "id_session_dados_abertos": "59895"
    }

    test("Should render the VideoSnippets section and match snapshot", async (done) => {
        const component = mount(<VideoSnippets sessionId={mockSessionId} sessionInfo={mockSessionInfoPreSessionStatus}></VideoSnippets>);

        expect(component.exists()).toEqual(true);
        expect(component).toMatchSnapshot();
        done();
    });
   
    test("Should render pre session div information when session status is PRE_SESSION", async (done) => {
        const component = mount(<VideoSnippets sessionId={mockSessionId} sessionInfo={mockSessionInfoPreSessionStatus}></VideoSnippets>);
        expect(component.text()).toMatch(/A transmissão/i)
        done();
    });
   
    test("Should render CircularProgress when session status is not pre session and data is been loading", async (done) => {
        const component = await mount(<VideoSnippets sessionId={mockSessionId} sessionInfo={mockSessionInfoStartedSessionStatus}></VideoSnippets>);
        setImmediate(() => {
            component.update();
            //console.log(component.debug())
            const containsSpinner = component.containsMatchingElement(<CircularProgress />);
            expect(containsSpinner).toBeTruthy()
            done();
         })
    });
     
    test("Should return error", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        var mockResponse = {
            "data": [
              {
                "url": "https://www.camara.leg.br/evento-legislativo/59895/sessao/523297/video-trecho/1598981385760",
                "author": "Deputado Y",
                "legend": "Deputado PL-RJ",
                "schedule": "horário - 14h29'45",
                "duration": "duração - 00:01:42",
                "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/178946.jpg"
              },
              {
                "url": "https://www.camara.leg.br/evento-legislativo/59895/sessao/523297/video-trecho/1598981381640",
                "author": "Deputado  X",
                "legend": "Deputado PL-RJ",
                "schedule": "horário - 14h29'41",
                "duration": "duração - 00:00:24",
                "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/178946.jpg"
              },
            ],
            "status": 200,
            "statusText": "OK",
            "headers": {
              "content-length": "47681",
              "content-type": "application/json"
            },
            "config": {
              "url": "/videos-session/59895",
              "method": "get",
              "headers": {
                "Accept": "application/json",
                "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwMzcwMjk4LCJqdGkiOiI0ODNiNjA5NDgzMzk0MTcwYjVlY2I3OTBiNTM2ZDI2YiIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.oviGcjwER71YKCL0siWx5O00P87qNxKzoT8DA9XJjAQ"
              },
              "baseURL": "https://acompanhe.camara.leg.br/server/api/",
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

        await mock.onGet(API_VIDEOS_SNIPPETS+mockSessionInfoStartedSessionStatus.id_session_dados_abertos).reply(404,mockResponse);
        const component = await mount(<VideoSnippets sessionId={mockSessionId} sessionInfo={mockSessionInfoStartedSessionStatus}></VideoSnippets>);
      
        setImmediate(() => {
            expect(component.text()).toMatch(/Erro/i)
            mock.restore();
            done();
         })
    });
    
    test("Should render cards when session status is not pre session and data has been loaded", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        var mockResponse = {
            "data": [
              {
                "url": "https://www.camara.leg.br/evento-legislativo/59895/sessao/523297/video-trecho/1598981385760",
                "author": "Deputado Y",
                "legend": "Deputado PL-RJ",
                "schedule": "horário - 14h29'45",
                "duration": "duração - 00:01:42",
                "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/178946.jpg"
              },
              {
                "url": "https://www.camara.leg.br/evento-legislativo/59895/sessao/523297/video-trecho/1598981381640",
                "author": "Deputado  X",
                "legend": "Deputado PL-RJ",
                "schedule": "horário - 14h29'41",
                "duration": "duração - 00:00:24",
                "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/178946.jpg"
              },
            ],
            "status": 200,
            "statusText": "OK",
            "headers": {
              "content-length": "47681",
              "content-type": "application/json"
            },
            "config": {
              "url": "/videos-session/59895",
              "method": "get",
              "headers": {
                "Accept": "application/json",
                "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwMzcwMjk4LCJqdGkiOiI0ODNiNjA5NDgzMzk0MTcwYjVlY2I3OTBiNTM2ZDI2YiIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.oviGcjwER71YKCL0siWx5O00P87qNxKzoT8DA9XJjAQ"
              },
              "baseURL": "https://acompanhe.camara.leg.br/server/api/",
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

        await mock.onGet(API_VIDEOS_SNIPPETS+mockSessionInfoStartedSessionStatus.id_session_dados_abertos).reply(200,mockResponse);
        const component = await mount(<VideoSnippets sessionId={mockSessionId} sessionInfo={mockSessionInfoStartedSessionStatus}></VideoSnippets>);

        setImmediate(() => {
            component.update();
            //console.log(component.debug())
            const containsSpinner = component.containsMatchingElement(<CircularProgress />);
            expect(containsSpinner).not.toBeTruthy();
            
            //const searchField = component.find("input").at(0);
            
            //console.log(searchField.debug());
            //searchField.instance().value = "x";
            //component.update();
            //searchField.simulate("change");
            mock.restore();
            done();
         })
    });
});

describe('Testing VideoSnippetCard Component', () => {

    const mockedData={
        "url": "https://www.camara.leg.br/evento-legislativo/59733/sessao/523169/video-trecho/1594234640207",
        "author": "Arthur Oliveira Maia",
        "legend": "Deputado DEM-BA",
        "schedule": "horário - 15h57'20",
        "duration": "duração - 00:02:04",
        "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/160600.jpg"
    }

    it("should render the Card component and match snapshot ", () => {
        
        const component = shallow(<SnippetCard data={mockedData}/>);

        expect(component.exists()).toEqual(true);
        expect(component).toMatchSnapshot();
        
    });
    
    test("Test Card handleOpen and handleClose", () => {
        
        
        const component =  mount(<SnippetCard data={mockedData}/>);

        //console.log(component.debug())
        const button = component.find("#openModal").at(0);
        //console.log(button.debug())
        button.simulate('click')
        component.update();
        //console.log(component.debug())
        const closeButton = component.find("#closeVideoSnippetModal").at(0)
        closeButton.simulate('click')

    });
    /*
        test("Test Card handleOpen and handleClose", async(done) => {
        var mock = new MockAdapter(axiosInstance);
        
        await mock.onPost('/file-video/').replyOnce(200,"www.video.com");   
        const component = await mount(<SnippetCard data={mockedData}/>);


        setImmediate(() => {
            component.update();
            //console.log(component.debug())
            const button = component.find("#openModal").at(0);
            //console.log(button.debug())
            button.simulate('click')
            component.update();
            //console.log(component.debug())
            const closeButton = component.find("#closeVideoSnippetModal").at(0)
            closeButton.simulate('click')
            mock.restore();
            done();
        });

    });*/
  
  });
  

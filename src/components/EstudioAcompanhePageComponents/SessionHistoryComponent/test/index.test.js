import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from '../../../../auth/axiosApi'

import CircularProgress from '@material-ui/core/CircularProgress';
import SessionHistoryComponent from '../index.js'
import {API_SESSIONS_URL_NOT_LIVE, API_SESSIONS_CURRENT_LIVE_URL} from '../../../../api_urls'


it("should render the SessionHistoryComponent component and match snapshot", () => {
    const component = mount(<SessionHistoryComponent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});


describe('Testing lifeclycle of SessionHistoryComponent content', () => {
   
  test("Test SessionHistoryComponent content lifeclycle when data is not already loaded", async (done) => {
                 
      const wrapper = await mount(<SessionHistoryComponent/>);

      setImmediate(() => {
        wrapper.update();
        //console.log(wrapper.debug())
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).toBeTruthy()
        done();
     })

  });
 
  test("Test SessionHistoryComponent content lifeclycle with full data been loaded", async (done) => {
    var mockInstance = new MockAdapter(axiosInstance);
    const currentLiveSessions = [
        {
          "id": 1,
          "author": {
            "id": 1,
            "is_superuser": true,
            "username": "admin",
            "first_name": "",
            "last_name": "",
            "email": "a@a.com",
            "profile": "editor"
          },
          "location": "plenary",
          "date": "2020-09-24",
          "type_session": "virtual",
          "situation_session": "pre_session",
          "resume": "Resumo",
          "enable": true,
          "id_session_dados_abertos": null
        }
      ];
    const currentNotLiveSessions = [
        {
          "id": 2,
          "author": {
            "id": 1,
            "is_superuser": true,
            "username": "admin",
            "first_name": "",
            "last_name": "",
            "email": "a@a.com",
            "profile": "editor"
          },
          "location": "plenary",
          "date": "2020-09-24",
          "type_session": "virtual",
          "situation_session": "pre_session",
          "resume": "",
          "enable": false,
          "id_session_dados_abertos": null
        }
    ];

    await mockInstance.onGet(API_SESSIONS_URL_NOT_LIVE).reply(200,currentNotLiveSessions).onGet(API_SESSIONS_CURRENT_LIVE_URL).reply(200,currentLiveSessions)
    const wrapper = await mount(<SessionHistoryComponent/>);

    setImmediate(() => {
      wrapper.update();
      //console.log(wrapper.debug())
      const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
      expect(containsSpinner).not.toBeTruthy()

      //console.log(wrapper.debug())
      done();
   })

  });

  test("Test SessionHistoryComponent content lifeclycle error", async (done) => {
    var mockInstance = new MockAdapter(axiosInstance);

    await mockInstance.onGet(API_SESSIONS_URL_NOT_LIVE).reply(400)
    const wrapper = await mount(<SessionHistoryComponent/>);

    setImmediate(() => {
        wrapper.update();
        done();
     })
   
  });
  
});
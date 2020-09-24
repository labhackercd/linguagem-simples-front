import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import PlenaryAttendance from '../index.js'
import axios from 'axios'
import {API_CD_PRESENCA_VOTACAO_PLENARIO} from '../../../../../../api_urls'
import {mockPresenceList} from './assets/mockdata'

it("should render the PlenaryAttendance section and match snapshot", () => {
    const component = mount(<PlenaryAttendance sessionIdDadosAbertos={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

describe('Testing lifeclycle of PlenaryAttendance content', () => {
   
    test("Test PlenaryAttendance content lifeclycle when data is not loaded", async (done) => {
                   
        const wrapper = await mount(<PlenaryAttendance sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          //console.log(wrapper.debug())
          const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
          expect(containsSpinner).toBeTruthy()
          done();
       })
  
    });
   
    test("Test PlenaryAttendance content lifeclycle with data been loaded", async (done) => {
      var mockInstance = new MockAdapter(axios);

        
        await mockInstance.onGet(API_CD_PRESENCA_VOTACAO_PLENARIO).replyOnce(200,mockPresenceList)
                
        const wrapper = await mount(<PlenaryAttendance sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          //console.log(wrapper.debug())
          const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
          expect(containsSpinner).not.toBeTruthy();
          const selectField = wrapper.find("#attendance-type-item-slect");
          //console.log(selectField.debug());
          wrapper.find('select').simulate('change',{target: { value : 1}});
          wrapper.update();
         
          mockInstance.restore();
          done();
       })
  
    });

    test("Test PlenaryAttendance content lifeclycle error", async (done) => {
      var mockInstance = new MockAdapter(axios);

        
        await mockInstance.onGet(API_CD_PRESENCA_VOTACAO_PLENARIO).replyOnce(404)
                
        const wrapper = await mount(<PlenaryAttendance sessionIdDadosAbertos={1}/>);
  
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.text()).toMatch(/Erro/i)
          mockInstance.restore();
          done();
       })
    });
    
  });
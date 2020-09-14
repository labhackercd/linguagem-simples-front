
import React from 'react';
import {shallow} from "enzyme/build";


import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from './../../../../auth/axiosApi'
import CircularProgress from '@material-ui/core/CircularProgress';

import SavedContent from './savedContent'

it("Should render the SavedContentComponent", () => {
    const component = shallow(<SavedContent sessionId={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});




describe('Testing lifeclycle of SavedContentComponent content', () => {
    const savedContentMockData = [
        {
          "id": 2,
          "created": "2020-09-03T14:25:35.161495-03:00",
          "content_type": "news",
          "title": "Especialistas criticam permissão para rede social pedir documento de identidade do usuário",
          "url": "http://www.camara.leg.br/noticias/619950-ESPECIALISTAS-CRITICAM-PERMISSAO-PARA-REDE-SOCIAL-PEDIR-DOCUMENTO-DE-IDENTIDADE-DO-USUARIO",
          "session": 1
        },
        {
          "id": 3,
          "created": "2020-09-03T14:59:36.657775-03:00",
          "content_type": "tv",
          "title": "TV Câmara ",
          "url": "http://www.camara.leg.br/radio/radioagencia/560001-SINAL-DA-RADIO-CAMARA-CHEGA-A-MANAUS",
          "session": 1
        },
        {
          "id": 4,
          "created": "2020-09-03T15:14:03.465319-03:00",
          "content_type": "radio",
          "title": "Sinal da Rádio Câmara chega a Manaus",
          "url": "http://www.camara.leg.br/radio/radioagencia/560001-SINAL-DA-RADIO-CAMARA-CHEGA-A-MANAUS",
          "session": 1
        },
        {
            "id": 5,
            "created": "2020-09-03T15:14:03.465319-03:00",
            "content_type": "",
            "title": "Null item for test",
            "url": "http://www.camara.leg.br/null",
            "session": 1
        }
    ]

    test("Test when data is not loaded if spin is in the screen", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const dashboardSessionId = 1;
          
        const  wrapper = shallow(<SavedContent sessionId={dashboardSessionId}/>);
        const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        expect(containsSpinner).toBeTruthy()
        
        //const button = wrapper.find("#saveButtonRadio560001").at(0);
        //console.log(button.debug())
        //button.simulate('click')
        done();
    });

    test("Test when data is loaded if spin is not at the screen", async (done) => {
        // Return a fixed timestamp when moment().format() is called
        const dashboardSessionId = 1;
        var mockInstance = new MockAdapter(axiosInstance);
        await mockInstance.onGet('saved-contents/?session__id=1').reply(200,savedContentMockData)
          
        const wrapper = mount(<SavedContent sessionId={dashboardSessionId}/>);
        

        setImmediate(() => {
            wrapper.update();
            //console.log(wrapper.debug())
            const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
            expect(containsSpinner).not.toBeTruthy()
            done();
        })


        //const containsSpinner = wrapper.containsMatchingElement(<CircularProgress />);
        //expect(containsSpinner).toBeTruthy()
        //const button = wrapper.find("#saveButtonRadio560001").at(0);
        //console.log(button.debug())
        //button.simulate('click')
        //done();
    });

    afterAll(() => {
       // mockInstance.restore();
    });


});
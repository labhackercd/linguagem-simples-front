import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import AgenciaCamaraContent from './agenciaCamara'
import NewsCard from './newsCard'
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from './../../../../auth/axiosApi'


it("should render the AgenciaCamaraContent section and match snapshot", () => {
    const component = shallow(<AgenciaCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});


it("should render the NewsCard component and match snapshot ", () => {
    var mockedPropsdata={
      info: {
        retrancas: [ 'Consumidor' ],
        id: 619693,
        veiculo: 'agencia',
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
    const component = shallow(<NewsCard info={mockedPropsdata} sessionId={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

describe('Testing lifeclycle ', () => {
    var mockedResponseData = {
        "id": 1,
        "created": "2020-09-03T14:19:23.017327-03:00",
        "content_type": "news",
        "title": "Teste",
        "url": "https://www.camara.leg.br/",
        "session": 1
      }
    var mockInstance = new MockAdapter(axiosInstance);
    
    test("Test save content lifeclycle", async (done) => {
        // Return a fixed timestamp when moment().format() is called

        await mockInstance.onPost('/saved-contents/').reply(201,{mockedResponseData})
                
        const  wrapper = mount(<AgenciaCamaraContent />);
        const button = wrapper.find("#saveButton619950").at(0);
        //console.log(button.debug())
        button.simulate('click')

        done();
    });

    afterAll(() => {
        mockInstance.restore();
    });


});
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
        
        const component = mount(<SnippetCard data={mockedData}/>);

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

  });
  
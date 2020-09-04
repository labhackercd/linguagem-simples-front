import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import VideoSnippetModal from './videoSnippetModal'
import axiosInstance from '../../../../../auth/axiosApi'
import ReactDOM from 'react-dom'
import { mount} from 'enzyme';
import { act } from 'react-dom/test-utils';

import MockAdapter from "axios-mock-adapter"



describe('Test VideoSnippetModal lifeclycle requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);
    var propsData ={
            url: "https://www.camara.leg.br/evento-legislativo/59733/sessao/523169/video-trecho/1594253421513",
            author: "Evair Vieira de Melo",
            legend: "Deputado PP-ES",
            schedule: "horário - 21h10'21",
            duration: "duração - 00:01:37",
            thumbnail: "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/178871.jpg"
      }
      var open= true;
      const handleClose = (value) => {
        //nothing
      };

    test("Test if VideoSnippetModal work properly", async (done) => {

        mock.onPost('/file-video/').replyOnce(200,"www.video.com");
        
        var wrapper = mount(<VideoSnippetModal open={open} onClose={handleClose} data={propsData} />);
       

        setImmediate(() => {
            const video = wrapper.find("#snippetVideo");

            expect(video.exists()).toEqual(true);
            const button = wrapper.find("button").at(0);
            button.simulate('click')
            done();
        })

    });


    afterAll(() => {
        mock.restore();
    });
});


import MockAdapter from "axios-mock-adapter"
import fetchPlenaryAttendance from '../fetchPlenaryAttendance.js'
import {API_CD_PRESENCA_VOTACAO_PLENARIO} from '../../../../../../api_urls'
import axios from 'axios'

describe('Test fetchPlenaryAttendance fetch data ', () => {
    var data = null; 
    var sessionIdDadosAbertos=1;
    
    var votacaoId=1;
    const dados = [
        {
          "Simulate data":"Simulate data"
        }
      ]
    
    test("Testing when it works", async (done) => {
        var mockAxios = new MockAdapter(axios);
        // Return a fixed timestamp when moment().format() is called
        const url = API_CD_PRESENCA_VOTACAO_PLENARIO+sessionIdDadosAbertos;

        await mockAxios.onGet(url).replyOnce(200,dados);

        data = await fetchPlenaryAttendance(sessionIdDadosAbertos)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mockAxios.restore();
        done()
    });

});



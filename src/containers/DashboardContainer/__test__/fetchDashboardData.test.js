import { fetchData, changeBroadcastingStatus } from "./../APIHandler";
import moxios from 'moxios'
import axiosInstance from './../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {API_SESSIONS_URL} from '../../../api_urls'


  describe('Test Dashboard FetchData function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);

    test("Test if FetchData Dashboard function gets correct data with non existant", async (done) => {
        var data = null;
        const dashboarId = 1;

        mock.onGet(API_SESSIONS_URL+dashboarId+"/").replyOnce(200,{
            info: "Teste response data"
        });

        data = await fetchData(dashboarId);
        //console.log(data)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data.status).toEqual(200);
        done()

    });

    test("Test if changeBroadcastingStatus Dashboard function works with correct information", async (done) => {
        var data = null;
        const dashboarInfo = {id: 1}

        mock.onPatch(API_SESSIONS_URL+dashboarInfo.id+"/").replyOnce(200,{
            info: "Teste response data"
        });

        data = await changeBroadcastingStatus(dashboarInfo, true);
        //console.log(data)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data.status).toEqual(200);
        done()
    });

    test("Test if changeBroadcastingStatus Dashboard function works with correct information", async (done) => {
      var data = null;
      const dashboarInfo = {id: 1}

      mock.onPatch(API_SESSIONS_URL+dashboarInfo.id+"/").replyOnce(404,{
          info: "Teste response data"
      });

      data = await changeBroadcastingStatus(dashboarInfo, true);
    
      done()
  });

});

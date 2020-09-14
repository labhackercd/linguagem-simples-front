import fetchData from "./../fetchData";
import moxios from 'moxios'
import axiosInstance from './../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"


describe('Test FetchData function requisitions', () => {
    beforeEach(function () {
    //console.log("install")
      // Passing custom axios instance to be mocked
      moxios.install(axiosInstance)
    })

    afterEach(() => {
        //console.log("unistall")
        moxios.uninstall(axiosInstance);
    })

    test("Test if FetchData Dashboard function gets correct data with status 200", async (done) => {
      var data = null;
      const dashboarId = 1;

       try{
        moxios.stubRequest("/sessions/"+dashboarId+"/", {
            status: 200,
            response: "oi"
        })

        data = await fetchData(dashboarId);
        //console.log(moxios.requests)
       }catch(e){
        // Nothing to do
       }
       moxios.wait(function() {
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data.status).toEqual(200);
        done()
      })

    });
  });


  describe('Test FetchData function requisitions with mock adapter 2', () => {
    var mock = new MockAdapter(axiosInstance);

    test("Test if FetchData Dashboard function gets correct data with non exis 200 2", async (done) => {
        var data = null;
        const dashboarId = 1;

        mock.onGet("/sessions/"+dashboarId+"/").replyOnce(200,{
            info: "Teste response data"
        });


        data = await fetchData(dashboarId);
        //console.log(data)
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data.status).toEqual(200);
        done()

       done()
    });
});

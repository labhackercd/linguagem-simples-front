import fetchData from "./../fetchData";
import axiosInstance from './../../../../auth/axiosApi'
import moxios from 'moxios'
import{responseData} from './requestData'


describe('Test FetchData function requisitions', () => {
  beforeEach(function () {
    // Passing custom axios instance to be mocked
    moxios.install(axiosInstance)
  })

  afterEach(function () {
    // Passing custom axios instance to be unmocked
    moxios.uninstall(axiosInstance)
  })

  it("Test if FetchData function gets correct data with status 200", async () => {
    var data = null;
     
     try{
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: responseData
        })
      })
      data = await fetchData();   
     }catch(e){
      // Nothing to do
     }

     expect(data).not.toBeNull();
     expect(data).not.toBeUndefined();
     expect(data.data).toHaveLength(6)
     expect(data.status).toEqual(200);

  });

  it("Test if FetchData function return null data response for status != 200", async () => {
    var data = null;
     
     try{
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: null
        })
      })

      data = await fetchData();   
     }catch(e){
      // Nothing to do
     }

     expect(data).toBeNull();

  });

  it("Test if FetchData function return null data response for status != 200", async () => {
    var data = null;
     
     try{
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: null
        })
      })

      data = await fetchData();   
     }catch(e){
      // Nothing to do
     }

     expect(data).toBeNull();

  });

});


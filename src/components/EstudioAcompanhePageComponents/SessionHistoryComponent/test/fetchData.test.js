import {fetchData,fetchCurrentSessionsData} from "../fetchData";
import axiosInstance from '../../../../auth/axiosApi'
import{responseData} from './requestData'
import MockAdapter from "axios-mock-adapter"
import {API_SESSIONS_URL_NOT_LIVE, API_SESSIONS_CURRENT_LIVE_URL} from '../../../../api_urls'


describe('Test FetchData function requisitions', () => {
  var mockInstance = new MockAdapter(axiosInstance);
      
  test("Test if FetchData function gets correct data with status 200", async (done) => {
    // Return a fixed timestamp when moment().format() is called

    await mockInstance.onGet(API_SESSIONS_URL_NOT_LIVE).reply(200,responseData)
            
    var data = await fetchData();   

    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
    expect(data.data).toHaveLength(6)
    expect(data.status).toEqual(200);

    done();
});


  it("Test if FetchData function return null data response for status != 200", async (done) => {
     
    await mockInstance.onGet(API_SESSIONS_URL_NOT_LIVE).reply(201)
            
    var data = await fetchData();  

    expect(data).toBeNull();
    done();

  });
  afterAll(() => {
    mockInstance.restore();
});


});


describe('Test fetchCurrentSessionsData function requisitions', () => {
      
  test("Test if fetchCurrentSessionsData function gets correct data with status 200", async (done) => {
    // Return a fixed timestamp when moment().format() is called
    var mockInstance = new MockAdapter(axiosInstance);
    const mockData = [{
      "id": 2,
      "created": "2020-08-05T15:43:19.753797-03:00",
      "modified": "2020-08-06T13:09:25.829329-03:00",
      "location": "plenary",
      "date": "2020-08-06",
      "type_session": "virtual",
      "situation_session": "started_session",
      "resume": "Resumo"
      }];
    
      await mockInstance.onGet(API_SESSIONS_CURRENT_LIVE_URL).reply(200,mockData)
        
      var data = await fetchCurrentSessionsData();   

      expect(data).not.toBeNull();
      expect(data).not.toBeUndefined();
      
      mockInstance.restore();
      done();
  });

  test("Test if fetchCurrentSessionsData function returns null when no data available", async (done) => {
    // Return a fixed timestamp when moment().format() is called
    var mockInstance = new MockAdapter(axiosInstance);
    const mockData = [];
  
    await mockInstance.onGet(API_SESSIONS_CURRENT_LIVE_URL).reply(200,mockData)
      
    var data = await fetchCurrentSessionsData();   

    expect(data).toBeNull();
    expect(data).not.toBeUndefined();
    
    mockInstance.restore();
    done();
  });

});


import axiosInstance from '../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"

import {TOKEN_OBTAIN_URL, TOKEN_VERIFY_URL} from '../../../api_urls'
import {sendLoginRequest, verifyUserToken} from '../sendLoginRequest'


describe('Test login requisitions', () => {
    
    const responseMockData = {
        "data": {
          "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwMTkyMTQ5MywianRpIjoiMjEyOTE1ZWIyZTlkNGI0NWE5NTA1ZDMzZTU3NDBiNTkiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0.BsVvs0mogk8Tck4tjKdN9K8HlLyrSbA7X4dtCNp6X0g",
          "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwNzEzNjkzLCJqdGkiOiI1MTNhNzZkODgwZGI0ZmY3OWYwZmY1ZjBmNTYxNDYwNyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.jriLRjtIUA5H5r2zhORlh_5C8ONwh6XnbxkV_I0VfNE"
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
          "content-length": "489",
          "content-type": "application/json"
        },
        "config": {
          "url": "/token/obtain/",
          "method": "post",
          "data": "{\"email\":\"admin\",\"password\":\"labhacker16\"}",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwNzEzNjI1LCJqdGkiOiIxMGU3ZGJiNmFiYjE0ODA0ODNkMDUzOGQyYzFjZjI4NSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.NfuIAubQ3lhNfQm05nvVObVZ67ztsnCap_SoKNsPN14"
          },
          "baseURL": "https://acompanhe.camara.leg.br/server/api/",
          "transformRequest": [
            null
          ],
          "transformResponse": [
            null
          ],
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1
        },
        "request": {}
      }

    test("Test if Login returns 200 when it has worked correct", async (done) => {
        var data = null;
        var mock = new MockAdapter(axiosInstance);
        mock.onPost(TOKEN_OBTAIN_URL).replyOnce(200,responseMockData);

        data = await sendLoginRequest("user","123456");
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mock.restore();
        done()
    });

});

describe('Test verifyToken requisitions', () => {
    
  test("Test if Verify token returns 200 when it has worked correct", async (done) => {
      var data = null;
      var mock = new MockAdapter(axiosInstance);
      mock.onPost(TOKEN_VERIFY_URL).replyOnce(201);

      data = await verifyUserToken("123456");
      mock.restore();
      done();
  });

});

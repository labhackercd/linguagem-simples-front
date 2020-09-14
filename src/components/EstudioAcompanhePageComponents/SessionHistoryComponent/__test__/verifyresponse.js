export const responseVerify = {
    "data": {},
    "status": 200,
    "statusText": "OK",
    "headers": {
      "content-length": "2",
      "content-type": "application/json"
    },
    "config": {
      "url": "/token/verify/",
      "method": "post",
      "data": "{\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjQwNjMyLCJqdGkiOiI5MzQ1OTAwZGE1YmU0NWRlYTc4OGVkMzQ4NjEyYjM3NCIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.l4VsCk4tNAaJgVVIzdtDIiFOM8MAol-x--oJ19SrpXI\"}",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjQwNjMyLCJqdGkiOiI5MzQ1OTAwZGE1YmU0NWRlYTc4OGVkMzQ4NjEyYjM3NCIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.l4VsCk4tNAaJgVVIzdtDIiFOM8MAol-x--oJ19SrpXI"
      },
      "baseURL": "http://localhost:8000/api/",
      "transformRequest": [
        null
      ],
      "transformResponse": [
        null
      ],
      "timeout": 5000,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1
    },
    "request": {}
  }
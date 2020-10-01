import axiosInstance from '../../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"

import {API_SAVED_CONTENTS_URL} from '../../../../api_urls'
import {postSaveContent, deleteSavedContent} from './postSaveContent'

describe('Test postSaveContent function requisitions with mock adapter', () => {

    test("Test if postSaveContent returns true when it has worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const dashboarId = 1;
        var response = null;
        const content_type = "news";
        const content_info = {
            title:"Title",
            url:"www.teste.com.br"
        }
        
        mock.onPost("/saved-contents/").replyOnce(201,{
            content_type: "news",
            title: "Titulo Teste",
            url: "www.teste.com.br",
            session: 1
        });


        response = await postSaveContent(content_type,content_info,dashboarId);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
        expect(response).toBeTruthy();
        mock.restore();
        done();
    });

    test("Test if postSaveContent returns false when it has not worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const dashboarId = 1;
        var response = null;
        const content_type = "news";
        const content_info = {
            title:"Title",
            url:"www.teste.com.br"
        }
        
        mock.onPost("/saved-contents/").replyOnce(400,{
            "url": [
                "Entrar um URL válido."
              ]
        });

        response = await postSaveContent(content_type,content_info,dashboarId);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
        expect(response).not.toBeTruthy()
        done()
    });

    test("Test if postSaveContent returns false when it has not worked correct and status != 201", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const dashboarId = 1;
        var response = null;
        const content_type = "news";
        const content_info = {
            title:"Title",
            url:"www.teste.com.br"
        }
        
        mock.onPost("/saved-contents/").replyOnce(202,{
            "url": [
                "Entrar um URL válido."
              ]
        });

        response = await postSaveContent(content_type,content_info,dashboarId);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
        expect(response).not.toBeTruthy();
        mock.restore();
        done()
    });

});


describe('Test deleteSavedContent function requisitions with mock adapter', () => {

    test("Test if deleteSavedContent returns true when it has worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const contentId = 1;
        var response = null;
      
        mock.onDelete("/saved-contents/"+contentId).replyOnce(204);

        response = await deleteSavedContent(contentId);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
        expect(response).toBeTruthy();
        mock.restore();
        done()
    });

    test("Test if deleteSavedContent returns false when it has not worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const contentId = 1;
        var response = null;

        mock.onDelete("/saved-contents/"+contentId).replyOnce(400);

        response = await deleteSavedContent(contentId);
        expect(response).not.toBeUndefined();
        expect(response).not.toBeTruthy();
        mock.restore();
        done()
    });

    test("Test if deleteSavedContent returns false when it has not worked correct and status != 201", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const contentId = 1;
        var response = null;

        mock.onDelete("/saved-contents/"+contentId).replyOnce(202);

        response = await deleteSavedContent(contentId);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
        expect(response).not.toBeTruthy();
        mock.restore();
        done()
    });

});
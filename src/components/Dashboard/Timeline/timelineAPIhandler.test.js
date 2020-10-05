import moxios from 'moxios'
import axiosInstance from './../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {fetchFeedUpdates, deletePostFromFeed, submitSummaryContent} from './timelineAPIhandler'
import moment from 'moment'
import axios from 'axios'
import {API_PUBLICATIONS_URL, API_SESSIONS_URL} from './../../../api_urls'

describe('Test fetchFeedUpdates function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);
    var data = null;
    test("Test if fetchFeedUpdates returns feed objects correctly", async (done) => {
        const sessionID = 1;

        mock.onGet("/publications/?session__id="+sessionID).replyOnce(200,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                email: "teomoura",
                first_name: "",
                last_name: "",
                email: "mourateogenes@gmail.com",
                profile: "editor"
            },
            content: "{\"updateTextArea\":\"teste\",\"customURL\":\"\"}",
            created: "2020-08-31T14:33:24.694684-03:00",
            id: 1,
            image: null,
            session: 1,
            state: "published",
            title: "",
            tweet_id: ""
        });

        data = await fetchFeedUpdates(sessionID);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    test("Test if fetchFeedUpdates returns response objects when status != 200", async (done) => {
        const sessionID = 1;

        mock.onGet("/publications/?session__id="+sessionID).replyOnce(201,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                email: "teomoura",
                first_name: "",
                last_name: "",
                email: "mourateogenes@gmail.com",
                profile: "editor"
            },
            content: "{\"updateTextArea\":\"teste\",\"customURL\":\"\"}",
            created: "2020-08-31T14:33:24.694684-03:00",
            id: 1,
            image: null,
            session: 1,
            state: "published",
            title: "",
            tweet_id: ""
        });

        data = await fetchFeedUpdates(sessionID);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    test("Test if fetchFeedUpdates returns error if no publication id is passed", async (done) => {
        data = await fetchFeedUpdates( );
        expect(data).toBe("Please provide a valid session Id");
        done()
    });

    test("Test if deletePostFromFeed returns modified object correctly", async (done) => {
        const publicationId = 1;

        mock.onPatch(API_PUBLICATIONS_URL + publicationId + "/").replyOnce(200,{
            id: 1,
            author: {
                id: 1,
                is_superuser: true,
                username: "teomoura",
                first_name: "",
                last_name: "",
                email: "mourateogenes@gmail.com",
                profile: "editor"
            },
            content: "{\"updateTextArea\":\"teste\",\"customURL\":\"\"}",
            created: "2020-08-31T14:33:24.694684-03:00",
            id: 1,
            image: null,
            session: 1,
            state: "inactive",
            title: "",
            tweet_id: ""
        });

        data = await deletePostFromFeed( publicationId);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    test("Test if deletePostFromFeed returns error if no publication id is passed", async (done) => {
        data = await deletePostFromFeed( );
        expect(data).toBe("Please provide a valid publication id");
        done()
    });

    test("Test if submitSummaryContent returns modified object correctly", async (done) => {
        const sessionID = 1;
        const summaryText = "teste"
        mock.onPatch(API_SESSIONS_URL + sessionID + '/').replyOnce(200,{
          "id":16,
          "author":{"id":1,"is_superuser":true,"username":"admin","first_name":"","last_name":"","email":"a@a.com","profile":"editor"},
          "location":"plenary","date":"2020-10-02",
          "type_session":"presential",
          "situation_session":"pre_session",
          "resume":"k","enable":true,
          "id_session_dados_abertos":null});

        data = await submitSummaryContent(sessionID, summaryText);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        done()
    });

    test("Test if submitSummaryContent returns error if no publication id is passed", async (done) => {
        data = await  submitSummaryContent();
        expect(data).toBe("Please provide a valid publication id");
        done()
    });

    afterAll(() => {
        mock.restore();
    });
});

import moxios from 'moxios'
import axiosInstance from './../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {fetchFeedUpdates} from './timelineAPIhandler'
import moment from 'moment'
import axios from 'axios'

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



    afterAll(() => {
        mock.restore();
    });
});

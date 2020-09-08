import axiosInstance from '../../../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import getSnippetVideoFromUrl from './fetchVideoSnippetFile'


describe('Test getSnippetVideoFromUrl function requisitions with mock adapter', () => {
    var mock = new MockAdapter(axiosInstance);

    test("Test if getSnippetVideoFromUrl returns true when it has worked correct", async (done) => {
        var data = null;

        
        mock.onPost('/file-video/').replyOnce(200,"www.video.com");


        data = await getSnippetVideoFromUrl("www.videoToGet.com.br");
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(data).toBe("www.video.com");
        done()
    });

    test("Test if getSnippetVideoFromUrl returns false when it has not worked correct", async (done) => {
        var data = null;
        
        mock.onPost('/file-video/').replyOnce(201,"www.video.com.br");

        data = await getSnippetVideoFromUrl("www.videoToGet.com.br");
        expect(data).toBeNull();

        done()
    });

    afterAll(() => {
        mock.restore();
    });
});


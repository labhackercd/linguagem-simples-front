import axiosInstance from '../../../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {API_VIDEOS_SNIPPETS} from '../../../../../api_urls'
import fetchSessionVideos from '../fetchVideoSnippetsCamara'

describe('Test Fetch Video Snippets', () => {
    const videosMockData = [
        {
            "url": "https://www.camara.leg.br/evento-legislativo/59733/sessao/523169/video-trecho/1594234414000",
            "author": "Rodrigo Maia",
            "legend": "Deputado DEM-RJ",
            "schedule": "horário - 15h53'34",
            "duration": "duração - 00:00:58",
            "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/74693.jpg"
          },
          {
            "url": "https://www.camara.leg.br/evento-legislativo/59733/sessao/523169/video-trecho/1594234452950",
            "author": "Rodrigo Maia",
            "legend": "Deputado DEM-RJ",
            "schedule": "horário - 15h54'12",
            "duration": "duração - 00:00:59",
            "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/74693.jpg"
          },
          {
            "url": "https://www.camara.leg.br/evento-legislativo/59733/sessao/523169/video-trecho/1594234492497",
            "author": "Paulão",
            "legend": "Deputado PT-AL",
            "schedule": "horário - 15h54'52",
            "duration": "duração - 00:02:33",
            "thumbnail": "https://www.camara.leg.br/internet/deputado/bandep/pagina_do_deputado/171617.jpg"
          },
    ]

    test("Test if FetchSessionVideos data returns data when it has worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const sessionId = 1;
        var data = null;
        
        mock.onGet(API_VIDEOS_SNIPPETS+sessionId).replyOnce(200,videosMockData);

        data = await fetchSessionVideos(sessionId);
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        mock.restore();
        done()
    });

    test("Test if FetchSessionVideos returns null when it has not worked correct", async (done) => {
        var mock = new MockAdapter(axiosInstance);
        const sessionId = 1;
        var data = null;
        
        mock.onGet(API_VIDEOS_SNIPPETS+sessionId).replyOnce(201,{});

        data = await fetchSessionVideos(sessionId);
        expect(data).toBeNull();
        mock.restore();
        done();
    });

});

  
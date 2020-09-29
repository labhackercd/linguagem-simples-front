module.exports = Object.freeze({

    //NAME CONSTANTS
    APPLICATION_NAME: "Estudio",

    //APPLICATION URL'S
        APPLICATION_FRONT_BASE_URL: "www.teste.com",  //APPLICATION FRONT BASE URL
        // APPLICATION_SERVER_API_BASE_URL: 'http://localhost:8000/api/', //APPLICATION API SERVER BASE URL
        APPLICATION_SERVER_API_BASE_URL: 'https://acompanhe.camara.leg.br/server/api/',
        APPLICATION_RESET_PASSWORD_URL: 'https://acompanhe.camara.leg.br/server/password_reset/',

    //ROUTES
        INITIAL_PAGE_URL: '/', //Application Login and Initial page
        ESTUDIO_PAGE_URL: '/estudio', //Application Estudio Page
        DASHBOARD_PAGE_URL: '/dashboard/:dashboardId', //Application Dashboard page
        DASHBOARD_BASE_URL: '/dashboard/',

    //API'S CAMARA DOS DEPUTADOS
        API_CD_EVENTOS_PLENARIO: 'https://dadosabertos.camara.leg.br/api/v2/eventos?codTipoEvento=110',// 110 code corresponds to Plenary
        API_CD_EVENTOS: 'https://dadosabertos.camara.leg.br/api/v2/eventos/',
        API_CD_ORIENTACAO_VOTACAO: 'https://liderancadigital.camara.leg.br/proxy_pass/secod-wsVotDecom-orientacao',
        API_CD_NOMINAL_VOTACAO: 'https://liderancadigital.camara.leg.br/proxy_pass/secod-wsVotDecom-orientacao',
        API_CD_ITENS_EM_VOTACAO: 'https://infoleg.camara.gov.br/wsVotDecom/votacao/itens-em-votacao-na-reuniao/',
        API_CD_PRESENCA_VOTACAO_PLENARIO:  'https://infoleg.camara.gov.br/ws-plenario/api/presenca?local=P',
        API_CD_PAUTA_SESSAO_PLENARIO: 'https://liderancadigital.camara.leg.br/proxy_pass/ws-pauta-itens-da-pauta/',
        API_CD_VOTACAO_ITEM: 'https://infoleg.camara.gov.br/wsVotDecom/api/votacao/',

    //URL's
        ACOMPANHE_PORTAL_URL_PAGE: 'https://www.camara.leg.br/evento-legislativo/',
        PROPOSICAO_INFO_PAGE: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=',
        

    //API'S BACKEND
        //AUTH URL'S
            TOKEN_REFRESH_URL: '/token/refresh/', //Application Api Token REFRESH PATH
            TOKEN_OBTAIN_URL: '/token/obtain/', //Application Api Token PATH
            TOKEN_VERIFY_URL: '/token/verify/', //Application Api Token Verify

        //FILE-VIDEO
            API_FILE_VIDEO_URL:'/file-video/', //Application end-point to obtain the source of specific video

        //NEWS
            API_NEWS_URL:'/news​/news_list', //Obtain news list
            API_NEWS_SEARCH_URL:'/news-search/', //Obtain specific news using parameters

        //PUBLICATIONS
            API_PUBLICATIONS_URL:'/publications/',

        //RADIO AGENCY
            API_RADIO_AGENCY_URL:'/radioagency/',
            API_RADIO_AGENCY_SEARCH_URL:'/radioagency-search/',

        //RADIO CAMARA
            API_RADIO_CAMARA_URL:'/radiocamara/',
            API_RADIO_CAMARA_SEARCH_URL:'/radiocamara-search/',

        //SAVED CONTENTS
            API_SAVED_CONTENTS_URL:'/saved-contents/',

        //SESSIONS
            API_SESSIONS_URL:'/sessions/',
            API_SESSIONS_URL_NOT_LIVE:'/sessions/?enable=false',
            API_SESSIONS_CURRENT_LIVE_URL:'sessions/?enable=true',

        //TV CAMARA
            API_TV_CAMARA_URL:'/tvcamara/',
            API_TV_CAMARA_SEARCH_URL:'/tvcamara-search/',

        //VIDEOS
            API_VIDEOS_SNIPPETS:'/videos-session/'
  });

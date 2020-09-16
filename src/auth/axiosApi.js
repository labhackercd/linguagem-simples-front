import axios from 'axios'
import {APPLICATION_SERVER_API_BASE_URL, TOKEN_REFRESH_URL} from './../api_urls'


const axiosInstance = axios.create({
    baseURL: APPLICATION_SERVER_API_BASE_URL,
    //timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        //console.log(error)
        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === APPLICATION_SERVER_API_BASE_URL+TOKEN_REFRESH_URL) {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post(TOKEN_REFRESH_URL, {refresh: refreshToken})
                        .then((response) => {
            
                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);
            
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access;
                            window.location.reload(false);
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/';
                }
        }
      
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance;

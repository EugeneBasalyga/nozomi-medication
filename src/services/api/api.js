import HttpService from '../http';

class ApiService {
  constructor(baseUrl) {
    this.http = new HttpService(baseUrl);

    this.http.addRequestInterceptor((axiosConfig) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        return axiosConfig;
      }

      axiosConfig.headers = axiosConfig.headers || {}; // eslint-disable-line no-param-reassign
      axiosConfig.headers.Authorization = `Bearer ${accessToken}`; // eslint-disable-line no-param-reassign
      return axiosConfig;
    });
  }
}

export default ApiService;

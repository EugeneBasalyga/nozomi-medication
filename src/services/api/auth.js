import ApiService from './api';

class AuthApi extends ApiService {
  constructor() {
    if (AuthApi.instance) {
      return AuthApi.instance;
    }

    super('http://localhost:3001/auth');
    AuthApi.instance = this;
  }

  async login(emailAddress, password) {
    const response = await this.http.post('/login', { emailAddress, password });

    return response.data;
  }

  async register(emailAddress, password) {
    const response = await this.http.post('/register', { emailAddress, password });

    return response.data;
  }

  async logout() {
    const response = await this.http.post('/logout');

    return response.data;
  }

  async getCurrentUser() {
    const response = await this.http.get('/session/current');
    return response.data;
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;

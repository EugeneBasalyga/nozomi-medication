import ApiService from './api';

class AuthApi extends ApiService {
  constructor() {
    if (AuthApi.instance) {
      return AuthApi.instance;
    }

    super('http://localhost:3001/auth');
    AuthApi.instance = this;
  }

  async login(email, password) {
    const response = await this.http.post('/login', { email, password });

    return response.data;
  }

  async register(email, password, repeatPassword) {
    const response = await this.http.post('/register', { email, password, repeatPassword });

    return response.data;
  }

  async logout() {
    const response = await this.http.post('/logout');

    return response.data;
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;

class LocalStorageApi {
  constructor(window) {
    if (LocalStorageApi.instance) {
      return LocalStorageApi.instance;
    }

    this.window = window;
    LocalStorageApi.instance = this;
  }

  getAccessToken() {
    try {
      const value = this.window.localStorage.getItem('accessToken');
      return value;
    } catch (err) {
      return err;
    }
  }

  getRefreshToken() {
    try {
      const value = this.window.localStorage.getItem('refreshToken');
      return value;
    } catch (err) {
      return err;
    }
  }

  setAccessToken(value) {
    try {
      this.window.localStorage.setItem('accessToken', value);
    } catch (err) {
      console.log(err);
    }
  }

  setRefreshToken(value) {
    try {
      this.window.localStorage.setItem('refreshToken', value);
    } catch (err) {
      console.log(err);
    }
  }

  removeAccessToken() {
    try {
      this.window.localStorage.removeItem('accessToken');
    } catch (err) {
      console.log(err);
    }
  }

  removeRefreshToken() {
    try {
      this.window.localStorage.removeItem('refreshToken');
    } catch (err) {
      console.log(err);
    }
  }
}

const localStorageApiInstance = new LocalStorageApi(window);
export default localStorageApiInstance;

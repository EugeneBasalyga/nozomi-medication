class LocalStorageApi {
  constructor(window) {
    if (LocalStorageApi.instance) {
      return LocalStorageApi.instance;
    }

    this.window = window;
    LocalStorageApi.instance = this;
  }

  getValue(key) {
    try {
      const value = this.window.localStorage.getItem(key);
      return value;
    } catch (err) {
      return err;
    }
  }

  setValue(key, value) {
    try {
      this.window.localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  }
}

const localStorageApiInstance = new LocalStorageApi(window);
export default localStorageApiInstance;

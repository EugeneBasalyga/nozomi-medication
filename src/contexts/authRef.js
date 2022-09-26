export default class AuthRef {
  constructor() {
    this.ready = false;
  }

  static getInstance() {
    if (AuthRef.instance) {
      return AuthRef.instance;
    }

    AuthRef.instance = new AuthRef();
    return AuthRef.instance;
  }

  isReady() {
    return this.ready;
  }
}

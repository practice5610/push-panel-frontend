import login from "./login";

class MyAuthProvider {
  constructor(API_URL) {
    this.API_URL = API_URL;
  }
  login(user) {
    return login(this.API_URL, user);
  }
  checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("id");
      localStorage.removeItem("key");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  }
  checkAuth() {
    if (localStorage.getItem("id") && localStorage.getItem("key")) {
      return Promise.resolve();
    }
    return Promise.reject();
  }
  logout() {
    localStorage.clear();
    return Promise.resolve();
  }
  getIdentity() {}
  async getPermissions() {
    if (localStorage.getItem("privillage") === "admin") {
      return Promise.resolve();
    }
    return Promise.reject();
  }
}

export default MyAuthProvider;

import { action, observable } from "mobx";
import axios from "axios";
import { ValidationError } from "../types/insex";

export class AuthStore {
  @observable
  public loading: boolean = false;

  @observable
  public errors = {
    email: "",
    password: "",
    message: ""
  };

  @observable
  public isLoggedIn: boolean = false;

  @observable
  public email: string = "";

  @observable
  public password: string = "";

  @action
  public setEmail(email: string) {
    this.email = email;
  }

  @action
  public setPassword(password: string) {
    this.password = password;
  }

  @action
  public checkIsLoggedIn() {
    if (!!localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  @action
  public logout = () => {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  };

  private resetErrors() {
    this.errors = {
      email: "",
      password: "",
      message: ""
    };
  }

  @action
  public login() {
    this.loading = true;
    this.resetErrors();

    return axios
      .post("http://localhost:8080/auth/login", {
        email: this.email,
        password: this.password
      })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        this.isLoggedIn = true;
      })
      .catch(err => {
        const errors = err.response.data;
        if (Array.isArray(errors.errors)) {
          errors.errors.forEach((error: ValidationError) => {
            this.errors[error.param] = error.msg;
          });
        } else {
          this.errors.password = errors.message;
        }
      })
      .finally(action(() => (this.loading = false)));
  }
}

export default new AuthStore();

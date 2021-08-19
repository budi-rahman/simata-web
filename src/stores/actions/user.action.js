import { api } from "helpers";

export const doLogin = (data) => (dispatch) => {
  dispatch(reqLogin());
  api
    .post("/v1/user/login", data)
    .then((res) => {
      let allowedLogin = ["SUPER_ADMIN", "COMPANY_USER"];
      if (allowedLogin.includes(res.data.role)) {
        dispatch(reqLoginSuccess(res.data));
      } else {
        return dispatch(reqLoginFailed({message: "Unauthorized"}))
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(reqLoginFailed(err.response.data));
    });
};

export const doLogout = () => (dispatch) => {
  dispatch(logout());
};

export const setUserLocal = (payload) => {
  return { type: "UPDATE_USER", payload };
};

function logout() {
  return { type: "LOGOUT_USER" };
}

function reqLogin() {
  return { type: "REQ_LOGIN" };
}

function reqLoginSuccess(payload) {
  return { type: "REQ_LOGIN_SUCCESS", payload };
}

function reqLoginFailed(payload) {
  return { type: "REQ_LOGIN_FAILED", payload };
}

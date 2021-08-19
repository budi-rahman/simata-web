import axios from "axios";
// import getVal from "lodash/get";
import actionStore from "stores/store";

const { store } = actionStore;
store.subscribe(listener);

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SITE}/api`,
  timeout: 10000,
});

function select(state) {
  return state.user.token;
}

function listener() {
  let token = select(store.getState());
  api.defaults.headers.common["Authorization"] = token;
}

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (reject) {
    // check resposnse code/message;
    return Promise.reject(reject);
  },
);

export default api;

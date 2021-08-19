const defaultState = { isAuthenticated: false, permissions: {} };
export default (state = defaultState, action) => {
  switch (action.type) {
    case "REQ_LOGIN":
      return { ...defaultState, requestAuth: true };
    case "REQ_LOGIN_SUCCESS":
      return {
        ...state,
        requestAuth: false,
        isAuthenticated: true,
        ...action.payload,
      };
    case "REQ_LOGIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        requestAuth: false,
        error: action.payload.message,
      };
    case "LOGOUT_USER":
      return defaultState;
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

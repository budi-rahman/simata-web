import { connect } from "react-redux";

import actionStore from "stores/store";
const { store } = actionStore;
store.subscribe(checkPermission);

function select(state) {
  return state.user;
}

export function checkPermission(role) {
  let user = select(store.getState());
  return user.permissions[role];
  // return true;
}

function GuardComponent({ user, action, children }) {  
  return user.permissions[action] ? children : null;
}

const mapStateToProps = ({ user }) => ({ user });

export const Guard = connect(mapStateToProps)(GuardComponent);

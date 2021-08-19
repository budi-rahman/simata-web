import React from "react";
import { doLogout } from "stores/actions/user.action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Logout extends React.Component {
  componentDidMount() {
    if (!this.props.user.isAuthenticated) {
      return this.props.history.push("/auth/login");
    }
    this.props.doLogout();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isAuthenticated && !this.props.user.isAuthenticated) {
      this.props.history.push("/auth/login");
    }
  }
  render() {
    return <h1>Logging Out</h1>;
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => bindActionCreators({ doLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

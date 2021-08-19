import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { doLogin, setUserLocal } from "stores/actions/user.action";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.captchaRef = React.createRef();
    this.state = {
      captchaResult: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.isAuthenticated && this.props.user.isAuthenticated) {      
      return this.props.history.push("/task");      
    }

    if (prevProps.user.requestAuth && this.props.user.error) {
      return message.error(this.props.user.error);
    }
  }

  onFinish = (values) => {    
    this.props.doLogin({ ...values });
  };
  render() {
    return (
      <Form className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Harap masukan username" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 8 }} name="password" rules={[{ required: true, message: "Harap masukan password" }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        {/* <Form.Item>
          <ReCAPTCHA
            ref={this.captchaRef}
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
            onChange={(v) => this.setState({ captchaResult: v })}
          />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => bindActionCreators({ doLogin, setUserLocal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

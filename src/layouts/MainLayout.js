import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  DownOutlined,
  CarOutlined,
  BarsOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { checkPermission } from "components/Guard";
import { setUserLocal } from "stores/actions/user.action";
import { bindActionCreators } from "redux";

const { Content, Sider, Header, Footer } = Layout;

function MainLayout({ children, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!user.isAuthenticated) {
      return history.push("/auth/login");
    }
  }, [user.isAuthenticated]);

  return (
    <Layout className="main-layout-wrapper">
      <Header className="header">
        <div className="logo">
          <img width="150px" src="/img/logo.png" alt="Logo" />
        </div>
        <div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/auth/logout">Logout</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {user.username} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={showMenu} onCollapse={setShowMenu}>
          <Menu theme="dark" defaultSelectedKeys={["task"]} mode="inline">
            {checkPermission("task-list") && (
              <Menu.Item key="task" icon={<BarsOutlined />}>
                <span>Task</span>
                <Link to="/task" />
              </Menu.Item>
            )}

            {checkPermission("user-list") && (
              <Menu.Item key="user" icon={<UserOutlined />}>
                <span>User</span>
                <Link to="/user" />
              </Menu.Item>
            )}

            {checkPermission("company-list") && (
              <Menu.Item key="company" icon={<TeamOutlined />}>
                <span>Company</span>
                <Link to="/company" />
              </Menu.Item>
            )}

            {checkPermission("fleet-list") && (
              <Menu.Item key="fleet" icon={<CarOutlined />}>
                <span>Fleet</span>
                <Link to="/fleet" />
              </Menu.Item>
            )}

            {checkPermission("checkpoint-list") && (
              <Menu.Item key="checkpoint" icon={<EnvironmentOutlined />}>
                <span>Checkpoint</span>
                <Link to="/checkpoint" />
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="content-layout">
          <Content className="main-content">{children}</Content>
          <Footer>
            <p style={{ textAlign: "center", margin: 0 }}>Simata &copy; 2020</p>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => bindActionCreators({ setUserLocal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

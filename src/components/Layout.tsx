import { HomeOutlined, ProfileOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import "../main.css";

export const pathConstants = {
    HOMEPAGE: {
        key: "/",
        label: "Homepage",
        icon: <HomeOutlined />
      },
    ESTIMATES: {
        key: "estimates",
        label: "Preventivi",
        icon: <ProfileOutlined />
    }
  }

const { Header, Content, Footer } = Layout;



let paths = Object.keys(pathConstants).map((label)=>{
    return pathConstants[label as keyof typeof pathConstants]
    })



const BaseLayout: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()

  return (
    <Layout style={{minHeight: "100vh",}}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={paths}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(item)=>{
            navigate(item.key)
          }}    
        />
      </Header>
      <Content style={{ padding: '10px 10px' }}>
        
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Workshop Manager ©{new Date().getFullYear()} Created by AB
      </Footer>
    </Layout>
  );
};

export default BaseLayout;
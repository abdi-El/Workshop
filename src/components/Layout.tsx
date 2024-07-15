import { ProfileOutlined } from '@ant-design/icons'
import { Layout, Menu, Row, theme } from 'antd'
import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../main.css'

export const pathConstants = {
    ESTIMATES: {
        key: '/estimates',
        label: 'Preventivi',
        icon: <ProfileOutlined />,
    },
}

const { Header, Content, Footer } = Layout

let paths = Object.keys(pathConstants).map((label) => {
    return pathConstants[label as keyof typeof pathConstants]
})

const BaseLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                }}
            >
                <Row align={'middle'}>
                  <Link to="/">
                    <img
                        src="/src/assets/logo.png"
                        alt="logo of the app"
                        height={'60px'}
                        style={{marginRight: "10px"}}
                    />
                  </Link>
                </Row>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={paths}
                    style={{ flex: 1 }}
                    onClick={(item) => {
                        navigate(item.key)
                    }}
                    selectedKeys={[location.pathname]}
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
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Workshop Manager ©{new Date().getFullYear()} Created by AB
            </Footer>
        </Layout>
    )
}

export default BaseLayout

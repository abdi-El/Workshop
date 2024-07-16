import {
    CarOutlined,
    LoadingOutlined,
    ProfileOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Row, Spin, theme } from 'antd'
import React, { Suspense } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../main.css'

export const pathConstants = {
    ESTIMATES: {
        key: '/estimates',
        label: 'Preventivi',
        icon: <ProfileOutlined />,
    },
    CUSTOMERS: {
        key: '/customers',
        label: 'Clienti',
        icon: <UserOutlined />,
    },
    CARS: {
        key: '/cars',
        label: 'Autoveicoli',
        icon: <CarOutlined />,
    },
    SETTINGS: {
        key: '/settings',
        label: 'Impostazioni',
        icon: <SettingOutlined />,
    },
}

const { Header, Content, Footer } = Layout

let paths = Object.keys(pathConstants).map((label) => {
    return pathConstants[label as keyof typeof pathConstants]
})

function LoadingComponent() {
    return (
        <Row justify={'center'} align={'middle'}>
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
        </Row>
    )
}

const BaseLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    const location = useLocation()
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
                    paddingInline: 24,
                }}
            >
                <Row align={'middle'}>
                    <Link
                        to="/"
                        style={{
                            lineHeight: '100%',
                            fontSize: 16,
                            color: 'white',
                            marginRight: 15,
                        }}
                    >
                        Gestionale Officina
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
                    <Suspense fallback={<LoadingComponent />}>
                        <Outlet />
                    </Suspense>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Workshop Manager ©{new Date().getFullYear()} Created by AB
            </Footer>
        </Layout>
    )
}

export default BaseLayout

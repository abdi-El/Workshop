import { CarOutlined, FileDoneOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Statistic, StatisticProps } from 'antd'
import React from 'react'
import CountUp from 'react-countup'
import useDatabaseStore from '../stores/DatabaseStore'

const gridStyle: React.CSSProperties = {
    width: 'calc(100%/3)',
    textAlign: 'center',
}

function NumberStatistic(props: { value: number; title: string }) {
    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," />
    )

    return (
        <Statistic
            title={props.title}
            value={props.value}
            formatter={formatter}
        />
    )
}

export default function HomaPage() {
    const { estimates, cars, customers } = useDatabaseStore((state) => state)

    return (
        <Card title="Riepilogo">
            <Card.Grid style={gridStyle}>
                <FileDoneOutlined />{' '}
                <NumberStatistic
                    value={estimates.length}
                    title="Preventivi totali"
                />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <CarOutlined />{' '}
                <NumberStatistic value={cars.length} title="Auto totali" />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <UserOutlined />{' '}
                <NumberStatistic
                    value={customers.length}
                    title="Clienti totali"
                />
            </Card.Grid>
        </Card>
    )
}

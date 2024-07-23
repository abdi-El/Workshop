import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Row } from 'antd'

interface Props {
    onDelete(): void
    onEdit(): void
    children?: JSX.Element | JSX.Element[]
}

export default function ActionButtons(props: Props) {
    return (
        <Row justify="space-evenly">
            <Popconfirm
                title="Delete the task"
                description="Sei sicuro di voler eliminare?"
                onConfirm={props.onDelete}
                okText="Sì"
                cancelText="No"
            >
                <Button
                    type="primary"
                    shape="round"
                    danger
                    icon={<DeleteOutlined />}
                />
            </Popconfirm>
            <Button
                shape="round"
                type="primary"
                icon={<EditOutlined />}
                onClick={props.onEdit}
            />
            {props.children}
        </Row>
    )
}

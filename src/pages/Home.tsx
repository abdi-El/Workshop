import { Button, message } from 'antd'

export default function HomePage() {
    function greet() {
        message.success('THIS IS A TEST')
    }

    return (
        <h1>
            <Button onClick={greet}>CLICK ME</Button>
        </h1>
    )
}

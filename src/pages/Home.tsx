import { Button, message } from 'antd'

export default function HomePage() {
    function greet() {
        message.success('HI!')
    }

    return (
        <h1>
            <Button onClick={greet}>CLICK ME</Button>
        </h1>
    )
}

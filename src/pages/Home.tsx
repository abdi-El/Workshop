import { invoke } from '@tauri-apps/api'
import { Button, message } from 'antd'

export default function HomePage() {
    function greet() {
        invoke('greet', { name: 'LEPORATTI' }).then((result) => {
            message.success(result as string)
        })
    }

    return (
        <h1>
            <Button onClick={greet}>CLICK ME</Button>
        </h1>
    )
}

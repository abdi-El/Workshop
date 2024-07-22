import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export function PageNotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sezione non trovata"
            extra={
                <Button type="primary">
                    <Link to="/">Torna indietro</Link>
                </Button>
            }
        />
    )
}

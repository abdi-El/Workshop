import { Modal, ModalProps } from 'antd'
import { Estimate } from '../../types/data'

interface Props extends ModalProps {
    estimate: Estimate
}

export default function EstimateModal({ estimate, ...modalProps }: Props) {
    return (
        <Modal title="Preventivo PDF" centered {...modalProps}>
            <p>{estimate.workforce_price}</p>
        </Modal>
    )
}

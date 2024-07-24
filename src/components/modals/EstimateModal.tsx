import { Modal, ModalProps } from 'antd'
import { Estimate } from '../../types/data'
import EstimatePdf from '../pdf/EstimatePdf'

export interface EtiamteModalProps extends ModalProps {
    estimate: Estimate
}

export default function EstimateModal({
    estimate,
    ...modalProps
}: EtiamteModalProps) {
    return (
        <Modal title="Preventivo PDF" centered {...modalProps} width={'80vw'}>
            <EstimatePdf id={estimate.id} />
        </Modal>
    )
}

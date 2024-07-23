import { PDFViewer } from '@react-pdf/renderer'
import { Modal, ModalProps } from 'antd'
import { Estimate } from '../../types/data'
import EstimatePdf from '../pdf/EstimatePdf'

export interface EtiamteModalProps extends ModalProps {
    estimate?: Estimate
}

export default function EstimateModal({
    estimate,
    ...modalProps
}: EtiamteModalProps) {
    return (
        <Modal title="Preventivo PDF" centered {...modalProps} width={'80vw'}>
            {estimate && (
                <PDFViewer width="100%" height="1000" className="app">
                    <EstimatePdf estimate={estimate} />
                </PDFViewer>
            )}
        </Modal>
    )
}

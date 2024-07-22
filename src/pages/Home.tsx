import { PDFViewer } from '@react-pdf/renderer'
import EstimatePdf from '../components/pdf/EstimatePdf'

export default function HomePage() {
    return (
        <PDFViewer width="100%" height="1000" className="app">
            <EstimatePdf />
        </PDFViewer>
    )
}

import { PDFViewer } from '@react-pdf/renderer'
import EstimatePdf from '../components/pdf/Estimate'

export default function HomePage() {
    return (
        <PDFViewer width="100%" height="1000" className="app">
            <EstimatePdf />
        </PDFViewer>
    )
}

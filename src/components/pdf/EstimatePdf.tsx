import {
    Document,
    Page,
    PDFViewer,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer'
import { Fragment, useEffect, useState } from 'react'
import { estimates } from '../../db/models'
import { Estimate, WorkDone, Workshop } from '../../types/data'

interface Props {
    id: number
}

export default function EstimatePdf({ id }: Props) {
    let workShopData = JSON.parse(
        localStorage.getItem('settings') || '{}'
    ) as Workshop

    let [estimate, setEstimates] = useState<Estimate>()

    useEffect(() => {
        estimates.get({ 'estimates.id': id }, true).then((res) => {
            setEstimates(res)
        })
    }, [id])

    const styles = StyleSheet.create({
        page: {
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 1.5,
            flexDirection: 'column',
        },

        spaceBetween: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#3E3E3E',
        },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        logo: { width: 90 },

        reportTitle: { fontSize: 16, textAlign: 'center' },

        addressTitle: { fontSize: 11, fontStyle: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

        address: { fontWeight: 400, fontSize: 10 },

        theader: {
            marginTop: 20,
            fontSize: 10,
            fontStyle: 'bold',
            paddingTop: 4,
            paddingLeft: 7,
            flex: 1,
            height: 20,
            backgroundColor: '#DEDEDE',
            borderColor: 'whitesmoke',
            borderRightWidth: 1,
            borderBottomWidth: 1,
        },

        theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

        tbody: {
            fontSize: 9,
            paddingTop: 4,
            paddingLeft: 7,
            flex: 1,
            borderColor: 'whitesmoke',
            borderRightWidth: 1,
            borderBottomWidth: 1,
        },

        total: {
            fontSize: 9,
            paddingTop: 4,
            paddingLeft: 7,
            flex: 1.5,
            borderColor: 'whitesmoke',
            borderBottomWidth: 1,
        },

        tbody2: { flex: 2, borderRightWidth: 1 },
    })

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Text style={styles.reportTitle}>
                    {workShopData.workshop_name}
                </Text>
            </View>
        </View>
    )

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}></Text>
                    <Text style={styles.invoiceNumber}>N°: {estimate.id}</Text>
                </View>
                <View>
                    <Text style={styles.addressTitle}>
                        Indirizzo: {workShopData.workshop_address}
                    </Text>
                    <Text style={styles.addressTitle}>
                        Partita Iva: {workShopData.workshop_p_iva}
                    </Text>
                    <Text style={styles.addressTitle}>
                        Telefono: {workShopData.workshop_phone_number}
                    </Text>
                </View>
            </View>
        </View>
    )

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.addressTitle}>Per: </Text>
                    <Text style={styles.address}>{estimate.name}</Text>
                </View>
                <Text style={styles.addressTitle}>{estimate.email}</Text>
            </View>
        </View>
    )

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader, styles.theader2]}>
                <Text>Items</Text>
            </View>
            <View style={styles.theader}>
                <Text>Price</Text>
            </View>
            <View style={styles.theader}>
                <Text>Qty</Text>
            </View>
            <View style={styles.theader}>
                <Text>Amount</Text>
            </View>
        </View>
    )

    const TableBody = () =>
        (JSON.parse(estimate.works_done) || []).map((work: WorkDone) => (
            <Fragment key={work.name}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text>{work.name}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{work.price} </Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{work.quantity}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{(work.price * work.quantity).toFixed(2)}</Text>
                    </View>
                </View>
            </Fragment>
        ))

    const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>Total</Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {(JSON.parse(estimate.works_done) || []).reduce(
                        (sum: number, item: WorkDone) =>
                            sum + item.price * item.quantity,
                        0
                    )}
                </Text>
            </View>
        </View>
    )

    return (
        <PDFViewer width="100%" height="1000" className="app">
            {estimate && (
                <Document title="outputa">
                    <Page size="A4" style={styles.page}>
                        <InvoiceTitle />
                        <Address />
                        <UserAddress />
                        <TableHead />
                        <TableBody />
                        <TableTotal />
                    </Page>
                </Document>
            )}
        </PDFViewer>
    )
}

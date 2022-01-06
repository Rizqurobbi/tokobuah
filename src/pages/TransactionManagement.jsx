import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Table } from 'reactstrap';
import ModalTransaksi from '../component/ModalTransaction';
import { API_URL } from '../helper';

class TransactionAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            detail: {},
            status: ["Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Pesanan Batal"],
            statusIdx: 0
        }
    }
    componentDidMount() {
        this.getTransaksi()
    }
    getTransaksi = () => {
        axios.get(`${API_URL}/userTransactions`)
            .then((res) => {
                this.setState({ transaksi: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }
    getTransaksiFilter = (status, statusActive) => {
        axios.get(`${API_URL}/userTransactions${statusActive > 0 ? `?status=${status}` : ""}`)
            .then((res) => {
                this.setState({ transaksi: res.data, statusIdx: statusActive })
            }).catch((err) => {
                console.log(err)
            })
    }
    totalCart = (value) => {
        let total = 0
        value.detail.forEach((value) => {
            total += value.qty
        });
        return total
    }
    btnConfirm = (id, confirm) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: confirm
        })
            .then((res) => {
                this.getTransaksi()
                this.setState({ openModal: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    btnBatal = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: "Pesanan Batal"
        })
            .then((res) => {
                this.getTransaksi()
                this.setState({ openModal: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    printTransactionManagement = () => {
        return this.state.transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Batal") ? "danger" : value.status.includes("Terima") ? "success" : "warning"
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td><Badge color={badgeColor}>{value.status}</Badge></td>
                    <td>{value.invoice}</td>
                    <td>{value.date}</td>
                    <td className="d-flex">
                        <div className="col-3">
                            <img width="100%" src={value.detail[0].image} />
                        </div>
                        <div className="mx-3" style={{ padding: 15 }}>
                            <h3>{value.detail[0].nama}</h3>
                        </div>
                    </td>
                    <td>{this.totalCart(value)}</td>
                    <td>{value.totalBeratBuah}gram</td>
                    <td>{value.totalPayment}</td>
                    <td>
                        <div className="d-flex">
                            <Button style={{ width: '10vw', borderRadius: 0, backgroundColor: "#BE0B06" }} onClick={() => this.btnBatal(value.id)}>Batalkan Pesanan</Button>
                            <Button className="mx-2" style={{borderRadius:0}} color="success" onClick={() => this.btnConfirm(value.id, "Terima Pesanan")}>Terima Pesanan</Button>
                            <Button className="mx-2" style={{ width: '10vw', borderRadius: 0, backgroundColor: "black" }} onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}>Detail Produck</Button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div>
                    <div className="d-flex justify-content-evenly" style={{marginBottom:'5vh'}}>
                        {
                            this.state.status.map((value, index) => {
                                return <Button outline
                                    color={this.state.statusIdx == index ? "primary" : "secondary"}
                                    style={{ border: 'none', width: "100%", borderBottom: this.state.statusIdx == index && "3px solid #0984E3" }}
                                    type='button'
                                    onClick={() => this.getTransaksiFilter(value, index)}>
                                    <h6 style={{ fontWeight: "bold" }}>{value}</h6>
                                </Button>
                            })
                        }
                    </div>
                    <Table bordered style={{ height: 20 }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>#</th>
                                <th style={{ textAlign: 'center' }}>STATUS</th>
                                <th style={{ textAlign: 'center' }}>INVOICE</th>
                                <th style={{ textAlign: 'center' }}>DATE</th>
                                <th style={{ width: '22vw', textAlign: 'center' }}>PRODUCT NAME</th>
                                <th style={{ textAlign: 'center' }}>TOTAL ITEM</th>
                                <th style={{ textAlign: 'center' }}>TOTAL BERAT</th>
                                <th style={{ textAlign: 'center' }}>TOTAL PAYMENT</th>
                                <th style={{ textAlign: 'center' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printTransactionManagement()}
                        </tbody>
                    </Table>
                </div>
                <ModalTransaksi
                    btnBatal={this.btnBatal}
                    dataTransaksi={this.state.detail}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })} />
            </div>
        );
    }
}
export default TransactionAdminPage;
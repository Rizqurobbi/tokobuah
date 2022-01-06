import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Badge, Button, Card, Table } from "reactstrap"
import ModalTransaksi from "../component/ModalTransaction"
import { API_URL } from "../helper"
import { getProductAction } from "../redux/actions"

const HistoryPage = (props) => {
    const { iduser, role, } = useSelector((state) => {

        return {
            iduser: state.userReducer.id,

        }
    })
    const dispatch = useDispatch()
    const [history, setHistory] = useState([])
    const [detail, setDetail] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null)
    useEffect(() => {
        getHistory()
    }, [])
    const getHistory = () => {
        axios.get(`${API_URL}/userTransactions?iduser=${iduser}`)
            .then((res) => {
                setHistory(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    const totalCart = (value) => {
        let total = 0
        value.detail.forEach((value) => {
            total += value.qty
        });
        return total
    }
    const btnBatal = (id) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, {
            status: "Pesanan Batal"
        })
            .then((res) => {
                getHistory()
                setOpenModal(false)

            })
    }
    const printHistory = () => {

        return history.map((value, index) => {
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
                    <td>{totalCart(value)}</td>
                    <td>{value.totalBeratBuah}gram</td>
                    <td>{value.totalPayment}</td>
                    <td>
                        <div className="d-flex">
                            <Button style={{ width: '10vw', borderRadius: 0, backgroundColor: "#BE0B06" }} onClick={() => btnBatal(value.id)}>Batalkan Pesanan</Button>
                            <Button className="mx-2" style={{ width: '10vw', borderRadius: 0, backgroundColor: "black" }} onClick={() => { setOpenModal(!openModal); setDetail(value); setSelectedIdx(index) }}>Detail Produck</Button>
                        </div>
                    </td>
                </tr>
            )
        })

    }
    return (
        <div className="container-fluid">
            <div>
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
                        {printHistory()}
                    </tbody>
                </Table>
            </div>
            <ModalTransaksi
                btnBatal={btnBatal}
                dataTransaksi={detail}
                openModal={openModal}
                toggleModal={() => setOpenModal(!openModal)} />
        </div>
    )
}
export default HistoryPage


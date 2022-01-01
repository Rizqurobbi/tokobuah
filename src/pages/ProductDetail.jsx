import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../helper"
import { Button, Collapse, Toast, ToastHeader, ToastBody } from "reactstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateUserCart } from "../redux/actions"
import { Navigate } from "react-router"
import CartPage from "./CartPage"
const ProductDetail = (props) => {
    const { cart, iduser } = useSelector((state) => {
        return {
            cart: state.userReducer.cart,
            iduser: state.userReducer.id

        }
    })
    const [detail, setDetail] = useState({})
    const [thumbnail, setThumbnail] = useState(0)
    const [openType, setOpenType] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMsg, setToastMsg] = useState("")
    const [selectedType, setSelectedType] = useState({})
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        getProduct()
    }, [])
    const getProduct = () => {
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                setDetail(response.data[0])
            }).catch((err) => {
                console.log(err)
            })
    }
    const renderImages = () => {
        let { images } = detail
        return images.map((value, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={value}
                    key={index}
                    width="100%"
                    onClick={() => setThumbnail(index)}
                    style={{ borderBottom: thumbnail == index && "3px solid red" }}
                />
            )
        })
    }
    const btnIncrement = (num) => {
        if (selectedType.qty) {
            if (counter < selectedType.qty) {
                setCounter(counter + num)

            } else {
                setToastOpen(!toastOpen, setToastMsg("Stok produk tidak cukup"))
            }
        }
    }
    const btnDecrement = (num) => {

        if (counter > 1) {
            setCounter(counter - num)
        }

    }
    // const onBtInc = () => {
    //     if (selectedType.qty) {
    //         if (counter < selectedType.qty) {
    //             setCounter( counter + 1 )
    //         } else {
    //             alert("hi")
    //         }
    //     }
    // }
    const btnAddToCart = async () => {
        if (selectedType.type) {
            let dataCart = {
                nama: detail.nama,
                harga: detail.harga,
                berat: detail.berat,
                image: detail.images[0],
                type: selectedType.type,
                qty: counter
            }
            let temp = [...cart]
            temp.push(dataCart)
            if (iduser) {
                let res = await dispatch(updateUserCart(temp, iduser))
                if (res.success) {
                    setRedirect(true)
                }
            } else {
                setToastOpen(true, setToastMsg("Silahkan Login terlebih dahulu"))
            }
        } else {
            setToastOpen(true, setToastMsg("Pilih tipe produk terlebih dahulu"))
        }
    }
    if (redirect) {
        return <Navigate to="/cart-user" />
    }
    return (
        <div className="container-fluid">
            <Toast isOpen={toastOpen} style={{ position: "fixed", right: 10, top: 100, }}>
                <ToastHeader icon="warning"
                    toggle={() => setToastOpen(false, setToastMsg(""))}>
                    Add to cart warning
                </ToastHeader>
                <ToastBody>
                    {toastMsg}
                </ToastBody>
            </Toast>
            <div style={{ paddingTop: '12vh', paddingBottom: '3vh', display: 'flex', }}>

                <a href="/products" className="mx-2 text-decoration-none" style={{ color: 'black' }}>Product</a>

                <p>> {detail.nama}</p>

            </div>
            {console.log(detail)}
            {detail.id &&
                <>
                    <div className='row'>
                        <div className='col-6'>
                            <img src={detail.images[thumbnail]} width="100%" />
                            <div className="col-3">
                                <div className="d-flex">
                                    {renderImages()}
                                </div>
                            </div>

                        </div>
                        <div className='col-6'>
                            <div style={{}}>
                                <h4 style={{}}>{detail.nama}</h4>
                                <p style={{ fontSize: 18 }}>{detail.kategori}</p>
                                <p style={{ fontWeight: 'bolder', color: 'red' }}>{detail.berat} gram/pcs</p>
                                <h2 style={{ fontWeight: 'bolder', color: 'red' }}>Rp. {detail.harga.toLocaleString()}</h2>
                                <div style={{ marginTop: 20 }}>
                                    <p style={{ fontSize: 18 }}>Choose type and check the stock</p>
                                    {
                                        detail.stock.map((value, index) => {
                                            return (
                                                <div style={{ marginBottom: 10 }}>
                                                    <Button onClick={() => setSelectedType(value, setCounter(1))} style={{ borderRadius: 0, backgroundColor: 'black' }}>{value.type} : {value.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                            <div>
                                <p style={{ borderTop: "1px solid grey", borderBottom: '1px solid grey' }}>{detail.manfaat}</p>
                            </div>
                            <div className=" d-flex  " style={{ fontSize: 20 }}>
                                <input className='col-1 text-center border border-dark' placeholder="counter" style={{ height: 80, display: 'inline-block' }} type="text" value={counter} />
                                {/* <div className="border border-dark d-flex flex-column text-center">
                                    <span className="" style={{ width: 40, fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => btnIncrement(1)} >+
                                    </span>
                                    <span style={{ fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => btnDecrement(1)}>-</span>
                                </div> */}
                                <div className="border border-dark d-flex flex-column" style={{ width: 40, justifyContent: 'space-between' }}>
                                    <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black' }} onClick={() => btnIncrement(1)}>+</Button>
                                    <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black' }} onClick={() => btnDecrement(1)}>-</Button>
                                </div>
                                <Button className="mx-3" style={{ borderRadius: 0, width: '15vw', backgroundColor: 'black' }} onClick={btnAddToCart}>ADD TO CART</Button>
                            </div>


                        </div>
                    </div>
                </>

            }
            
        </div>
    )
}
export default ProductDetail
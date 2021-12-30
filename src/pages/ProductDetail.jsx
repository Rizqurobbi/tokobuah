import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../helper"

const ProductDetail = (props) => {
    const [detail, setDetail] = useState({})
    const [thumbnail, setThumbnail] = useState(0)
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
                    style={{ borderBottom: thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }
    return (
        <div className="container-fluid">
            <div style={{ paddingTop: '12vh', paddingBottom: '3vh', display: 'flex' }}>
                <p>Home</p>
                <p>Home</p>
                <p>Home</p>
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
                            <div>
                                <h4 style={{}}>{detail.nama}</h4>
                                <h4 style={{ fontWeight: 'bolder', color: 'red' }}>Rp. {detail.harga.toLocaleString()}</h4>
                            </div>
                            <div>
                                <h4 style={{}}>{detail.nama}</h4>
                                <h4 style={{ fontWeight: 'bolder', color: 'red' }}>Rp. {detail.harga.toLocaleString()}</h4>
                            </div>
                            <div>
                                <h4 style={{}}>{detail.nama}</h4>
                                <h4 style={{ fontWeight: 'bolder', color: 'red' }}>Rp. {detail.harga.toLocaleString()}</h4>
                            </div>


                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default ProductDetail
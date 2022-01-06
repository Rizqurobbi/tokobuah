import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../helper"

const DetailNewsPage = (props) => {
    const [detatil, setDetail] = useState({})
    useEffect(() => {
        getNews()
    }, [])
    const getNews = () => {
        axios.get(`${API_URL}/articles${window.location.search}`)
            .then((res) => {
                setDetail(res.data[0])
            })
            .catch((err) => {

            })
    }
    return (
        <div className="container" style={{ margin: 'auto', paddingLeft: 150, paddingRight: 150 }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ paddingTop: 40, paddingBottom: 30 }}>{detatil.judul}</h1>
                <p>BY : Admin</p>
                <img width="100%" src={detatil.image} />
            </div>
            <div style={{paddingBottom:35,paddingTop:35}}>
                {detatil.deskripsi}
            </div>
        </div>
    )
}
export default DetailNewsPage
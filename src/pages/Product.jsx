import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle, ButtonGroup } from 'reactstrap';
import { API_URL } from '../helper';
const ProductPage = (props) => {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        getProduct()
    }, [])
    const getProduct = () => {
        axios.get(`${API_URL}/products`)
            .then((res) => {
                setProduct(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    const PrintProduct = () => {
        return product.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">

                <Card className="shadow mb-5 bg-white rounded">
                    <Link to={`/product-detail?id=${value.id}`}>
                        <CardImg
                            top
                            src={value.images[0]}
                            top width="100%"
                        />
                    </Link>
                    <CardBody className='d-flex'>
                        <CardTitle tag="h4" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                        <CardTitle tag="h5" style={{ fontWeight: "bolder", marginLeft: 'auto', marginTop: 3 }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        })
    }
    const PrintBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(product.length / 8); i++) {
            btn.push(<Button
                disabled={page == i + 1 ? true : false}
                onClick={() => setPage(i + 1)}>
                {i + 1}

            </Button>
            )
        }
        return btn;
    }
    return (
        <div className="container-fluid" style={{ paddingTop: '10vh' }}>
            <div className="row p-3">
                {PrintProduct()}
            </div>
            <div className="my-5 text-center">
                <ButtonGroup>
                    {PrintBtnPagination()}
                </ButtonGroup>
            </div>
        </div>
    )
}
export default ProductPage
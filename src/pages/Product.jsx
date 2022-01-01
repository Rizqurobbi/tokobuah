import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductAction, sortingProduct } from '../redux/actions'
import { Button, Card, CardBody, CardImg, CardTitle, ButtonGroup, UncontrolledCollapse, Alert, FormGroup, Label, Input, InputGroup, Row, InputGroupText } from 'reactstrap';
import { API_URL } from '../helper';

const ProductPage = (props) => {
    const { product } = useSelector((state) => {

        return {
            product: state.productsReducer.product,

        }
    })

    // const [product, setProduct] = useState([])
    const [page, setPage] = useState(1)
    // const [inputNama, setInputNama] = useState("")
    // const [inputMin, setInputMin] = useState(null)
    // const [inputMax, setInputMax] = useState(null)
    const [input, setInput] = useState({ Nama: "", Min: null, Max: null })
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductAction())
    }, [])
    console.log("dt", product)
    const PrintProduct = () => {
        return product.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">

                <Card className="shadow mb-5 bg-white rounded">
                    <Link to={`/product-detail?id=${value.id}`}>
                        <CardImg
                            top
                            src={value.images[0]}
                            top width="100%"
                            alt={`${value.nama}-${index}`}
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
            btn.push(<Button style={{backgroundColor:'black'}}
                disabled={page == i + 1 ? true : false}
                onClick={() => setPage(i + 1)}>
                {i + 1}

            </Button>
            )
        }
        return btn;
    }
    const btnSearch = () => {
        dispatch(getProductAction(input.Nama, input.Min, input.Max))
    }
    const handleInput = () => {

    }
    const btnReset = () => {
        dispatch(getProductAction())

    }
    const btnClick = (e) => {
        dispatch(sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        }))
    }
    return (
        <div className="container-fluid" style={{ marginTop: '8vh',padding:70 }}>
            <div className="shadow bg-white p-2 rounded mb-3">
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <FormGroup>
                        <Label>Nama</Label>
                        <Input type="text" id="text" placeholder="Cari produk"
                            onChange={(text) => setInput({ ...input, Nama: text.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Harga</Label>
                        <div className="d-flex">
                            <Input type="number" id="numb1" placeholder="Minimum"
                                onChange={(text) => setInput({ ...input, Min: text.target.value })} />
                            <Input type="number" id="numb2" placeholder="Maksimum"
                                onChange={(text) => setInput({ ...input, Max: text.target.value })} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sort</Label>
                        <InputGroup>
                            <Input type="select" style={{ width: "250px" }}
                                onChange={btnClick}>
                                {/* innerRef={(element) => this.inSearchSort = element} */}
                                <option value="harga-asc">Harga Asc</option>
                                <option value="harga-desc">Harga Desc</option>
                                <option value="nama-asc">A-Z</option>
                                <option value="nama-desc">Z-A</option>
                                <option value="id-asc">Reset</option>
                            </Input>
                            <InputGroupText style={{ cursor: "pointer" }} onClick={btnClick} >
                                Click
                            </InputGroupText>
                        </InputGroup>
                    </FormGroup>

                </div>
                <div className="pt-2" style={{ textAlign: "end" }}>
                    <Button outline color="warning" onClick={btnReset}>Reset</Button>
                    <Button style={{ marginLeft: 16 }} color="primary" onClick={btnSearch} >Filter</Button>
                </div>
            </div>
            <div className="row">
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
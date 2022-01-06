import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Button, ButtonGroup, Col, Collapse, FormGroup, Input, InputGroup, Label, Row, Table } from "reactstrap"
import { API_URL } from "../helper"
import { getProductAction, sortingProduct } from "../redux/actions"

const ProductManagementPage = (props) => {
    const { product } = useSelector((state) => {
        return {
            product: state.productsReducer.product
        }
    })
    const [page, setPage] = useState(1)
    const [openCollapse, setOpenCollapse] = useState(false)
    const [input, setInput] = useState({ Nama: "", Min: null, Max: null })
    const [inputAdd, setInputAdd] = useState({ namaProduct: "", manfaat: "", berat: null, kategori: "", harga: null })
    const [stockAdd, setStockAdd] = useState([])
    const [imageAdd, setImageAdd] = useState([])
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [thumbnailIdx, setThumbnailIdx] = useState(0)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductAction())
    },[0])
    
    
    const btnUpload = ()=>{
        let data ={
            nama:inputAdd.namaProduct,
            berat:inputAdd.berat,
            kategori:inputAdd.kategori,
            harga:inputAdd.harga,
            stock:stockAdd,
            images:imageAdd,
            manfaat:inputAdd.manfaat
        }
        if(data.nama==""||data.kategori==""||data.manfaat==""||data.images.length==0||data.stock.length==0){
            alert("Isi Semua Form")
        }else{
            axios.post(`${API_URL}/products`,data)
            .then((res)=>{
                dispatch(getProductAction(data))
                alert("Product berhasil bertambah")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    const btnRemove = (id) =>{
        axios.delete(`${API_URL}/products/${id}`)
        .then((res)=>{
            dispatch(getProductAction())
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const btnClick = (e) => {
        dispatch(sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        }))
    }
    const btnSearch = () => {
        dispatch(getProductAction(input.Nama, input.Min, input.Max))
    }
    const btnReset = () => {
        dispatch(getProductAction())
    }
    const btnAddStock = () => {
        stockAdd.push({ id: null, type: null, qty: null })
        setStockAdd(stockAdd)
    }
    const btnAddImage = () => {
        imageAdd.push("")
        setImageAdd(imageAdd)
    }
    const onBtDeleteStock = (index) => {
        stockAdd.splice(index, 1)
        setStockAdd(stockAdd)
    }
    const onBtDeleteImage = (index) => {
        imageAdd.splice(index, 1)
        setImageAdd(imageAdd)
    }
    const handleImages = (e, index) => {
        let temp = [...imageAdd]
        temp[index] = e.target.value
        setImageAdd(temp)
    }

    const handleType = (e, index) => {
        let temp = [...stockAdd]
        temp[index].type = e.target.value;
        setStockAdd(temp)
    }

    const handleQty = (e, index) => {
        let temp = [...stockAdd]
        temp[index].qty = parseInt(e.target.value)
        setStockAdd(temp)
    }
    const PrintBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(product.length / 2); i++) {
            btn.push(<Button
                style={{ backgroundColor: 'black' }}
                disabled={page == i + 1 ? true : false}
                onClick={() => setPage(i + 1)}>{i + 1}</Button>
            )
        }
        return btn;
    }
    const PrintStock = () => {
        if (stockAdd) {
            if (stockAdd.length > 0) {
                return stockAdd.map((value, index) => {
                    return (
                        <Row>
                            <Col>
                                <Input type="text" placeholder={`Type-${index + 1}`}
                                    onChange={(e) => handleType(e, index)} />
                            </Col>
                            <Col>
                                <Input type="number" placeholder={`Qty-${index + 1}`}
                                    onChange={(e) => handleQty(e, index)} />
                            </Col>
                            <Col>
                                <span style={{ color: '#BE0B06', textAlign: 'center', cursor: 'pointer' }} className="material-icons" onClick={() => onBtDeleteStock(value.id)}>
                                    delete
                                </span>
                            </Col>
                        </Row>
                    )
                })
            }
        }
    }
    const PrintImages = () => {
        if (imageAdd.length > 0) {
            return imageAdd.map((value, index) => {
                return (
                    <Row>
                        <Col>
                            <Input type="text" placeholder={`Images-${index + 1}`}
                                onChange={(e) => handleImages(e, index)} />
                        </Col>
                        <Col>
                            <span style={{ color: '#BE0B06', textAlign: 'center', cursor: 'pointer' }} className="material-icons" onClick={() => onBtDeleteImage(value.id)}>
                                delete
                            </span>
                        </Col>
                    </Row>
                )
            })
        }
    }
    const PrintProduct = () => {
        return product.slice(page > 1 ? (page - 1) * 2 : page - 1, page * 2).map((value, index) => {
            return (
                <tr>
                    <td>{page > 1 ? (page - 1) * 2 + index + 1 : index + 1}</td>
                    <td style={{ width: '20vw', textAlign: 'center' }}>
                        {
                            selectedIdx == index ?
                                <img src={value.images[thumbnailIdx]} width="80%" alt={value.nama + index} />
                                :
                                <img src={value.images[0]} width="80%" alt={value.nama + index} />
                        }
                        <div>
                            {value.images.map((val, idx) => {
                                return (
                                    <img src={val} width="20%" alt={value.nama + index}
                                        onClick={() => { setThumbnailIdx(idx); setSelectedIdx(index) }} />
                                )
                            })}
                        </div>
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.kategori}</td>
                    <td>{value.berat}</td>
                    <td>Rp. {value.harga.toLocaleString()}</td>
                    <td>
                        <Button type="button" size="sm" style={{ backgroundColor: 'black', borderRadius: 0 }}>Detail</Button>
                        <Button type="button" size="sm" style={{ backgroundColor: '#BE0B06', borderRadius: 0 }} onClick={()=>btnRemove(value.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className="container-fluid" style={{ marginTop: '8vh', padding: 70 }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => setOpenCollapse(!openCollapse)}
                        style={{
                            marginBottom: '1rem',
                            backgroundColor: '#BE0B06',
                            borderRadius: 0,
                            width: '10vw'
                        }}
                    >
                        <div style={{ display: 'flex', fontSize: 20 }}>
                            <span style={{ margin: 'auto', marginLeft: '1.3vw' }} className="material-icons">
                                filter_alt
                            </span>
                            <p style={{ margin: 'auto', marginRight: '5vw' }}>FILTER</p>
                        </div>
                    </Button>
                    <FormGroup>
                        <InputGroup>
                            <Input type="select" style={{ width: '250px', borderRadius: 0 }}
                                onChange={(e)=>btnClick(e)}>
                                <option value="id-asc">Sort</option>
                                <option value="harga-asc">Harga Asc</option>
                                <option value="harga-desc">Harga Desc</option>
                                <option value="nama-asc">A-Z</option>
                                <option value="nama-desc">Z-A</option>
                                <option value="id-asc">Reset</option>
                            </Input>
                        </InputGroup>
                    </FormGroup>
                </div>
                <Collapse isOpen={openCollapse} horizontal>
                    <div className="shadow bg-white p-2 rounded mb-3">
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari Produk"
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
                        </div>
                        <div className="pt-2" style={{ textAlign: 'end' }}>
                            <Button outline color="warning" onClick={btnReset}>Reset</Button>
                            <Button style={{ marginLeft: 16 }} color="primary" onClick={btnSearch}>Filter</Button>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="row">
                <div className="col-8">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Nama</th>
                                <th>Kategori</th>
                                <th>Berat</th>
                                <th>Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PrintProduct()}
                        </tbody>
                    </Table>
                </div>
                <div className="col-4">
                    {console.log(inputAdd)}
                    <div className="shadow bg-white" style={{ padding: 60 }}>
                        <h3 style={{ textAlign: 'center' }}>Add Product</h3>
                        <FormGroup>
                            <Label>Nama Product</Label>
                            <Input type="text" id="nama" onChange={(text) => setInputAdd({ ...inputAdd, namaProduct: text.target.value })}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Manfaat Product</Label>
                            <Input type="text" id="manfaat" onChange={(text) => setInputAdd({ ...inputAdd, manfaat: text.target.value })}></Input>
                        </FormGroup>
                        <div className="row">
                            <div className="col-6">
                                <FormGroup>
                                    <Label>Berat</Label>
                                    <Input type="number" id="berat" onChange={(num) => setInputAdd({ ...inputAdd, berat: num.target.value })}></Input>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label>Kategori</Label>
                                    <Input type="text" id="kategori" onChange={(text) => setInputAdd({ ...inputAdd, kategori: text.target.value })}></Input>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup>
                            <Label>Harga</Label>
                            <Input type="number" id="harga" onChange={(num) => setInputAdd({ ...inputAdd, harga: num.target.value })}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Stock</Label>
                            <Button type="button" size="sm" style={{ float: 'right',borderRadius:0,backgroundColor:'black' }} onClick={btnAddStock}>ADD</Button>
                            {PrintStock()}
                        </FormGroup>
                        <hr />
                        <FormGroup>
                            <Label>Images</Label>
                            <Button type="button" size="sm" style={{ float: 'right',borderRadius:0,backgroundColor:'black' }} onClick={btnAddImage}>ADD</Button>
                            {PrintImages()}
                        </FormGroup>
                        <Button style={{marginTop:10,width:'100%',borderRadius:0,backgroundColor:'black'}} onClick={btnUpload}>UPLOAD</Button>
                    </div>
                </div>
            </div>
            <div className="my-5 text-center">
                <ButtonGroup>
                    {PrintBtnPagination()}
                </ButtonGroup>
            </div>
        </div>
    )
}
export default ProductManagementPage
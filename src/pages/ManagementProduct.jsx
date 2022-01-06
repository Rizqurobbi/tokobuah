import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { connect } from 'react-redux';
import { getProductAction, sortingProduct } from "../redux/actions"
import { Button, ButtonGroup, Col, Collapse, FormGroup, Input, InputGroup, Label, Row, Table } from "reactstrap"
import ModalDetailProduct from '../component/ModalDetailProduct';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            openCollapse: false,
            modalDetailOpen:false,
            input: ({ Nama: "", Min: null, Max: null }),
            inputAdd: ({ namaProduct: "", manfaat: "", berat: null, kategori: "", harga: null }),
            stockAdd: [],
            imageAdd: [],
            selectedIdx: null,
            thumbnailIdx: 0,
            detailProduk:{}
        }
    }
    componentDidMount() {
        this.props.getProductAction()
    }
    btnUpload = ()=>{
        let data ={
            nama:this.inNama.value,
            berat:this.inBerat.value,
            kategori:this.inKategori.value,
            harga:this.inHarga.value,
            stock:this.state.stockAdd,
            images:this.state.imageAdd,
            manfaat:this.inManfaat.value
        }
        if(data.nama==""||data.kategori==""||data.manfaat==""||data.images.length==0||data.stock.length==0){
            alert("Isi Semua Form")
        }else{
            axios.post(`${API_URL}/products`,data)
            .then((res)=>{
                this.props.getProductAction()
                alert("Product berhasil bertambah")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    btnAddStock = () => {
        // let tempStock = [...this.state.stock]
        this.state.stockAdd.push({ id: null, type: null, qty: null })
        this.setState({ stockAdd: this.state.stockAdd })
    }
    btnAddImage = () => {
        this.state.imageAdd.push("")
        this.setState({ imageAdd: this.state.imageAdd })
    }
    btnClick = (e) => {
        this.props.sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }
    btnSearch = () => {
        this.props.getProductAction(this.inSearchName.value, this.inSearchMinHarga.value, this.inSearchMaxHarga.value)
    }
    btnReset = () => {
        this.props.getProductAction()
        // this.inSearchName.value = ""
        // this.inSearchMinHarga.value = ""
        // this.inSearchMaxHarga.value = ""
    }
    btnRemove = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductAction()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onBtDeleteStock = (index) => {
        this.state.stockAdd.splice(index, 1)
        this.setState({ stockAdd: this.state.stockAdd })
    }

    onBtDeleteImage = (index) => {
        this.state.imageAdd.splice(index, 1)
        this.setState({ imageAdd: this.state.imageAdd })
    }

    // Untuk set value kedalam state.images
    handleImages = (e, index) => {
        let temp = [...this.state.imageAdd]
        temp[index] = e.target.value
        this.setState({ imageAdd: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.state.stockAdd]
        temp[index].type = e.target.value;
        this.setState({ stockAdd: temp })
    }

    handleQty = (e, index) => {
        let temp = [...this.state.stockAdd]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stockAdd: temp })
    }
    PrintBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.product.length / 2); i++) {
            btn.push(<Button
                style={{ backgroundColor: 'black' }}
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>{i + 1}</Button>
            )
        }
        return btn;
    }
    PrintStock = () => {
        if (this.state.stockAdd) {
            if (this.state.stockAdd.length > 0) {
                return this.state.stockAdd.map((value, index) => {
                    return (
                        <Row>
                            <Col>
                                <Input type="text" placeholder={`Type-${index + 1}`}
                                    onChange={(e) => this.handleType(e, index)} />
                            </Col>
                            <Col>
                                <Input type="number" placeholder={`Qty-${index + 1}`}
                                    onChange={(e) => this.handleQty(e, index)} />
                            </Col>
                            <Col>
                                <span style={{ color: '#BE0B06', textAlign: 'center', cursor: 'pointer' }} className="material-icons" onClick={() => this.onBtDeleteStock(value.id)}>
                                    delete
                                </span>
                            </Col>
                        </Row>
                    )
                })
            }
        }
    }
    PrintImages = () => {
        if (this.state.imageAdd.length > 0) {
            return this.state.imageAdd.map((value, index) => {
                return (
                    <Row>
                        <Col>
                            <Input type="text" placeholder={`Images-${index + 1}`}
                                onChange={(e) => this.handleImages(e, index)} />
                        </Col>
                        <Col>
                            <span style={{ color: '#BE0B06', textAlign: 'center', cursor: 'pointer' }} className="material-icons" onClick={() => this.onBtDeleteImage(value.id)}>
                                delete
                            </span>
                        </Col>
                    </Row>
                )
            })
        }
    }
    PrintProduct = () => {
        let { page } = this.state
        return this.props.product.slice(page > 1 ? (page - 1) * 2 : page - 1, page * 2).map((value, index) => {
            return (
                <tr>
                    <td>{page > 1 ? (page - 1) * 2 + index + 1 : index + 1}</td>
                    <td style={{ width: '20vw', textAlign: 'center' }}>
                        {
                            this.state.selectedIdx == index ?
                                <img src={value.images[this.state.thumbnailIdx]} width="80%" alt={value.nama + index} />
                                :
                                <img src={value.images[0]} width="80%" alt={value.nama + index} />
                        }
                        <div>
                            {value.images.map((val, idx) => {
                                return (
                                    <img src={val} width="20%" alt={value.nama + index}
                                    onClick={() => this.setState({ thumbnailIdx: idx, selectedIdx: index })} />
                                )
                            })}
                        </div>
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.kategori}</td>
                    <td>{value.berat}gram</td>
                    <td>Rp. {value.harga.toLocaleString()}</td>
                    <td>
                        <Button type="button" size="sm" style={{ backgroundColor: 'black', borderRadius: 0 }} onClick={()=>this.setState({detailProduk:value,modalDetailOpen:!this.state.modalDetailOpen})}>Detail</Button>
                        <Button type="button" size="sm" style={{ backgroundColor: '#BE0B06', borderRadius: 0 }} onClick={()=>this.btnRemove(value.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container-fluid" style={{ marginTop: '8vh', padding: 70 }}>
                <ModalDetailProduct
                modalOpen={this.state.modalDetailOpen}
                detailProduct={this.state.detailProduk}
                btnClose={()=>this.setState({modalDetailOpen:!this.state.modalDetailOpen})}/>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => this.setState({openCollapse:!this.state.openCollapse})}
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
                                onChange={this.btnClick}>
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
                <Collapse isOpen={this.state.openCollapse} horizontal>
                    <div className="shadow bg-white p-2 rounded mb-3">
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari Produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className="d-flex">
                                    <Input type="number" id="numb1" placeholder="Minimum"
                                        innerRef={(element) => this.inSearchMinHarga = element} />
                                    <Input type="number" id="numb2" placeholder="Maksimum"
                                       innerRef={(element) => this.inSearchMaxHarga = element} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="pt-2" style={{ textAlign: 'end' }}>
                            <Button outline color="warning" onClick={this.btnReset}>Reset</Button>
                            <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btnSearch}>Filter</Button>
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
                            {this.PrintProduct()}
                        </tbody>
                    </Table>
                </div>
                <div className="col-4">
                    {console.log(this.state.inputAdd)}
                    <div className="shadow bg-white" style={{ padding: 60 }}>
                        <h3 style={{ textAlign: 'center' }}>Add Product</h3>
                        <FormGroup>
                            <Label>Nama Product</Label>
                            <Input type="text" id="nama" innerRef={elemen => this.inNama = elemen}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Manfaat Product</Label>
                            <Input type="text" id="manfaat"innerRef={elemen => this.inManfaat = elemen}></Input>
                        </FormGroup>
                        <div className="row">
                            <div className="col-6">
                                <FormGroup>
                                    <Label>Berat</Label>
                                    <Input type="number" id="berat"innerRef={elemen => this.inBerat = elemen}></Input>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label>Kategori</Label>
                                    <Input type="text" id="kategori" innerRef={elemen => this.inKategori = elemen}></Input>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup>
                            <Label>Harga</Label>
                            <Input type="number" id="harga" innerRef={elemen => this.inHarga = elemen}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Stock</Label>
                            <Button type="button" size="sm" style={{ float: 'right',borderRadius:0,backgroundColor:'black' }} onClick={this.btnAddStock}>ADD</Button>
                            {this.PrintStock()}
                        </FormGroup>
                        <hr />
                        <FormGroup>
                            <Label>Images</Label>
                            <Button type="button" size="sm" style={{ float: 'right',borderRadius:0,backgroundColor:'black' }} onClick={this.btnAddImage}>ADD</Button>
                            {this.PrintImages()}
                        </FormGroup>
                        <Button style={{marginTop:10,width:'100%',borderRadius:0,backgroundColor:'black'}} onClick={this.btnUpload}>UPLOAD</Button>
                    </div>
                </div>
            </div>
            <div className="my-5 text-center">
                <ButtonGroup>
                    {this.PrintBtnPagination()}
                </ButtonGroup>
            </div>
        </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        product: state.productsReducer.product
    }
}
export default connect(mapToProps, { getProductAction, sortingProduct })(ProductManagement);
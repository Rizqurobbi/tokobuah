import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';

class ModalDetailProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            images: [],
            edit: false
        }
    }
    btnSave = () =>{
        let data = {
            nama:this.inNama.value,
            berat:this.inBerat.value,
            kategori:this.inKategori.value,
            harga:this.inHarga.value,
            stock:this.state.stock.length==0?this.props.detailProduct.stock:this.state.stock,
            images:this.state.images.length==0?this.props.detailProduct.images:this.state.images,
            manfaat:this.inManfaat.value
        }
        axios.patch(`${API_URL}/products/${this.props.detailProduct.id}`,data)
        .then((res)=>{
            this.props.getProductAction()
            this.setState({stock:[],images:[],edit:!this.state.edit})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleImages = (e, index) => {
        let temp = [...this.props.detailProduct.images]
        temp[index] = e.target.value
        this.setState({ images: temp })
    }
    handleType = (e, index) => {
        let temp = [...this.props.detailProduct.stock]
        temp[index] = e.target.value
        this.setState({ stock: temp })
    }
    handleQty = (e, index) => {
        let temp = [...this.props.detailProduct.stock]
        temp[index] = e.target.value
        this.setState({ stock: temp })
    }

    printStock = () => {
        if (this.props.detailProduct.stock) {
            return this.props.detailProduct.stock.map((value, index) => {
                return (
                    <Row>
                        <Col>
                            <Input disabled={!this.state.edit} type="text" defaultValue={value.type} placeholder={`Type${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                        </Col>
                        <Col>
                            <Input disabled={!this.state.edit} type="number" defaultValue={value.qty} placeholder={`Stock${index + 1}`} onChange={(e) => this.handleQty(e, index)} />
                        </Col>
                        <Col>
                            <span style={{ cursor: 'pointer' }}>Delete</span>
                        </Col>
                    </Row>
                )
            })
        }
    }
    printImages = () => {
        if (this.props.detailProduct.images) {
            return this.props.detailProduct.images.map((value, index) => {
                return <Input disabled={!this.state.edit} type="text" defaultValue={value} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
    }
    render() {
        let { nama, manfaat, berat, kategori, harga } = this.props.detailProduct
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btnClose}>
                <ModalHeader toggle={this.props.btnClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Nama Product</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={nama} innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Manfaat</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={manfaat} innerRef={elemen => this.inManfaat = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Berat(gram)</Label>
                                <Input disabled={!this.state.edit} type="number" defaultValue={berat} innerRef={elemen => this.inBerat = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Kategori</Label>
                                <Input disabled={!this.state.edit} type="text" defaultValue={kategori} innerRef={elemen => this.inKategori = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Harga</Label>
                        <Input disabled={!this.state.edit} type="number" defaultValue={harga} innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        {this.printStock()}
                    </FormGroup>
                    <FormGroup>
                        <Label>Images</Label>
                        {this.printImages()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.edit?
                        <Button type="button" onClick={this.btnSave}>Save</Button>
                        :
                        <Button type="button" onClick={()=>this.setState({edit:!this.state.edit})}>Edit</Button>

                    }
                    <Button onClick={()=>{this.setState({edit:!this.state.edit});this.props.btnClose()}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null,{getProductAction}) (ModalDetailProduct);
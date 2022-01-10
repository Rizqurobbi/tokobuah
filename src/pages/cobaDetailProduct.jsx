import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { API_URL } from '../helper';
import '../component/coba.css'

class RevisiGaming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            counter: 0,
            selectedType: {}
        }
    }
    componentDidMount() {
        this.getPRoduct()
    }
    getPRoduct = () => {
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                this.setState({ detail: response.data[0] })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderImage = () => {
        let { images } = this.state.detail
        return images.map((value, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded mx-1"
                    src={value}
                    key={index}
                    width="100%"
                    style={{ border: this.state.thumbnail == index && "2px solid red" }}
                    onClick={() => this.setState({ thumbnail: index })} />
            )
        })
    }
    printProduct = () => {
        let { detail } = this.state
        return detail.id &&

            <>
                <div className="row">
                    <div className="col-4 text-center">
                        <img style={{ height: '40vh' }} src={detail.images[this.state.thumbnail]} />
                        <div className="col-4 d-flex" style={{ margin: 0, left: 0, right: 0, top: 0, bottom: 0, padding: 20 }}>
                            {this.renderImage()}
                        </div>
                    </div>
                    <div className="col-8">
                        <h2>{detail.nama}</h2>
                        <h5 style={{ color: 'grey', marginTop: '-1vh' }}>{detail.berat}gram</h5>
                        <h1 style={{ color: '#BE0B06' }}>Rp. {detail.harga.toLocaleString()}</h1>
                        <p>Benefits will you get</p>
                        <p>{detail.manfaat}</p>
                        <div className="d-flex">
                            <div style={{ marginRight: 10 }}>
                                <p style={{ color: 'grey', fontWeight: 'bold' }}>Choose type :</p>
                                {
                                    detail.stock.map((value, index) => {
                                        return <div>
                                            <Button style={{ borderRadius: 0, backgroundColor: 'black' }} onClick={() => this.setState({ selectedType: value, counter: 1 })}>{value.type} : {value.qty}</Button>
                                        </div>
                                    })
                                }
                            </div>
                            <div className=" d-flex  " style={{ fontSize: 20 }}>
                                <input className='col-1 text-center border border-dark' placeholder="counter" style={{ height: 80, width: '5.4vw', display: 'inline-block' }} type="text" value={this.state.counter} />
                                <div className="border border-dark d-flex flex-column" style={{ width: 41, justifyContent: 'space-between' }}>
                                    <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black' }}>+</Button>
                                    <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black' }}>-</Button>
                                </div>
                            </div>
                        </div>
                        <Button className="button" style={{ borderRadius: 0, width: '15vw', marginTop: 15 }} >ADD TO CART</Button>
                    </div>
                </div>

            </>


    }
    render() {
        return (
            <Container style={{ padding: '20vh' }}>
                {console.log(this.state.detail)}
                {this.printProduct()}

            </Container>
        );
    }
}

export default RevisiGaming;
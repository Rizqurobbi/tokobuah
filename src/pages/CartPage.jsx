import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Collapse, Input, Table } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/actions/userAction'
class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openColapse: false,

        }
    }
    tesKriuk = () => {
        this.tes.value = ""
    }
    
    btnIncrement = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty <= temp[index].qty) {

            temp[index].qty += 1
            this.props.updateUserCart(temp, this.props.iduser)
        }
    }
    btnDecrement = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
            this.props.updateUserCart(temp, this.props.iduser)
        }
    }
    btnRemove = (index) => {
        let temp = [...this.props.cart]
        temp.splice(index, 1)
        this.props.updateUserCart(temp, this.props.iduser)
    }
    totalPrice = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += value.qty * value.harga)
        return total
    }
    shipping = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += (value.qty * value.harga) * 20 / 100)
        return total
    }
    totalPayment = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += value.qty * value.harga)
        return total + this.shipping()
    }
    totalBeratBuah = () => {
        let total = 0;
        this.props.cart.forEach((value) => total += value.qty * value.berat)
        return total
    }
    btnCheckOut =()=>{
        const d = new Date()
        axios.post(`${API_URL}/userTransactions`,{
            iduser:this.props.iduser,
            username:this.props.username,
            invoice:`#INV/${d.getTime()}`,
            date:d.toLocaleDateString(),
            totalPrice:this.totalPrice(),
            shipping:this.shipping(),
            totalPayment:this.totalPayment(),
            totalBeratBuah:this.totalBeratBuah(),
            detail:[...this.props.cart],
            status :'Menunggu Konfirmasi'
        })
        .then((res)=>{
            this.props.updateUserCart([],this.props.iduser)
        })
    }
    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <tr>
                    <td className="d-flex" >
                        <div className="col-3">
                            <img width="100%" src={value.image} />
                        </div>
                        <div className="mx-3" style={{ padding: 15 }}>
                            <p style={{ fontSize: 14, color: '#BE0B06' }}>{value.nama}</p>
                            <p style={{ fontSize: 14, marginTop: "-2.7vh", color: 'grey' }}>{value.berat}gram/pcs</p>
                            <p style={{ fontSize: 14, marginTop: "-2.7vh", color: 'grey' }}>{value.berat * value.qty}gram(Total)</p>
                        </div>
                    </td>
                    <td>
                        <p style={{ textAlign: 'center', marginTop: 45 }}>Rp. {value.harga.toLocaleString()}</p>
                    </td>
                    <td style={{ textAlign: 'center', }}>
                        <div className=" d-flex" style={{ marginLeft: 53, marginTop: 20 }}>
                            <input className='col-4 text-center border-dark' placeholder="counter" style={{ height: 80, display: 'inline-block', width: "50%" }} type="text" value={value.qty} />
                            <div className="d-flex flex-column" style={{ width: 40, justifyContent: 'space-between' }}>
                                <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black', borderColor: 'black', borderWidth: 2 }} onClick={() => this.btnIncrement(index)}>+</Button>
                                <Button style={{ width: "100%", borderRadius: 0, height: '100%', backgroundColor: 'transparent', color: 'black', borderColor: 'black', borderWidth: 2 }} onClick={() => this.btnDecrement(index)}>-</Button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p style={{ textAlign: 'center', marginTop: 45 }}>Rp. {value.harga * value.qty.toLocaleString()}</p>
                    </td>
                    <td>
                        <span style={{ color: '#BE0B06', marginLeft: 53, marginTop: 45, cursor: 'pointer' }} className="material-icons" onClick={() => this.btnRemove(index)}>
                            delete
                        </span>

                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container-fluid">

                {/* <div className="row">
                    <div className="col-8" style={{borderBottom:'5px solid red',marginBottom:'4vh', marginTop:'4vh'}}>
                        <h3>{this.props.cart.length} Items</h3>
                    </div>
                        <div className="col-8">
                            {this.prinCart()}
                        </div>
                    <div className="col-4">
                        <p>halo</p>
                    </div>
                </div> */}
                <div className="container" style={{ padding: '10vh' }}>
                    <Table bordered style={{ height: 20 }}>
                        <thead>
                            <tr>
                                <th style={{ width: "20vw" }}>PRODUCT NAME</th>
                                <th style={{ width: "5vw", textAlign: 'center' }}>PRICE</th>
                                <th style={{ width: "10vw", textAlign: 'center' }}>QUANTITY</th>
                                <th style={{ width: "5vw", textAlign: 'center' }}>TOTAL</th>
                                <th style={{ width: "5vw", textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printCart()}
                        </tbody>
                    </Table>
                    <div className="d-flex">
                        {/* <Button style={{ height: '60px', marginTop: '3vh', marginBottom: '3vh', borderRadius: 0, backgroundColor: '#BE0B06', width: 300 }}>CONTINUE SHOPPING</Button> */}
                        <div style={{ border: '1px solid grey', padding: 30, width: "24vw", marginLeft: 'auto' }}>
                            <div>
                                <div style={{ justifyContent: 'space-between', borderBottom: '1px solid grey', }}>
                                    <p>Cart Total <Badge>{this.props.cart.length}</Badge></p>
                                    <div style={{ display: 'flex',justifyContent: 'space-between' }}>
                                        <p>Total Berat Buah</p>
                                        <p>{this.totalBeratBuah()}gram</p>
                                    </div>
                                </div>
                                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                                    <p>Total Price</p>
                                    <p>Rp. {(this.totalPrice()).toLocaleString()}</p>
                                </div>
                                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                                    <p>Shipping</p>
                                    <p>Rp. {(this.shipping()).toLocaleString()}</p>
                                </div>
                                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                                    <p>Total Payment</p>
                                    <p>Rp. {(this.totalPayment()).toLocaleString()}</p>
                                </div>
                                <Button style={{ height: '60px', marginTop: '3vh', marginBottom: '3vh', borderRadius: 0, backgroundColor: 'black', width: 300 }}onClick={()=>this.btnCheckOut()}>PROCEED TO CHECKOUT</Button>
                                <Link to="/products">
                                    <p style={{ color: '#BE0B06', float: 'right', cursor: 'pointer' }} >Continue Shopping</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                    {/* <div style={{ border: '1px solid grey', padding: 30, width: "24vw" }}>
                        <div>
                            <p>Cart Total</p>
                            <p>Total</p>
                            <Button style={{ height: '60px', marginTop: '3vh', marginBottom: '3vh', borderRadius: 0, backgroundColor: 'black', width: 300 }}>PROCEED TO CHECKOUT</Button>
                        </div>

                    </div> */}
                </div>




            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id,
        username :state.userReducer.username
    }
}
export default connect(mapToProps, { updateUserCart })(CartPage);
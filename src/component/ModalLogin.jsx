import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { onLogin } from '../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col, Toast, ToastHeader, ToastBody, Container, InputGroup, InputGroupText } from 'reactstrap';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
// const ModalLogin = (props) => {
//     const { role, iduser } = useSelector((state) => {
//         return {
//             // username: state.userReducer.username,
//             // role: state.userReducer.role,
//             iduser: state.userReducer.id,
//         }
//     })
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [email, setEmail] = useState('')
//     const dispatch = useDispatch()

//     const btnLogin = async () => {
//      try {

//          let res = await dispatch(onLogin(username, password))
//          if(res){
//              props.btClose()

//          }
//      } catch (error) {
//          console.log(error)
//      }   

//     }

//     return (
//         <Modal isOpen={props.modalOpen} toggle={props.btClose} >
//             <ModalHeader toggle={props.btClose}>Login</ModalHeader>
//             <ModalBody>
//                 <FormGroup>
//                     <Label for="textNama">Username</Label>
//                     <Input type="text" id="textNama" onChange={(e) =>setUsername(e.target.value)} />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="textPass">Password</Label>
//                     <Input type="text" id="textPass" onChange={(e) =>setPassword(e.target.value)} />
//                     {console.log(username)}
//                 </FormGroup>
//             </ModalBody>
//             <ModalFooter>
//                 <Button style={{ width: '100%' }} onClick={() => { btnLogin() }}>Login</Button>
//                 <a style={{ margin: 'auto' }} >Don't have an account?
//                     <a style={{ cursor: 'pointer' }} onClick={() => { props.modalOpenRegis(); props.btClose() }}> Register here</a>
//                 </a>
//             </ModalFooter>
//         </Modal>
//     )
// }
// export default ModalLogin
class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toastOpen: false,
            toastHeader: "",
            toastMessage: "",
            toastIcon: "",
            passShow: "",
            passType: ""
        }
    }
    btnLogin = async () => {
        try {

            let res = await this.props.onLogin(this.username.value, this.password.value)
            if (this.username.value == "" || this.password.value == "") {
                // alert("Input belum terisi")
                this.setState({
                    toastOpen: true,
                    toastHeader: "Login Warning",
                    toastIcon: "warning",
                    toastMessage: "Input belum terisi"
                })
            } else {
                if (res) {
                    this.props.btClose()
                } else {
                    // alert("Username atau Password tidak sesuai")
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Login Warning",
                        toastIcon: "warning",
                        toastMessage: "Username atau Password tidak sesuai"
                    })
                }

            }
        } catch (error) {
            console.log(error)
        }

    }
    btnShowPass = () => {
        if (this.state.passType == "password") {
            this.setState({
                passShow: <span class="material-icons">
                visibility
                </span>,
                passType: "text"
            })
        } else {
            this.setState({
                passShow: <span class="material-icons">
                visibility_off
                </span>
                ,
                passType: "password"
            })
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                <Toast isOpen={this.state.toastOpen} style={{ position: 'fixed', marginLeft: '20vh', zIndex: 20 }}>
                    <ToastHeader icon={this.state.toastIcon} toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}

                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>

                </Toast>
                <Container style={{ padding: '5vw' }}>
                    <ModalHeader>
                        <img style={{ marginLeft: '7vh' }} src="https://cdn.shopify.com/s/files/1/0572/5005/4294/files/cc-removebg-preview.png?v=1624871969" width="180px" />
                        <p style={{ marginLeft: '6vh' }}>Great to have you back!</p>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="textNama">Username</Label>
                            <Input type="text" id="textNama" innerRef={(e) => this.username = e} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPass">Password</Label>
                            <InputGroup>
                                <Input type={this.state.passType} id="textPass" innerRef={(e) => this.password = e} />
                                <InputGroupText style={{ cursor: 'pointer',background:'transparent' }} onClick={this.btnShowPass}>
                                    {this.state.passShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ width: '100%' }} onClick={() => { this.btnLogin() }}>Login</Button>
                        <a style={{ margin: 'auto' }} >Don't have an account?
                            <a style={{ cursor: 'pointer' }} onClick={() => { this.props.modalOpenRegis(); this.props.btClose() }}> Register here</a>
                        </a>
                    </ModalFooter>
                </Container>
            </Modal>
        );
    }
}

export default connect(null, { onLogin })(ModalLogin);
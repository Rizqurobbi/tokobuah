import { useState } from "react"
import React from 'react';
import { connect, useDispatch } from "react-redux"
import { onRegis } from "../redux/actions"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col, Toast, ToastHeader, ToastBody, Container } from 'reactstrap';
import axios from "axios";
import { API_URL } from "../helper";

class ModalRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toastOpen: false,
            toastHeader: "",
            toastMessage: "",
            toastIcon: "",

        }
    }
    btnRegis = () => {
        if (this.username.value == "" || this.password.value == "" || this.email.value == "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastMessage: "Isi semua form",
            })
        } else {
            if (this.email.value.includes("@")) {

                axios.post(`${API_URL}/users`, {
                    username: this.username.value,
                    email: this.password.value,
                    password: this.email.value,
                    role: "User",
                    status: "Active",
                    cart: []
                }).then((response) => {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Status",
                        toastIcon: "success",
                        toastMessage: "Registrasi Berhasil"
                    })
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Jangan lupa @ untuk email"
                })
            }
        }

    }
    render() {
        return (
            <Modal id='modalRegis' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered>
                <Toast isOpen={this.state.toastOpen} style={{ position: 'fixed', marginLeft: '20vh', zIndex: 20 }}>
                    <ToastHeader icon={this.state.toastIcon} toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}

                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>

                </Toast>
                <Container style={{ padding: '5vw' }}>

                    <ModalHeader >
                        <img style={{ marginLeft: '7vh' }} src="https://cdn.shopify.com/s/files/1/0572/5005/4294/files/cc-removebg-preview.png?v=1624871969" width="180px" />
                        <p style={{ marginLeft: '5vh' }}>Make your account here!</p>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="textNama">Username</Label>
                            <Input type="text" id="textNama" innerRef={(e) => this.username = e} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPass">Email</Label>
                            <Input type="text" id="textPass" innerRef={(e) => this.email = e} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPass">Password</Label>
                            <Input type="text" id="textPass" innerRef={(e) => this.password = e} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ width: '100%' }} onClick={this.btnRegis}>Register</Button>
                        <a style={{ margin: 'auto' }} >Already have an account?
                            <a style={{ cursor: 'pointer' }} onClick={() => { this.props.modalOpenLogin(); this.props.btClose() }}> Login here</a>
                        </a>
                    </ModalFooter>
                </Container>
            </Modal>
        );
    }
}

export default connect(null, { onRegis })(ModalRegister);
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onLogin } from '../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
const ModalLogin = (props) => {
    const {  role ,iduser} = useSelector((state) => {
        return {
            // username: state.userReducer.username,
            // role: state.userReducer.role,
            iduser: state.userReducer.id,
        }
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const btnLogin = async () => {

        let res = await dispatch(onLogin(username, password))
        if (res > 0) {
            alert("Halo")
        }
    }
    
    return (
        <Modal isOpen={props.modalOpen} toggle={props.btClose} >
            <ModalHeader toggle={props.btClose}>Login</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="textNama">Username</Label>
                    <Input type="text" id="textNama" onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="textPass">Password</Label>
                    <Input type="text" id="textPass" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button style={{ width: '100%' }} onClick={() => { btnLogin() }}>Login</Button>
                <a style={{ margin: 'auto' }} >Don't have an account?
                    <a style={{ cursor: 'pointer' }} onClick={() => { props.modalOpenRegis(); props.btClose() }}> Register here</a>
                </a>
            </ModalFooter>
        </Modal>
    )
}
export default ModalLogin
import { useState } from "react"
import { useDispatch } from "react-redux"
import { onRegis } from "../redux/actions"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from "axios";
import { API_URL } from "../helper";

const ModalRegister = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const btnRegis =  () => {
        if(username==""||password==""||email==""){
            alert("tes")
        }else{
            axios.post(`${API_URL}/users`,{
                username,
                email,
                password,
                role:"User",
                status:"Active",
                cart:[]
            })
        }


         
        


    }
    return (
        // <div class="modal fade" id="modalRegis" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //     <div class="modal-dialog">
        //         <div class="modal-content">
        //             <div class="modal-header">
        //                 <h5 class="modal-title" id="modalRegis">Register</h5>
        //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                     <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div class="modal-body">
        //                 <form style={{ width: "100%", margin: 'auto' }}>
        //                     <div className="form-group">
        //                         <label for="username" >Username</label>
        //                         <input type="text" className='form-control' id="username" onChange={(e) => setUsername(e.target.value)}></input>
        //                         {console.log(username)}
        //                     </div>
        //                     <div className="form-group">
        //                         <label for="email" >Email</label>
        //                         <input type="text" className='form-control' id="email" onChange={(e) => setEmail(e.target.value)}></input>
        //                     </div>
        //                     <div className="form-group">
        //                         <label for="password" >Password</label>
        //                         <input type="text" className='form-control' id="password" onChange={(e) => setPassword(e.target.value)}></input>
        //                     </div>
        //                     <div>

        //                     </div>
        //                 </form>
        //             </div>
        //             <div class="modal-footer">
        //                 <button className='btn btn-success' style={{ width: '100%' }} onClick={btnRegis}>Register</button>
        //                 <a style={{ margin: 'auto' }} >Already have an account?
        //                     <a style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#modalLogin" data-dismiss="modal"> Login here</a>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Modal id='modalRegis' isOpen={props.modalOpen} toggle={props.btClose} >
            <ModalHeader toggle={props.btClose}>Register</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="textNama">Username</Label>
                    <Input type="text" id="textNama" onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="textPass">Email</Label>
                    <Input type="text" id="textPass" onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="textPass">Password</Label>
                    <Input type="text" id="textPass" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button style={{ width: '100%' }} onClick={btnRegis}>Register</Button>
                <a style={{ margin: 'auto' }} >Already have an account?
                    <a style={{ cursor: 'pointer' }} onClick={() => { props.modalOpenLogin(); props.btClose() }}> Login here</a>
                </a>
            </ModalFooter>
        </Modal>
    )
}
export default ModalRegister
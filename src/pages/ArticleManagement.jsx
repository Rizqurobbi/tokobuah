import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"
import { Button, FormGroup, Input, InputGroup, Label, Table } from 'reactstrap';
import { API_URL } from '../helper';
import { updateArticle } from '../redux/actions'
const ArticleManagement = (props) => {
    const { articleList } = useSelector((state) => {
        return {
            articleList: state.articleReducer.articleList
        }
    })
    const [input, setInput] = useState({ Image: "", Judul: "", Deskripsi: "" })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateArticle())
    }, [])
    const btnUpload = () => {
        let data = {
            image: input.Image,
            judul: input.Judul,
            deskripsi: input.Deskripsi
        }
        console.log(data)
        if (input.Image == "" || input.Judul == "" || input.Deskripsi == "") {
            alert("Isi semua form")
        } else {
            axios.post(`${API_URL}/articles`, data)
                .then(res => {
                    dispatch(updateArticle(data))
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    const btnRemove = (id) => {
        axios.delete(`${API_URL}/articles/${id}`)
            .then((res) => {
                dispatch(updateArticle())
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const PrintArticle = () => {
        return articleList.map((value, index) => {
            return (
                <tr>
                    <td>
                        {index + 1}
                    </td>
                    <td>
                        <img src={value.image} width="100%" />
                    </td>
                    <td>
                        <p>{value.judul}</p>
                    </td>
                    <td>
                        <p>{value.deskripsi}</p>
                    </td>
                    <td>
                        <span style={{ color: '#BE0B06', textAlign: 'center', cursor: 'pointer' }} className="material-icons" onClick={() => btnRemove(value.id)}>
                            delete
                        </span>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className="container">
            <div className="row">

                <div className="col-8" >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={{ width: '1vw' }}>#</th>
                                <th style={{ width: '10vw' }}>IMAGES</th>
                                <th style={{ width: '20vw' }}>JUDUL</th>
                                <th style={{ width: '20vw' }}>DETAIL</th>
                                <th style={{ width: '1vw' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PrintArticle()}
                        </tbody>
                    </Table>
                </div>
                <div className="col-4">
                    <div className="shadow bg-white " style={{ padding: 60 }}>

                        <h3 style={{ textAlign: 'center' }}>Add Article</h3>
                        <FormGroup>
                            <Label for="nama">Image</Label>
                            <Input type="text" id="image" onChange={(text) => setInput({ ...input, Image: text.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="judul">Judul Article</Label>
                            <Input type="text" id="judul" onChange={(text) => setInput({ ...input, Judul: text.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi">Description</Label>
                            <Input type='textarea' id="deskripsi" onChange={(text) => setInput({ ...input, Deskripsi: text.target.value })} />
                        </FormGroup>
                        <FormGroup style={{ marginLeft: 'auto' }}>
                            <Button style={{ backgroundColor: 'black', borderRadius: 0, width: '100%' }} onClick={() => btnUpload()}>UPLOAD</Button>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
        // <div className="container">
        //     <div className="shadow bg-white" style={{ width: '50vw', margin: 'auto', height: '70vh' }}>
        //         <div style={{ padding: 60 }}>

        //             <h3 style={{ textAlign: 'center' }}>Add Article</h3>
        //             <FormGroup>
        //                 <Label for="nama">Image</Label>
        //                 <Input type="text" id="nama" onChange={(text) => setInput({ ...input, Image: text.target.value })} />
        //             </FormGroup>
        //             <FormGroup>
        //                 <Label for="judul">Judul Article</Label>
        //                 <Input type="text" id="judul" onChange={(text) => setInput({ ...input, Judul: text.target.value })} />
        //             </FormGroup>
        //             <FormGroup>
        //                 <Label for="deskripsi">Description</Label>
        //                 <Input type='textarea' id="deskripsi" onChange={(text) => setInput({ ...input, Deskripsi: text.target.value })} />
        //             </FormGroup>
        //         </div>
        //             <FormGroup style={{ marginLeft: '40.6vw' }}>
        //                 <Button style={{backgroundColor:'black',borderRadius:0}} onClick={()=>btnUpload()}>UPLOAD</Button>
        //             </FormGroup>
        //     </div>
        // </div>
    )
}
export default ArticleManagement
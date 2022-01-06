import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import { API_URL } from '../helper';
import { updateArticle } from '../redux/actions';

const HomePage = (props) => {
    const { articleList } = useSelector((state) => {
        return {
            articleList: state.articleReducer.articleList
        }
    })
    const dispatch = useDispatch()
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProduct()
        dispatch(updateArticle())

    }, [])
    const getProduct = () => {
        axios.get(`${API_URL}/products`)
            .then((res) => {
                setProduct(res.data)
                console.log("data123", product)
            }).catch((err) => {
                console.log(err)
            })
    }
    const getArticle = () => {
        axios.get(`${API_URL}/articles`)
            .then((res) => {

            }).catch((err) => {
                console.log(err)
            })

    }
    const PrintProduct = () => {
        return product.slice(0, 4).map((value, index) => {
            return <div className="col-3 mt-2">

                <Card className="shadow mb-5 bg-white rounded">
                    <Link to={`/product-detail?id=${value.id}`}>
                        <CardImg
                            top
                            src={value.images[0]}
                            top width="100%"
                            alt={`${value.nama}-${index}`}
                        />
                    </Link>
                    <CardBody className='d-flex'>
                        <CardTitle tag="h4" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                        <CardTitle tag="h5" style={{ fontWeight: "bolder", marginLeft: 'auto', marginTop: 3 }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        })
    }
    const PrintArticle = () => {
        return articleList.map((value, index) => {
            return (
                <div className="col-4 mt-2" style={{ padding: 10 }}>

                    <Card style={{ border: 'none', height: '35vw' }}>
                        <Link to={`/detail-news?id=${value.id}`}>
                            <CardImg
                                top
                                src={value.image}
                                alt={`${value.nama}-${index}`}


                            />
                        </Link>
                        <CardBody style={{ textAlign: 'center', height: '60vh' }}>
                            <CardTitle tag="h5" style={{ color: 'grey' }}>News</CardTitle>
                            <Link to={`/detail-news?id=${value.id}`} style={{ textDecoration: 'none' }}>
                                <CardTitle tag="h4" style={{ cursor: 'pointer', color: 'black' }}>{value.judul}</CardTitle>
                            </Link>
                            <CardTitle style={{ marginTop: 3, color: 'grey' }}>{value.deskripsi.slice(0, 200)}...</CardTitle>
                            <Link to={`/detail-news?id=${value.id}`}>
                                <CardTitle style={{ marginTop: 3, float: 'right', color: '#BE0B06', cursor: 'pointer' }}>Read More</CardTitle>
                            </Link>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }
    return (
        <div style={{ marginTop: '-3vh' }}>
            {/* <div style={{position:'relative'}}>
                <img src="https://cdn.shopify.com/s/files/1/0572/5005/4294/files/9.1_9eacb79a-8128-4d69-b93f-c885dd090daf.jpg?v=1623744348" width="100%"  />
                <h1 style={{top:'50%',left:'50%',color:'green',position:'absolute',zIndex:10}}>Halo</h1>
            </div> */}
            <div style={{ backgroundSize: 'cover', backgroundImage: `url("https://cdn.shopify.com/s/files/1/0572/5005/4294/files/9.1_9eacb79a-8128-4d69-b93f-c885dd090daf.jpg?v=1623744348)`, backgroundRepeat: 'no-repeat', width: '100%', height: '100vh' }}>
                <p style={{ fontWeight: '500', zIndex: 100, color: '#94f791', height: '12em', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>OUTSTANDING FRUIT</p>
                <h1 style={{ fontSize: '80px', color: '#eef7d7', height: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Healthy Lifestyle</h1>
                <p style={{ color: '#eef7d7', height: '5em', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '3vh' }}>Always there for you, it provides your family with years support, comfort and relaxation</p>
                <Link to="/products">
                    <Button style={{ zIndex: 20, backgroundColor: '#BE0B06', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '46.5%' }}>SHOP NOW</Button>
                </Link>
            </div>
            <div style={{ padding: 50 }}>
                <h1 style={{ textAlign: 'center',paddingBottom:'5vh' }}>OUR PRODUCT</h1>
                <hr />
                <div className="row" style={{ justifyContent: 'center' }}>
                    {PrintProduct()}
                </div>
            </div>
            <div style={{ padding: 50 }}>
                <h1 style={{ textAlign: 'center',paddingBottom:'5vh' }}>READ NEWS</h1>
                <hr />
                <div className="row" style={{ justifyContent: 'center' }}>
                    {PrintArticle()}
                </div>
            </div>
        </div>
    )
}

export default HomePage
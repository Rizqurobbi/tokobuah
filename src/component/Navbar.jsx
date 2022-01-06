import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Collapse, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Spinner, Badge } from 'reactstrap';
import { onLogin, onLogout, onRegis } from '../redux/actions';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';



// const NavbarComponent = (props) => {
// const { username, role } = useSelector((state) => {
//     return {
//         username: state.userReducer.username,
//         role: state.userReducer.role
//     }
// })
// const [modalOpen, setModalOpen] = useState(false)
// const [btClose, setBtClose] = useState(!modalOpen)

// const dispatch = useDispatch()

// return (
// <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
//     <Link to="/">
//     <img  src="https://cdn.shopify.com/s/files/1/0572/5005/4294/files/cc-removebg-preview.png?v=1624871969" width="100px" href="/" />
//     </Link>
//     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//     </button>

//     <div className="collapse navbar-collapse" id="navbarSupportedContent" >
//         <ul className="navbar-nav">
//             <li className="nav-item active"  >
//                 <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//             </li>
//             <li className="nav-item">
//                 <a className="nav-link" href="#">Link</a>
//             </li>

//         </ul>

//     </div>

//     <div  style={{ marginLeft: 'auto' }}>
//         {
//             username ?
//                 <ul className="navbar-nav ">
//                     {
//                         role == 'User' ?

//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
//                                     ({username})
//                                 </a>

//                                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                     <a className="dropdown-item" href="#">Cart</a>
//                                     <a className="dropdown-item" href="#">History Transacation</a>
//                                     <div className="dropdown-divider"></div>
//                                     <a className="dropdown-item" onClick={() => { localStorage.removeItem("data"); dispatch(onLogout()) }}>LogOut</a>
//                                 </div>
//                             </li>

//                             : 
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
//                                     ({username})
//                                 </a>

//                                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                     <a className="dropdown-item" href="/management-article">Management Article</a>
//                                     <a className="dropdown-item" href="#">History Transacation</a>
//                                     <div className="dropdown-divider"></div>
//                                     <a className="dropdown-item" onClick={() => { localStorage.removeItem("data"); dispatch(onLogout()) }}style={{cursor:'pointer'}}>LogOut</a>
//                                 </div>
//                             </li>
//                     }

//                 </ul>
//                 :
//                 <ul className="navbar-nav">
//                     <li className="nav-item" >
//                         <button type="button" className="btn-outline-success"  data-toggle="modal" data-target="#modalLogin" style={{ cursor: 'pointer',border:'none'}}>
//                             Sign In
//                         </button>
//                         <ModalLogin />
//                         <ModalRegister
//                         />
//                     </li>
//                 </ul>
//         }
//     </div>

// </nav >


//     )
// }
// export default NavbarComponent
class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalLogin: false,
            modalRegis: false,
            openCollapse: false,
        }
    }
    render() {
        return (
            <div style={{marginBottom:'10vh'}}>
                <Navbar expand="md" className="shadow" fixed='top' color="white" >

                    <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                    <Collapse isOpen={this.state.openCollapse} navbar>
                        <Nav>
                            <NavItem>
                                <Link className="nav-link" to="/" style={{ color: 'red' }}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/products" style={{ color: '#BE0B06' }}>
                                    Product
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: '#BE0B06' }}>
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarBrand >
                            <Link to="/">
                                <img style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    margin: 'auto',
                                }} src="https://cdn.shopify.com/s/files/1/0572/5005/4294/files/cc-removebg-preview.png?v=1624871969" alt="logo-brand" width="120px" />
                            </Link>
                        </NavbarBrand>
                        {
                            this.props.loading ?
                                <Spinner style={{ marginLeft: "auto", marginRight: 50 }}>Loading...</Spinner>
                                :
                                this.props.username ?
                                    <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                        <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "red" }}>
                                            Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                        </DropdownToggle>
                                        {
                                            this.props.role == "User"
                                                ?
                                                <DropdownMenu right>
                                                    <Link to="/products" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        <DropdownItem>
                                                            Products
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        <DropdownItem>
                                                            Cart<Badge color="danger" style={{borderRadius:10,}}>{this.props.cart.length}</Badge>
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="history-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        <DropdownItem>
                                                            History
                                                        </DropdownItem>
                                                    </Link>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.onLogout() }}>
                                                        Keluar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                :
                                                <DropdownMenu right >
                                                    {/* <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Products Management
                                                        </DropdownItem>
                                                    </Link> */}
                                                    <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Product Management 
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/transaction-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Transaction Management 
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/article-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Article Management 
                                                        </DropdownItem>
                                                    </Link>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => { localStorage.removeItem("data"); this.props.onLogout() }}>
                                                        Keluar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                        }

                                    </UncontrolledDropdown>
                                    :

                                    <Button style={{ marginLeft: "auto" }} type="button" color="success" onClick={() => this.setState({ modalLogin: !this.state.modalLogin })}>Login</Button>


                        }
                    </Collapse>
                    <ModalLogin
                        btClose={() => this.setState({ modalLogin: !this.state.modalLogin })}
                        modalOpen={this.state.modalLogin}
                        modalOpenRegis={() => this.setState({ modalRegis: !this.state.modalRegis })}
                    />
                    <ModalRegister
                        btClose={() => this.setState({ modalRegis: !this.state.modalRegis })}
                        modalOpen={this.state.modalRegis}
                        modalOpenLogin={() => this.setState({ modalLogin: !this.state.modalLogin })} />
                </Navbar>

            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        cart: state.userReducer.cart,
        iduser: state.userReducer.id

    }
}
export default connect(mapToProps, { onLogout })(NavbarComponent);
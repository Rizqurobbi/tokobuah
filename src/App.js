import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import React from 'react';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './redux/actions';
import ManagementArticle from './pages/ManagementArticle';
import NavbarComponent from './component/Navbar';
import ProductPage from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    }
  }
  componentDidMount() { 
    this.keepLogin()
  }
  keepLogin = async() => {
    try {
      let local = localStorage.getItem("data")
      if (local) {
        local = JSON.parse(local)
        let res = await this.props.onLogin(local.username, local.password)
        if(res.success){
          this.setState({loading:false})
        }
      }else{
        this.setState({loading:false})
      }
    } catch (error) {
      console.log(error)
    }

  }
  render() {
    return (
      <div>
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cart-user" element={<CartPage />} />
          <Route path="/management-article" element={<ManagementArticle />} />
        </Routes>
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    role: state.userReducer.role,

  }
}
export default connect(mapToProps, { onLogin })(App);



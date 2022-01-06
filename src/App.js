import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import React from 'react';
import { connect } from 'react-redux';
import { getProductAction, onLogin, onLogout } from './redux/actions';
import NavbarComponent from './component/Navbar';
import ProductPage from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFound';
import TransactionAdminPage from './pages/TransactionManagement';
import DetailNewsPage from './pages/DetailNews';
import ArticleManagement from './pages/ArticleManagement'
import ProductManagement from './pages/ManagementProduct';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.keepLogin()
    // this.getProducts()
  }
  keepLogin = async () => {
    try {
      let local = localStorage.getItem("data")
      if (local) {
        local = JSON.parse(local)
        let res = await this.props.onLogin(local.username, local.password)
        if (res.success) {
          this.setState({ loading: false })
        }
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      console.log(error)
    }

  }
  getProducts = () => {

    this.props.getProductAction()

  }
  render() {
    return (
      <div>
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/detail-news" element={<DetailNewsPage />} />
          {this.props.role == "User" ?
            <>
              <Route path="/cart-user" element={<CartPage />} />
              <Route path="/history-user" element={<HistoryPage />} />
            </>
            :
            this.props.role == "Admin" ?
              <>
                <Route path="/product-management" element={<ProductManagement />} />
                <Route path="/article-management" element={<ArticleManagement />} />
                <Route path="/transaction-management" element={<TransactionAdminPage />} />
              </>
              :
              <Route path="*" element={<NotFoundPage />} />
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    role: state.userReducer.role,
    id: state.userReducer.id

  }
}
export default connect(mapToProps, { onLogin, getProductAction })(App);



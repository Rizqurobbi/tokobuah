import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import React from 'react';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './redux/actions';
import ManagementArticle from './pages/ManagementArticle';
import NavbarComponent from './component/Navbar';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
        await this.props.onLogin(local.username, local.password)

      }
    } catch (error) {
      console.log(error)
    }

  }
  render() {
    return (
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
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



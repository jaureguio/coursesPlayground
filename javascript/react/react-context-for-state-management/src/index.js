import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { UserProvider } from './UserContext';
import './index.css';

class Root extends React.Component {
  state = {
    currentUser: null
  };

  handleLogin = user => {
    this.setState({ currentUser: user });
  };

  handleLogout = () => {
    this.setState({ currentUser: null });
  };

  render() {
    return (
      <UserProvider value={{
        currentUser: this.state.currentUser, 
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }}>
        { this.state.currentUser ? <MainPage /> : <LoginPage /> }
      </UserProvider> 
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'));

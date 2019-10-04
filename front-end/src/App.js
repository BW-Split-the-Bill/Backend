import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import FailedLogin from './components/FailedLogin'
import AddTable from './components/AddTable'
import GetSpecificTable from './components/GetSpecificTable';

class App extends React.Component {

  // logout = (evt) => {
  //   evt.preventDefault()
  //   localStorage.removeItem('token')
  //   this.props.history.push('/login')
  // }

  render(){
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/failedlogin" component={FailedLogin} />
        <Route exact path="/AddTable" component={AddTable} />
        <Route exact path="/GetSpecificTable" component={GetSpecificTable} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </div>
    )
  }
}

export default App;

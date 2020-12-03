import React, { Component } from 'react';
import './App.css';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import PrivateRoute from './Components/PrivateRoute';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage';

const baseURL = 'http://localhost:3000/'

class App extends Component {
  state = {
    user: {},
    error: ''
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      fetch(baseURL + 'profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result.id){
          this.setState({
            user: result
          })
        }
      })
    }
  }

  //notice that the keys in the user object match the keys in the backend's snakecase convention
  signUp = (user) => {
    fetch(baseURL + 'users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          password: user.password
        } 
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user }))
  }

  login = (username, password, history) => {
    fetch(baseURL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    .then(response => response.json())
    .then(result => {
      if(result.token){
        localStorage.setItem('token', result.token)
        this.setState({
          user: result.user
        })
        history.push('/')
      } else {
        this.setState({
          error: result.error
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/signup' render={(routerProps) => <SignupForm {...routerProps} signUp={this.signUp} />} />
          <Route exact path='/login' render={(routerProps) => <LoginForm {...routerProps} login={this.login} error={this.state.error}/>} />
          <PrivateRoute path='/' component={HomePage} user={this.state.user} />
        </Switch>
      </div>
    )
  }
}

export default App;

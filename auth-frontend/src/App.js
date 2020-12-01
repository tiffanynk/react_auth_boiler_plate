import React, { Component } from 'react';
import './App.css';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm';

const baseURL = 'http://localhost:3000/'

class App extends Component {
  state = {
    user: {},
    error: ''
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

  login = (username, password) => {
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
        { this.state.user.username
        ? <h2>Welcome, {this.state.user.first_name}</h2>
        : (
          <>
          <SignupForm signUp={this.signUp} />
          <LoginForm login={this.login} error={this.state.error}/>
          </>
          )
        }
      </div>
    )
  }
}

export default App;

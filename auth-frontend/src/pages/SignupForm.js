import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const user = this.state
        this.props.signUp(user)
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Sign up</h1>
                <label>First Name</label>
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                <label>Last Name</label>
                <input name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                <label>Username</label>
                <input name='username' value={this.state.username} onChange={this.handleChange} />
                <label>Password</label>
                <input type='password' value={this.state.password} name='password' onChange={this.handleChange} />
                <p>
                    Already a user?
                    <Link to='/login'> Login</Link>
                </p>
                <input type='submit' value='Sign Up' />
            </form>
        )
    }
}

export default SignupForm;
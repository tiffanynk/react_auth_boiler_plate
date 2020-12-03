//using hooks:
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function LoginForm({login, error, history}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])
    const handleSubmit = event => {
        event.preventDefault()
        login(username, password, history)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input name='username' value={username} onChange={event => setUsername(event.target.value)}/>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={event => setPassword(event.target.value)}/>
            {error ? <p style={{color: 'red'}}>{error}</p> : null}
            <p>
                    Need to Register?
                    <Link to='/signup'> Register</Link>
                </p>
            <input type='submit' value='Login'/>
        </form>
    )
}

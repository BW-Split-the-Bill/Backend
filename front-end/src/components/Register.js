import React from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions/index'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }
    }

    handleChange2 = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const { username, password, firstName, lastName, email, phoneNumber } = this.state
        this.props.registerUser(username, password, firstName, lastName, email, phoneNumber)
        this.setState({ username: '', password: '', firstName: '', lastName: '', email: '', phoneNumber: '', })
        this.props.history.push('/dashboard')
    }

    render() {
        const { username, password, firstName, lastName, email, phoneNumber } = this.state
        return (
            <div>
                <div className='signupheader'>
                    <h1>Split The Bill Sign Up</h1>
                    <p>Thanks for your interest!</p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name
                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange2} required /><br/>
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange2} required /><br/>
                    </label>
                    <label>
                        Phone Number
                        <input type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={this.handleChange2} required /><br/>
                    </label>
                    <label>
                        Email
                        <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange2} required /><br/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange2} required /><br/>
                    </label>
                    <label>
                        Unique Username
                        <input type="text" name="username" placeholder="Unique Username" value={username} onChange={this.handleChange2} required /><br/>
                    </label>
                    
                    
                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    registerUser
}

export default connect(null, mapDispatchToProps)(Register)
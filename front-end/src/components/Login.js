import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../actions/index'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (evt) => {
        evt.preventDefault()
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const { username, password } = this.state

        this.props.loginUser(username, password)
            .then(() => {
                this.props.history.push("/dashboard")
            })
            .catch((err) => { console.error(err) })
    }

    render() {
        const { username, password } = this.state
        const { isLoading, } = this.props
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
                    <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} /><br/>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} /><br/>
                    {isLoading
                        ? <p>Logging in...</p>
                        : <button type="submit">Log In</button>}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    errorMessage: state.errorMessage
})

const mapDispatchToProps = {
    loginUser,
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Login)
)
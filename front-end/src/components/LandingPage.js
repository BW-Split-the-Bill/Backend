import React from 'react'
// import business from '../images/business.jpg'

import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>
            <h1>Sign Up/ Log In!</h1>
            <div className='signupcards'>
                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>

                        {/* <img alt="User" src={business}></img> */}
                        <h3>I am not a User</h3>
                        <p>I want to Register</p>
                    </div>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='signup'>

                        {/* <img alt="User" src={business}></img> */}
                        <h3>I already have a User Account</h3>
                        <p>I want to Login</p>
                    </div>
                </Link>

            </div>
            
        </div>
    )
}

export default LandingPage
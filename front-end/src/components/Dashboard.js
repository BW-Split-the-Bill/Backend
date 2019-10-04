import React from 'react'
import { connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import AddTable from './AddTable'
// import MyRequestsBusiness from './MyRequestsBusiness'

const Dashboard = (props) => {
    
   
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, you are logged in.</h2>

            <a href="#neworder" className="abutton" role="button">Create a new Table</a>
            <div className="modal" id="neworder">
                <div className="modal-container">
                    <AddTable />
                    <a href="#" className="abutton2" role="button">Close</a>
                </div>
            </div>
            <br />
            {/* <Link to='/UpdateFoodItem'><span className="abutton">Update/Delete a Food Item</span></Link> */}
            <br /><br />
            {/* <button type="button" className="abutton">Log Out</button> */}
            <Link to='/'><span className="abutton">Log Out</span></Link>            
            {/* <MyRequestsBusiness /> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {loggedUser: state.loggedUser}
}



export default withRouter(
    connect(
        mapStateToProps,
    )(Dashboard)
)

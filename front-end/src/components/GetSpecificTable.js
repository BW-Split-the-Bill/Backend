import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSpecificTable } from '../actions/index'
import DisplaysSpecificTable from './DisplaysSpecificTable'

class GetSpecificTable extends React.Component{
    constructor() {
        super()
        this.state = {
            specificTable: [],
            
        }
    }
    
    componentDidMount(){
        this.props.getSpecificTable()                
        console.log(this.specificTable)

    }

    logout = (evt) => {
        evt.preventDefault()
        localStorage.removeItem('token')
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <button className="abutton" type="button" onClick={this.logout}>Log Out</button>
                <DisplaysSpecificTable specificTable={this.props.specificTable}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        specificTable: state.specificTable || '',
        isLoading: state.isLoading || 0,
        errorMessage: state.errorMessage || '',
    }
}

const mapDispatchToProps = {
    getSpecificTable,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GetSpecificTable)
)
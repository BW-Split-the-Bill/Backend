import React from 'react'
import { connect } from 'react-redux'
import { addTable } from '../actions/index'

class AddTable extends React.Component {
    constructor() {
        super()
        this.state = {
            restaurant: '',
            amountDue: '',
            peopleCount: '',
            createdBy: '',
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
        const { restaurant, amountDue, peopleCount, createdBy } = this.state
        this.props.addTable(restaurant, amountDue, peopleCount, createdBy )
        this.setState({ restaurant: '', amountDue: '', peopleCount: '', createdBy: '', })
    }

    render() {
        const { restaurant, amountDue, peopleCount, createdBy } = this.state
        return (
            <div>
                <h1 className="newpickupheader">Split a new Bill</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Restaurant Name
                        <input type="text" name="restaurant" value={restaurant} placeholder="Restaurant Name" onChange={this.handleChange} required /><br />
                    </label>
                    <label>
                        Amount Due on Bill
                        <input type="text" name="amountDue" value={amountDue} placeholder="Amount Due on Bill" onChange={this.handleChange} required /><br />
                    </label>
                    <label>
                        Number Count of People on Bill
                        <input type="text" name="peopleCount" value={peopleCount} placeholder="Number Count of People on Bill" onChange={this.handleChange} required /><br />
                    </label>
                    <input type="text" name="createdBy" value={createdBy} placeholder="Created By Username" onChange={this.handleChange} required /><br />
                    <button type="submit" className="abutton2">Add Table to Registry</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = { addTable }

export default connect(null, mapDispatchToProps)(AddTable)
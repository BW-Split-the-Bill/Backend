import React from 'react'
import { connect } from 'react-redux'
// import FoodItem from './FoodItem';
// import { deleteFoodItem,  } from '../actions/'

function DisplaysSpecificTable(props){
    const { isLoading, specificTable } = props


    if(isLoading){
        return <p>Table Loading...</p>
    }

    return (
        <section>
            <h2>{specificTable.restaurant}</h2>
            <div className="fooditemwrapper">
                {specificTable.map((specificTable)=>{
                    return (
                    <div className="fooditem" key={specificTable.tableId}>
                        <p>Total Bill { specificTable.amountDue}</p>
                        <p>Bill Per Person: {specificTable.amountDue / specificTable.peopleCount}</p>
                        <p>Created By: {specificTable.createdBy}</p>
                        {
                        /* <button type="button">I will pick this up!</button> <br />
                        <button type="button">Modify Food Item</button>
                        <button type="button" onClick={e => deleteFoodItem(e.id)}>Delete Food Item</button> */
                        }
                    </div>)
                })}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        specificTable: {},
        isLoading: state.isLoading || 0,
        errorMessage: state.errorMessatable || '',}}


export default connect(mapStateToProps)(DisplaysSpecificTable)


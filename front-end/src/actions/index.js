import axios from 'axios'

//Action Types

export const USER_LOGIN_START = 'USER_LOGIN_START'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const REGISTER_USER_START = 'REGISTER_USER_START'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'

export const ADD_TABLE_START = 'ADD_TABLE_START'
export const ADD_TABLE_SUCCESS = 'ADD_TABLE_SUCCESS'
export const ADD_TABLE_FAILED = 'ADD_TABLE_FAILED'

export const GET_TABLE_START = 'GET_FOODITEMS_START'
export const GET_TABLE_SUCCESS = 'GET_TABLE_SUCCESS'
export const GET_TABLE_FAILED = 'GET_TABLE_FAILED'

// export const UPDATE_FOODITEM_START = 'UPDATE_FOODITEM_START'
// export const UPDATE_FOODITEM_SUCCESS = 'UPDATE_FOODITEM_SUCCESS'
// export const UPDATE_FOODITEM_FAILED = 'UPDATE_FOODITEM_FAILED'

// export const DELETE_FOODITEM_START = 'DELETE_FOODITEM_START'
// export const DELETE_FOODITEM_SUCCESS = 'DELETE_FOODITEM_SUCCESS'
// export const DELETE_FOODITEM_FAILED = 'DELETE_FOODITEM_FAILED'

//Action Creators

// export function getAccount() {
//     return (dispatch) =>{
//         dispatch({type:FRIENDS_FETCHING})
//         const headers = {
//             Authorization: localStorage.getItem('token')
//         }
//         axios.get('http://localhost:5000/api/friends', { headers })
//         .then((res)=>{
//             dispatch({type:FRIENDS_FETCH_SUCCESS, payload:res.data})
//         })
//         .catch((err)=>{
//             dispatch({type:FRIENDS_FETCH_FAILED, payload:err.response.data})
//         })
//     }
// }

export function loginUser (username, password){
    return (dispatch) => {
        dispatch({type: USER_LOGIN_START})
        return axios.post('https://split-thebill.herokuapp.com/auth/login', { username, password })
        .then((res) => {
            const payload = res.data
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token,'LOG IS HERE <---')
            dispatch({type: USER_LOGIN_SUCCESS, payload})
        })
        .catch((res) => {
            const payload = res.response ? res.response.data : res
            dispatch({type: USER_LOGIN_FAILED, payload})
            console.log(res,'LOG IS HERE <---')
        })
    }
}

export function registerUser(username, password, firstName, lastName, email, phoneNumber){
    return (dispatch) => {
        dispatch({type:REGISTER_USER_START})
        // const headers = {
        //     Authorization: localStorage.getItem('token')
        // }

        return axios.post('https://split-thebill.herokuapp.com/auth/register', { username, password, firstName, lastName, email, phoneNumber }  )
        .then((res) => {
            const payload = res.data
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token,'LOG IS HERE <---')
            dispatch({type:REGISTER_USER_SUCCESS, payload})
            console.log(res,'LOG IS HERE <---')
        })
        .catch((err) => {
            dispatch({type:REGISTER_USER_FAILED, payload:err})
            console.log(err)
        })
    }
}

export function addTable(restaurant, amountDue, peopleCount, createdBy){
    return (dispatch) => {
        dispatch({type:ADD_TABLE_START})
        const headers = {Authorization: localStorage.getItem('token')}
        return axios.post('https://split-thebill.herokuapp.com/tables/new', { restaurant, amountDue, peopleCount, createdBy }, { headers })
        .then((res) => {
            dispatch({type:ADD_TABLE_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            dispatch({type:ADD_TABLE_FAILED, payload:err})
        })
    }
}

export function getSpecificTable(id){
    return (dispatch) => {
        dispatch({type:GET_TABLE_START})
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        axios.get(`https://split-thebill.herokuapp.com/tables/${id}`, { headers })
        .then((res) => {
            dispatch({type:GET_TABLE_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            dispatch({type:GET_TABLE_FAILED, payload:err})
        })
    }
}

// export function updateFoodItem(foodItem){
//     return (dispatch) => {
//         dispatch({type:UPDATE_FOODITEM_START})
//         const headers = {
//             Authorization: localStorage.getItem('token')
//         }
//         const id = dispatch.params.id
//         return axios
//         .put(`https://bw-replate.herokuapp.com/api/food/${id}`, foodItem, { headers })
//         .then((res) => {
//             dispatch({type:UPDATE_FOODITEM_SUCCESS, payload:res.data})
//         })
//         .catch((err) => {
//             dispatch({type:UPDATE_FOODITEM_FAILED, payload:err})
//         })
//     }
// }

// export const deleteFoodItem = (id) => {
//     return (dispatch) => {
//         dispatch({type:DELETE_FOODITEM_START})
//         const headers = {
//             Authorization: localStorage.getItem('token')
//         }
//         return axios.delete(`https://bw-replate.herokuapp.com/api/food/${id}`, { headers })
//         .then((res) => {
//             console.log(res.data)
//             dispatch({type:DELETE_FOODITEM_SUCCESS, payload:res.data})
//         })
//         .catch((err) => {
//             dispatch({type:DELETE_FOODITEM_FAILED, payload:err})
//         })
//     }
// }

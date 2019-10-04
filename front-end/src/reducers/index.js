//Action Imports
import { 
    USER_LOGIN_START, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILED, 
    REGISTER_USER_START, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAILED, 
    ADD_TABLE_START,
    ADD_TABLE_SUCCESS,
    ADD_TABLE_FAILED,
    GET_TABLE_START,
    GET_TABLE_SUCCESS,
    GET_TABLE_FAILED, 
    // UPDATE_FOODITEM_START,
    // UPDATE_FOODITEM_SUCCESS,
    // UPDATE_FOODITEM_FAILED,
    // DELETE_FOODITEM_START,
    // DELETE_FOODITEM_SUCCESS,
    // DELETE_FOODITEM_FAILED,    
} from '../actions'


//Initial State Object
const initialState = {
    payload: [],
    isLoading: false,
    errorMessage: null,
    newTableObject:[],
    specificTable:[],
    // deletingItem:false,
}

//The Single Reducer for the whole app
export const reducer = (state=initialState, action) => {
    switch(action.type){
        case USER_LOGIN_START:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading:false,
                payload: action.payload,
                errorMessage: null,
            }
        case USER_LOGIN_FAILED:
            return {
                ...state, 
                isLoading:false,
                errorMessage: action.payload,
            }
        case REGISTER_USER_START:
            return {
                ...state,
                isLoading:true,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                payload: action.payload,
                errorMessage: null,
            }
        case REGISTER_USER_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
            }
        case ADD_TABLE_START:
            return {
                ...state,
                isLoading:true,
            }
        case ADD_TABLE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                newTableObject: action.payload,
                errorMessage: null,
            }
        case ADD_TABLE_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
            }
        case GET_TABLE_START:
            return {
                ...state,
                isLoading:true,
            }
        case GET_TABLE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                specificTable: action.payload,
                errorMessage: null,
            }
        case GET_TABLE_FAILED:
            return {
                ...state,
                isLoading:false,
                errorMessage: action.payload,
            }
        // case UPDATE_FOODITEM_START:
        //     return {
        //         ...state,
        //         isLoading:true,
        //     }
        // case UPDATE_FOODITEM_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading:false,
        //         errorMessage:null,
        //     }
        // case UPDATE_FOODITEM_FAILED:
        //     return {
        //         ...state,
        //         isLoading:false,
        //         errorMessage: action.payload
        //     }
        // case DELETE_FOODITEM_START:
        //     return {
        //         ...state,
        //         deletingItem:true,
        //     }
        // case DELETE_FOODITEM_SUCCESS:
        //     return {
        //         ...state,
        //         deletingItem:false,
        //         allFoodItems: action.payload,
        //     }
        // case DELETE_FOODITEM_FAILED:
        //     return {
        //         ...state,
        //         deletingItem:false,
        //         error: action.payload,
        //     }
        default:
            return state
    }
}
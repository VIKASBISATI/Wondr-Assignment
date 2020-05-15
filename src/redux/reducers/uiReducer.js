import { SHOW_LOADER, HIDE_LOADER, SET_ERRORS, CLEAR_ERRORS } from "../types"

const initialState={
    loading: false,
};

const uiReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_ERRORS: 
        return {
            ...state,
            loading: false,
            errors: action.payload
        }
        case CLEAR_ERRORS: return{
            ...state,
            loading: false,
            errors: null
        }
        case SHOW_LOADER: return {
            ...state,
            loading: true
        }
        case HIDE_LOADER: return {
            ...state,
            loading: false
        }
        default: return state;
    }
}
export default uiReducer;
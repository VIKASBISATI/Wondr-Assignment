import { SET_IMAGES } from "../types"

const initialState={
    images: [],
    errors: null
};

const imageReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_IMAGES: 
        return {
            ...state,
            loading: false,
            images: [...state.images,...action.payload]
        }
        default: return state;
    }
}
export default imageReducer;
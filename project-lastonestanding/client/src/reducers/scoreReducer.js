import { GET_SCORES, ADD_SCORES, SCORES_LOADING} from '../actions/types';

const initialState = {
    scores: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SCORES:
            return {
                ...state,
                scores: action.payload,
                loading: false
            }
        case ADD_SCORES:
            return {
                ...state,
                scores: []
            }
        case SCORES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
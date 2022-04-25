import axios from 'axios';
import { GET_SCORES, ADD_SCORES, SCORES_LOADING } from './types';

export const getScores = () => dispatch => {
    dispatch(setScoresLoading());
    axios.get('/api/scores')
        .then(res => 
            dispatch({
                type: GET_SCORES,
                payload: res.data
            }));
};

export const addScores = (score) => dispatch => {
    axios.post('/api/scores', score)
        .then(res =>
            dispatch({
                type: ADD_SCORES,
                payload: res.data
            }));
};

export const setScoresLoading = () => {
    return {
        type: SCORES_LOADING
    };
};
import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            action.payload.id = state.comments.length;
            return {...state, errMess: null, comments: [ ...state.comments, action.payload ]}

        case ActionTypes.ADD_COMMENTS:
            const newArray = [...state.comments, ...action.payload];
            newArray.forEach((el, i) => el.id = i);
            return {...state, errMess: null, comments: [...state.comments, ...action.payload ]};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};
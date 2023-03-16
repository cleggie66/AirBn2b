import { csrfFetch } from "./csrf"

const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_SPOT_REVIEWS = '/reviews/setSpotReviews'
const ADD_REVIEW = '/reviews/add'


//ACTIONS
export const setSpotReviewsAction = (reviews) => {
    return {
        type: SET_SPOT_REVIEWS,
        reviews
    }
};
export const addReviewAction = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
};

//THUNKS
export const setSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    const convData = normalizer(data.Reviews);
    dispatch(setSpotReviewsAction(convData))
    return convData;
};

const initialState = {
    spot: {},
    user: {},
};

//REDUCER
const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_SPOT_REVIEWS:
            newState = {
                spot: { ...action.reviews },
                user: { ...state.user }
            }
            return newState
        case ADD_REVIEW:
            newState = {
                spot: { ...state.spot, [action.review.id]: action.review },
                user: { ...state.user } //Is this line needed??
            }
            return newState
        default:
            return state;
    }
};

export default reviewReducer;
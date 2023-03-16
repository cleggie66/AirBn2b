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
    console.log('test')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    const convData = normalizer(data.Reviews);
    dispatch(setSpotReviewsAction(convData))
    return convData;
};
export const addReview = (reviewObj) => async (dispatch) => {
    const { review, stars, spotId } = reviewObj
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars
        })
    });
    const data = await response.json()
    dispatch(setSpotReviews(spotId));
    return data;
}

const initialState = {
    spot: {},
    user: {},
};

//REDUCER
const reviewReducer = (state = initialState, action) => {
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
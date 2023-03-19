import { csrfFetch } from "./csrf";

const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_SPOT_REVIEWS = '/reviews/setSpotReviews';
const SET_USER_REVIEWS = '/reviews/setUserReviews';


//ACTIONS
export const setSpotReviewsAction = (reviews) => {
    return {
        type: SET_SPOT_REVIEWS,
        reviews
    }
};
export const setUserReviewsAction = (reviews) => {
    return {
        type: SET_USER_REVIEWS,
        reviews
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

export const setUserReviews = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    const data = await response.json();
    const convData = normalizer(data.Reviews);
    dispatch(setUserReviewsAction(convData));
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
    dispatch(setUserReviews());
    dispatch(setSpotReviews(spotId));
    return data;
};

export const deleteReview = ({ reviewId, spotId }) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(setUserReviews());
    dispatch(setSpotReviews(spotId));
    return data;
};

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
            return newState;
        case SET_USER_REVIEWS:
            newState = {
                spot: { ...state.spot },
                user: { ...action.reviews }
            }
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;
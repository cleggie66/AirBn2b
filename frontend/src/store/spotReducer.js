import { csrfFetch } from './csrf'

const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_SINGLE_SPOT = 'spots/setSpot';
const SET_ALL_SPOTS = 'spots/setSpots';
const ADD_SPOT = 'spots/addSpot';


//ACTIONS
export const setSpot = (spot) => {
    return {
        type: SET_SINGLE_SPOT,
        spot
    }
}

export const setSpots = (spots) => {
    return {
        type: SET_ALL_SPOTS,
        spots
    }
}

//THUNKS
export const addNewSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot
    const response = await csrfFetch("api/spots", {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    });
    const data = await response.json();
    dispatch(setSpot(data));
    return response;
}

export const setAllSpots = () => async (dispatch) => {
    const spots = await csrfFetch('/api/spots');
    const spotData = await spots.json();
    const convData = normalizer(spotData.Spots);

    dispatch(setSpots(convData));
    return convData;
}

export const getSpot = (spotId) => async (dispatch) => {
    const spot = await csrfFetch(`/api/spots/${spotId}`);
    const response = await spot.json();
    dispatch(setSpot(response));
    return response;
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}

//REDUCER
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ALL_SPOTS:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, ...action.spots }
            return newState
        case SET_SINGLE_SPOT:
            newState = { ...state };
            newState.singleSpot = action.spot;
            return newState
        case ADD_SPOT:
            
        default:
            return state;
    }
};

export default spotReducer;

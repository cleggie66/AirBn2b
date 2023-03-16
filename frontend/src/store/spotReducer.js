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
const SET_CURRENT_SPOTS = 'spots/setCurrentSpots'
const ADD_SPOT = 'spots/addSpot';


//ACTIONS
export const setSpot = (spot) => {
    return {
        type: SET_SINGLE_SPOT,
        spot
    }
};
export const setSpots = (spots) => {
    return {
        type: SET_ALL_SPOTS,
        spots
    }
};
export const setCurrSpots = (spots) => {
    return {
        type: SET_ALL_SPOTS,
        spots
    }
};
export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

//THUNKS
export const setAllSpots = () => async (dispatch) => {
    const spots = await csrfFetch('/api/spots');
    const data = await spots.json();
    const convData = normalizer(data.Spots);
    dispatch(setSpots(convData));
    return convData;
};
export const setCurrentSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current");
    const data = await response.json();
    const convData = normalizer(data.Spots);
    dispatch(setCurrSpots(convData))
    return convData;
};
export const getSpot = (spotId) => async (dispatch) => {
    const spot = await csrfFetch(`/api/spots/${spotId}`);
    const response = await spot.json();
    dispatch(setSpot(response));
    return response;
};
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
    return data;
};
export const updateSpot = (spot) => async (dispatch) => {
    const { spotId, address, city, state, country, lat, lng, name, description, price } = spot
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: 'PUT',
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
    return data;
}

const initialState = {
    allSpots: {},
    singleSpot: {},
    currentSpots: {}
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
        case SET_CURRENT_SPOTS:
            newState = { ...state };
            newState.currentSpots = action.spots;
            return newState
        case ADD_SPOT:
            newState = { ...state };
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot }
            return newState
        default:
            return state;
    }
};

export default spotReducer;

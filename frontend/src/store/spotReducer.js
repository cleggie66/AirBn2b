import { csrfFetch } from './csrf'

const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_SPOT = 'spots/setSpot';
const SET_SPOTS = 'spots/setSpots';


//ACTIONS
export const setSpot = (spot) => {
    return {
        type: SET_SPOT,
        spot
    }
}

export const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
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
    const spots = await csrfFetch('/api/spots')
    const spotData = await spots.json();
    const convData = normalizer(spotData.Spots)

    dispatch(setSpots(convData));
    return convData;
}

// const initialState = {
//     allSpots: {},
//     singleSpot: {}
// }

//REDUCER
const allSpotsReducer = (state = {}, action) => {
    let newState;
    // console.log("STATE CHECK:", state)
    switch (action.type) {
        case SET_SPOTS:
            newState = { ...state, ...action.spots };
            return newState
        case SET_SPOT:
            newState = { ...state, [action.spot.id]: action.spot};
            return newState
        default:
            return state;
    }
};

export default allSpotsReducer;

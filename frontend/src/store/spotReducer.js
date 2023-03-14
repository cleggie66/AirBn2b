import { csrfFetch } from './csrf'

// const spots = await csrfFetch('/api/spots', {
//     method: 'GET',
// })
// const spotData = await spots.json();

const normalizer = (arr) => {
    const obj = {};
    arr.forEach((el) => {
        obj[el.id] = el
    })
    return obj;
};

const SET_SPOT = 'spots/setSpot';

//ACTIONS
export const setSpot = (spot) => {
    return {
        type: SET_SPOT,
        payload: spot
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

const initialState = {}

//REDUCER
export function allSpotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_SPOT:
            newState = { ...state, [action.spot.id]: action.spot};
            return newState
        default:
            return state;
    }
}

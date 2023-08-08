import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAllSpots } from "../../store/spotReducer";
import SpotForm from './index';

const UpdateSpotForm = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAllSpots());
    }, [dispatch]);

    const {spotId} = useParams();
    const spotState = useSelector(state => state.spots.allSpots);
    const spot = spotState[spotId];

    if (spot && Object.values(spot).length < 1) {
        return (<h2>Loading...</h2>);
    };

    return (
        <SpotForm spot={spot} formType="Update Spot" />
    );
};

export default UpdateSpotForm;
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import SpotForm from './index'

const UpdateSpotForm = () => {
    const {spotId} = useParams();
    const spotState = useSelector(state => state.spots.allSpots)
    const spot = spotState[spotId];

    console.log(spotState)

    if (Object.values(spot).length < 1) {
        return (<h2>Loading...</h2>)
    }

    return (
        <h1>Howdy</h1>
        // <SpotForm spot={spot} formType="Update Spot" />
    )
}

export default UpdateSpotForm;
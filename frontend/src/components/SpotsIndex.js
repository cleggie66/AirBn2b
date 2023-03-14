import { useSelector } from "react-redux"
import testData from "../test-data/test-data.json"
import SpotsIndexItem from "./SpotsIndexItem";


const SpotsIndex = () => {
    // const spotState = useSelector(state=>state.spots)
    const spotState = testData
    const spots = Object.values(spotState);


    return (
        <div>
            <h1>Howdy</h1>
            {spots.map(spot => {
                return <SpotsIndexItem spot={spot} key={spot.id}/>
            })}
        </div>
    )
}

export default SpotsIndex
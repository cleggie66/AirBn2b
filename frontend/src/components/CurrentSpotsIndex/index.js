import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentSpots } from '../../store/spotReducer';
import SpotsIndexItem from '../SpotsIndexItem';


const CurrentSpotsIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentSpots())
    })

    const spotState = useSelector(state => state.spots.currentSpots)
    const spots = Object.values(spotState);

    // console.log(spotState)

    // const spotState = useSelector(state=>state.spots.allSpots)
    // const spots = Object.values(spotState);

    return (
        <div className='spots-container'>
            {spots.map(spot => {
                return <SpotsIndexItem spot={spot} key={spot.id} />
            })}
        </div>
    )
}

export default CurrentSpotsIndex
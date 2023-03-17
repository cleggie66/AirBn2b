import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentSpots } from '../../store/spotReducer';
import SpotsIndexItem from '../SpotsIndexItem';


const CurrentSpotsIndex = () => {
    const dispatch = useDispatch();
    
    const spotState = useSelector(state => state.spots.currentSpots)
    const spots = Object.values(spotState);
    
    useEffect(() => {
        dispatch(setCurrentSpots())
    }, [dispatch, spots.length])

    return (
        <div className='spots-container'>
            {spots.map(spot => {
                return <SpotsIndexItem spot={spot} key={spot.id} currentSpots={true}/>
            })}
        </div>
    )
}

export default CurrentSpotsIndex
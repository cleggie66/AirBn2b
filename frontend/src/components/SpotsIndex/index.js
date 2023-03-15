import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import SpotsIndexItem from "../SpotsIndexItem";
import { setAllSpots } from '../../store/spotReducer';
import './SpotsIndex.css'


const SpotsIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAllSpots());
    }, [dispatch]);

    const spotState = useSelector(state=>state.spots)
    const spots = Object.values(spotState);

    return (
        <div className='spots-container'>
            {spots.map(spot => {
                return <SpotsIndexItem spot={spot} key={spot.id}/>
            })}
        </div>
    )
}

export default SpotsIndex
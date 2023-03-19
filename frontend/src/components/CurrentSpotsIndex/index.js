import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { setCurrentSpots } from '../../store/spotReducer';
import SpotsIndexItem from '../SpotsIndexItem';
import "./CurrentSpotsIndex.css"


const CurrentSpotsIndex = () => {
    const dispatch = useDispatch();

    const spotState = useSelector(state => state.spots.currentSpots)
    const spots = Object.values(spotState);

    useEffect(() => {
        dispatch(setCurrentSpots())
    }, [dispatch, spots.length])

    return (
        <div className='page'>
            <div className='manage-spots-header'>
                <h2>Manage Spots</h2>
                {!spots.length > 0 && (
                    <NavLink
                        className='create-a-new-spot-button'
                        exact to='/spots/new'
                    >
                        Create a New Spot
                    </NavLink>
                )}
            </div>
            {spots.length > 0 && (
                <div className='spots-container'>
                    {spots.map(spot => {
                        return <SpotsIndexItem spot={spot} key={spot.id} currentSpots={true} />
                    })}
                </div>

            )}
        </div>
    )
}

export default CurrentSpotsIndex
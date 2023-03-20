import { Link, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

const SpotsIndexItem = ({ spot, currentSpots }) => {
    const history = useHistory()

    if (spot.avgRating) { spot.avgRating = parseInt(spot.avgRating).toFixed(2) }

    const handleUpdate = () => {
        history.push(`/spots/${spot.id}/edit`)
    }
    const linkDetailsPage = () => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div className='spot-index'>
            <span className="tooltip" onClick={linkDetailsPage}>{spot.name}</span>
            <div className='image-container' onClick={linkDetailsPage}>
                <img src={spot.previewImage} alt={spot.name} className='index-preview-image'></img>
            </div>
            <div className='spot-index-details' onClick={linkDetailsPage}>
                <h3 className='spot-location'>{`${spot.city}, ${spot.state}`}</h3>
                <div className='spot-review'>
                    <i className="fa-solid fa-star"></i>
                    <p>{`${spot.avgRating || 'New'}`}</p>
                </div>
            </div>
            <div className='spot-index-price' onClick={linkDetailsPage}>
                <h3>{`$${spot.price}`}</h3>
                <p>night</p>
            </div>
            {currentSpots && (
                <div className='spot-index-buttons'>
                    <button className="spot-index-button" onClick={handleUpdate}>Update</button>
                    <OpenModalButton
                        className={"spot-index-button"}
                        buttonText="Delete"
                        modalComponent={<DeleteSpotModal spot={spot} />}
                    />
                </div>
            )}
        </div>
    )
}

export default SpotsIndexItem;
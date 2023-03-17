import { Link, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

const SpotsIndexItem = ({ spot, currentSpots }) => {
    const history = useHistory()

    const handleUpdate = () => {
        history.push(`/spots/${spot.id}/edit`)
    }

    return (
        <div className='spot-index'>
            <span className="tooltip">{spot.name}</span>
            <Link to={`/spots/${spot.id}`} className='image-container'>
                <img src={spot.previewImage} alt={spot.name} className='index-preview-image'></img>
            </Link>
            <h3 className='spot-location'>{`${spot.city}, ${spot.state}`}</h3>
            <div className='spot-review'>
                <i className="fa-solid fa-star"></i>
                <h3>{`${spot.avgRating || 'New'}`}</h3>
            </div>
            <h3 className='spot-price'>{`$${spot.price}/night`}</h3>
            {currentSpots && (
                <div>
                    <button onClick={handleUpdate}>Update</button>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSpotModal spot={spot} />}
                    />
                </div>
            )}
        </div>
    )
}

export default SpotsIndexItem;
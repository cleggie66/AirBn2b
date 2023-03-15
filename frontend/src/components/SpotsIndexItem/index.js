import './SpotsIndexItem.css'

const SpotsIndexItem = ({ spot }) => {

    return (
        <div className='spot-index'>
            <div className='image-container'>
                <img src={spot.previewImage} alt={spot.name}></img>
            </div>
            <h3 className='spot-location'>{`${spot.city}, ${spot.state}`}</h3>
            <div className='spot-review'>
                <i className="fa-solid fa-star"></i>
                <h3>{`${spot.avgRating || 'New'}`}</h3>
            </div>
            <h3 className='spot-price'>{`$${spot.price}/night`}</h3>
        </div>
    )
}

export default SpotsIndexItem;
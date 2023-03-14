import './SpotsIndexItem.css'

const SpotsIndexItem = ({spot}) => {

    return (
        <div className='spot-index'>
            <img src={spot.previewImage} alt={spot.name}></img>
            <h3>{`${spot.city}, ${spot.state}`}</h3>
            <div>
                <i class="fa-solid fa-star"></i>
                <h3>{`${spot.avgRating || 'New'}`}</h3>
            </div>
            <h3>{`$${spot.price}/night`}</h3>
        </div>
    )
}

export default SpotsIndexItem;
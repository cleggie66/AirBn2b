const SpotsIndexItem = ({spot}) => {

    return (
        <div>
            <h3>{`${spot.city}, ${spot.state}`}</h3>
            <h3>{spot.rating}</h3>
            <h3>{`${spot.price}`}</h3>
        </div>
    )
}

export default SpotsIndexItem;
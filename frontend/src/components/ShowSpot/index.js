import { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpot } from "../../store/spotReducer";
import './ShowSpot.css'

const ShowSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const missingNo = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spots.singleSpot)

    if (Object.values(spot).length < 1) {
        return (<h2>Loading...</h2>)
    }

    // valid image check
    let img1;
    let img2;
    let img3;
    let img4;
    let img5;
    if (spot.SpotImages[0]) { img1 = spot.SpotImages[0].url }
    if (spot.SpotImages[1]) { img2 = spot.SpotImages[1].url }
    if (spot.SpotImages[2]) { img3 = spot.SpotImages[2].url }
    if (spot.SpotImages[3]) { img4 = spot.SpotImages[3].url }
    if (spot.SpotImages[4]) { img5 = spot.SpotImages[4].url }

    return (
        <div className='show-spot-page'>
            <div className='show-spot'>
                <h2>{spot.name}</h2>
                <h3>{`${spot.city},${spot.state},${spot.country}`}</h3>
                <div className='image-gallery'>
                    <div className='preview-image'>
                        <div className='preview-image-container'>
                            <img className='img-1' src={img1 || missingNo} alt={spot.name}></img>
                        </div>
                    </div>
                    <div className='side-images'>
                        <div className='side-image-container'>
                            <img className='img-2' src={img2 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container'>
                            <img className='img-3' src={img3 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container'>
                            <img className='img-4' src={img4 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container'>
                            <img className='img-5' src={img5 || missingNo} alt={spot.name}></img>
                        </div>
                    </div>
                </div>
                <div className='spot-info'>
                    <div className='spot-info-text'>
                        <h2>{`Hosted By ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-info-action-box'>
                        <h2>{`$${spot.price} night`}</h2>
                        <i className="fa-solid fa-star"></i>
                        <h4>{spot.avgRating}</h4>
                        <h4>{`${spot.numReviews} review(s)`}</h4>
                        <button>Reserve</button>
                    </div>
                </div>
                <hr></hr>
                <div className='review-section'>
                    <i className="fa-solid fa-star"></i>
                    <h2>{spot.avgRating}</h2>
                    <h2>{`${spot.numReviews} review(s)`}</h2>
                    {/* TODO: add review data here */}
                </div>
            </div>
        </div>
    )

}

export default ShowSpot;
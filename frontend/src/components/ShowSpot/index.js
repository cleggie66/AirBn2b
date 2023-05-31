import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpot } from "../../store/spotReducer";
import { setSpotReviews, setUserReviews } from '../../store/reviewReducer';
import DatePicker from "react-datepicker"
import OpenModalButton from '../OpenModalButton';
import AddReviewModal from '../AddReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import './ShowSpot.css';

const ShowSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const missingNo = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [isReviewed, setIsReviewed] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const spot = useSelector(state => state.spots.singleSpot)
    const spotReviewState = useSelector(state => state.reviews.spot)
    const userReviewState = useSelector(state => state.reviews.user)
    const sessionUser = useSelector(state => state.session.user);

    const spotReviewArray = (Object.values(spotReviewState));
    const spotReviews = spotReviewArray.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
    const userReviews = (Object.values(userReviewState));

    const onDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        dispatch(getSpot(spotId))
        dispatch(setSpotReviews(spotId))
        dispatch(setUserReviews())
    }, [dispatch, spotId, userReviews.length])

    // Finds all booked dates for spot
    useEffect(() => {
        let bookedDates = [];
        const bookings = spot.Bookings;
        bookings?.forEach((booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            for (
                let date = start;
                date <= end;
                date.setDate(date.getDate() + 1)
            ) {
                bookedDates.push(new Date(date));
            }
        })
        // ACT OF GOD: Blocks out random dates
        const today = new Date()
        const randomDay = spot.name?.charCodeAt(0) % 25;
        let date = new Date(`${today.getMonth() + 1}-${randomDay}-${today.getFullYear()}`)
        
        for (let i = 0; i < 3; i++) {
            bookedDates.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        setUnavailableDates(bookedDates);
    }, [spot])

    // Finds out if spot has been reviewed by current user
    useEffect(() => {
        let boolean = false;
        for (let i = 0; i < userReviews.length; i++) {
            const review = userReviews[i];
            if (review.spotId === spot.id) boolean = true;
        }
        if (boolean) {
            setIsReviewed(true)
        } else {
            setIsReviewed(false)
        };
    }, [userReviews, setIsReviewed, spot])

    useEffect(() => {
        setDisabled(
            (
                sessionUser &&
                sessionUser.id !== spot.ownerId &&
                !isReviewed
            ) ? false : true
        )
    }, [sessionUser, spot, isReviewed])

    if (Object.values(spot).length < 1) {
        return (<h2>Loading...</h2>)
    }

    if (spot.avgRating) { spot.avgRating = parseFloat(spot.avgRating).toFixed(2) }

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
        <div className='page'>
            <div className='show-spot'>
                <h2 className='title'>{spot.name}</h2>
                <h3 className='title-location'>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
                <div className='image-gallery'>
                    <div className='preview-image'>
                        <div className='preview-image-container img1'>
                            <img className='spot-image' src={img1 || missingNo} alt={spot.name}></img>
                        </div>
                    </div>
                    <div className='side-images-collection'>
                        <div className='side-image-container img2'>
                            <img className='spot-image' src={img2 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container img3'>
                            <img className='spot-image' src={img3 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container img4'>
                            <img className='spot-image' src={img4 || missingNo} alt={spot.name}></img>
                        </div>
                        <div className='side-image-container img5'>
                            <img className='spot-image' src={img5 || missingNo} alt={spot.name}></img>
                        </div>
                    </div>
                </div>
                <div className='spot-info'>
                    <div className='spot-info-text'>
                        <h2 className='hosted-by'>{`Hosted By ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-info-action-box'>
                        <div className='price-per-night'>
                            <h2>{`$${spot.price}`}</h2>
                            <h4>night</h4>
                        </div>
                        <div className='review-totals'>
                            <i className="fa-solid fa-star"></i>
                            {spot.avgRating && (
                                <>
                                    <h4>{spot.avgRating}</h4>
                                    <h4>•</h4>
                                    <h4>{`${spot.numReviews} ${(spot.numReviews === 1) ? "review" : "reviews"}`}</h4>
                                </>
                            )}
                            {!spot.avgRating && (
                                <>
                                    <h4>New</h4>
                                </>
                            )}
                        </div>
                        <DatePicker
                            selected={startDate}
                            onChange={onDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            excludeDates={unavailableDates}
                            selectsRange
                            selectsDisabledDaysInRange
                            inline
                        />
                        <button className='reserve-button' onClick={() => window.alert("Feature coming soon")}>Reserve</button>
                    </div>
                </div>
                <hr className='line-break'></hr>
                <div className='review-section'>
                    <div className='review-header'>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating && (
                            <>
                                <h2>{spot.avgRating}</h2>
                                <h2>•</h2>
                                <h2>{`${spot.numReviews} ${(spot.numReviews === 1) ? "review" : "reviews"}`}</h2>
                            </>
                        )}
                        {!spot.avgRating && (
                            <>
                                <h2>New</h2>
                            </>
                        )}
                    </div>
                    {!disabled && (
                        <OpenModalButton
                            className="post-review-button"
                            disabled={disabled}
                            buttonText="Post Your Review"
                            modalComponent={<AddReviewModal spot={spot} />}
                        />
                    )}
                    {(!spotReviews.length && sessionUser.id !== spot.ownerId && (
                        <h2>Be the first to post a review!</h2>
                    ))}
                    {spotReviews.map((review) => {
                        return (
                            <div className='review' key={review.id}>
                                <h3>{`${review.User.firstName} ${review.User.lastName}`}</h3>
                                <h5 className='review-date'>{`${new Date(review.createdAt).toLocaleString('default', { month: 'long' })} ${new Date(review.createdAt).getFullYear()}`}</h5>
                                <p>{review.review}</p>
                                {(sessionUser && (sessionUser.id === review.User.id)) && (
                                    <OpenModalButton
                                        buttonText="Delete"
                                        className="delete-review-button"
                                        modalComponent={<DeleteReviewModal review={review} />}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default ShowSpot;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { addReview } from "../../store/reviewReducer";
import './AddReviewModal.css'

const AddReviewModal = ({ spot }) => {
    const [rating, setRating] = useState(0)
    const [activeRating, setActiveRating] = useState(0)
    const [review, setReview] = useState('');
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spotId = spot.id

    useEffect(() => {
        if ( review.length >= 10 && rating !== 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [review, rating])

    useEffect(() => {
        setActiveRating(rating)
    }, [rating])

    const onSubmit = () => {
        return dispatch(addReview({
            review,
            stars: rating,
            spotId
        }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }

    const reviewStarSetup = (num) => {
        return (
            <i
                className={activeRating >= num ? "fa-solid fa-star" : "fa-regular fa-star"}
                onMouseEnter={(() => setActiveRating(num))}
                onMouseLeave={(() => setActiveRating(rating))}
                onClick={() => setRating(num)}
            >
            </i>
        )
    }


    return (
        <div className="add-review-modal">
            <div className="close-modal-icon">
                <i className="fa-solid fa-circle-xmark" />
            </div>
            <h2>How was your stay?</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                </ul>
            )}
            <textarea
                placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            >
            </textarea>
            <div className="add-review-stars">
                {reviewStarSetup(1)}
                {reviewStarSetup(2)}
                {reviewStarSetup(3)}
                {reviewStarSetup(4)}
                {reviewStarSetup(5)}
                <h4>Stars</h4>
            </div>
            <button
                className="add-review-button"
                onClick={onSubmit}
                disabled={disabled}
            >
                Submit Your Review
            </button>
        </div>
    )
}

export default AddReviewModal;
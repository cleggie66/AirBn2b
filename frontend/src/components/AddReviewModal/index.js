import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { addReview } from "../../store/reviewReducer";
import './AddReviewModal.css'

const AddReviewModal = ({spot}) => {
    const spotId = spot.id
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [ rating, setRating ] = useState(0)
    const [ activeRating, setActiveRating ] = useState(0)
    const [ review, setReview ] = useState('')

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
    }

    const reviewStarSetup = (num) => {
        return (
            <i
                className={ activeRating >= num ? "fa-solid fa-star" : "fa-regular fa-star"}
                onMouseEnter={(() => setActiveRating(num))}
                onMouseLeave={(() => setActiveRating(rating))}
                onClick={() => setRating(num)}
            >
            </i>
        )
    }


    return (
        <div>
            <h2>How was your stay?</h2>
            <textarea
                placeholder="Just a quick review."
                value={review}
                onChange={(e)=>setReview(e.target.value)}
            >
            </textarea>
            <div>
                {reviewStarSetup(1)}
                {reviewStarSetup(2)}
                {reviewStarSetup(3)}
                {reviewStarSetup(4)}
                {reviewStarSetup(5)}
            </div>
            <button onClick={onSubmit}>Submit Your Review</button>
        </div>
    )
}

export default AddReviewModal;
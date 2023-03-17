import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviewReducer";

const DeleteReviewModal = ({ review })  => {
    console.log(review)
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const reviewId = review.id;
    const spotId = review.spotId;

    const handleDelete = (e) => {
        dispatch(deleteReview({ reviewId, spotId }))
        .then(closeModal)
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;
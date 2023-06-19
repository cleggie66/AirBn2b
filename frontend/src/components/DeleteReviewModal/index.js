import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviewReducer";
import "./DeleteReviewModal.css"

const DeleteReviewModal = ({ review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const reviewId = review.id;
    const spotId = review.spotId;

    const handleDelete = (e) => {
        dispatch(deleteReview({ reviewId, spotId }))
            .then(closeModal)
    }

    return (
        <div className="delete-review-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button
                onClick={handleDelete}
                className="confirm-delete-review-button"
            >
                Yes (Delete Review)
            </button>
            <button
                onClick={closeModal}
                className="cancel-delete-review"
            >
                No (Keep Review)
            </button>
        </div>
    )
}

export default DeleteReviewModal;
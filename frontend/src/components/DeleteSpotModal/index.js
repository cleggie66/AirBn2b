import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spotReducer";
import "./DeleteSpotModal.css";

const DeleteSpotModal = ({ spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deleteSpot(spot))
            .then(closeModal)
    };

    return (
        <div className="delete-spot-modal">
            <div className="close-modal-icon" onClick={closeModal}>
                <i className="fa-solid fa-circle-xmark" />
            </div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button
                onClick={handleDelete}
                className="confirm-delete-spot-button"
            >
                Yes (Delete Spot)
            </button>
            <button
                onClick={closeModal}
                className="cancel-delete-spot"
            >
                No (Keep Spot)
            </button>
        </div>
    )
};

export default DeleteSpotModal;
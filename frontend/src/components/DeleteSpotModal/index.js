import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spotReducer";
import { setCurrentSpots } from "../../store/spotReducer";

const DeleteSpotModal = ({spot}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deleteSpot(spot))
            .then(closeModal)
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <button onClick={handleDelete}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
};

export default DeleteSpotModal
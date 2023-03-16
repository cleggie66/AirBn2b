import { useModal } from "../../context/Modal";

const DeleteSpotModal = () => {
    const { closeModal } = useModal();

    const deleteSpot = () => {

        // return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        //     .then(closeModal)

    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <button>Yes (Delete Spot)</button>
            <button>No (Keep Spot)</button>
        </div>
    )
};

export default DeleteSpotModal
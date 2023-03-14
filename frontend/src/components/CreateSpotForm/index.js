import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addNewSpot } from "../../store/spotReducer";


const CreateSpotForm = () => {
    const [address, setAddress ] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();


    const onSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        return dispatch(addNewSpot({ name }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors))
            })
    }

    return (
        <form onSubmit={onSubmit}>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            )}
            <label>
                Spot Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
        </form>
    );
}

export default CreateSpotForm;
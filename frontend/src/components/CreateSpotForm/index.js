import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addNewSpot } from "../../store/spotReducer";
import './CreateSpotForm.css'


const CreateSpotForm = () => {
    const [country, setCountry] = useState('Country')
    const [address, setAddress] = useState('Address')
    const [city, setCity] = useState('City')
    const [state, setState] = useState('STATE')
    // const [lat, setLat] = useState('Latitude')
    // const [lng, setLng] = useState('Longitude')
    const [description, setDescription] = useState('Please write at least 30 characters')
    const [name, setName] = useState('Name of your spot')
    const [price, setPrice] = useState('Price per night (USD)')
    const [previewPhoto, setPreviewPhoto] = useState('Preview Image URL')
    const [photo2, setPhoto2] = useState('Image URL')
    const [photo3, setPhoto3] = useState('Image URL')
    const [photo4, setPhoto4] = useState('Image URL')
    const [photo5, setPhoto5] = useState('Image URL')
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
            <h2>Create a New Spot</h2>
            <h3>Where's your place located?</h3>
            <p>
                Guests will only get your exact address once they booked a reservation
            </p>
            <label>
                Country:
            </label>
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <label>
                Street Address:
            </label>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <label>
                City:
            </label>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <label>
                State:
            </label>
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <hr />
            <h3>Describe your place to guests</h3>
            <p>
                Mention the best features of your space, any special amentities like
                fast wif or parking, and what you love about the neighborhood.
            </p>
            <input
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <hr />
            <h3>Create a title for your spot</h3>
            <p>
                Catch guests' attention with a spot title that highlights what makes
                your place special.
            </p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <hr />
            <h3>Set a base price for your spot</h3>
            <p>
                Competitive pricing can help your listing stand out and rank higher
                in search results.
            </p>
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <hr />
            <h3>Liven up your spot with photos</h3>
            <p>
                Submit a link to at least one photo to publish your spot.
            </p>
            <input
                type="text"
                value={previewPhoto}
                onChange={(e) => setPreviewPhoto(e.target.value)}
            />
            <input
                type="text"
                value={photo2}
                onChange={(e) => setPhoto2(e.target.value)}
            />
            <input
                type="text"
                value={photo3}
                onChange={(e) => setPhoto3(e.target.value)}
            />
            <input
                type="text"
                value={photo4}
                onChange={(e) => setPhoto4(e.target.value)}
            />
            <input
                type="text"
                value={photo5}
                onChange={(e) => setPhoto5(e.target.value)}
            />
            <hr />
            <button tpye='submit'>Create Spot</button>

        </form>
    );
}

export default CreateSpotForm;
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addNewSpot } from "../../store/spotReducer";
import './CreateSpotForm.css'


const CreateSpotForm = () => {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState(-122.4730327)
    const [lng, setLng] = useState(-122.4730327)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [previewPhoto, setPreviewPhoto] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')
    const [photo4, setPhoto4] = useState('')
    const [photo5, setPhoto5] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const spot = await dispatch(addNewSpot({ address, city, state, country, lat, lng, name, description, price }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors))
            })

        history.push(`/spots/${spot.id}`)
    }

    return (
        <form onSubmit={onSubmit} className="create-spot-form">
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
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
            />
            <label>
                Street Address:
            </label>
            <input
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
            />
            <label>
                City:
            </label>
            <input
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
            />
            <label>
                State:
            </label>
            <input
                type="text"
                value={state}
                placeholder="STATE"
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
                placeholder="Please write at least 30 characters"
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
                placeholder="Name of your spot"
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
                placeholder="Price per night (USD)"
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
                placeholder="Preview Image URL"
                onChange={(e) => setPreviewPhoto(e.target.value)}
            />
            <input
                type="text"
                value={photo2}
                placeholder="Image URL"
                onChange={(e) => setPhoto2(e.target.value)}
            />
            <input
                type="text"
                value={photo3}
                placeholder="Image URL"
                onChange={(e) => setPhoto3(e.target.value)}
            />
            <input
                type="text"
                value={photo4}
                placeholder="Image URL"
                onChange={(e) => setPhoto4(e.target.value)}
            />
            <input
                type="text"
                value={photo5}
                placeholder="Image URL"
                onChange={(e) => setPhoto5(e.target.value)}
            />
            <hr />
            <button tpye='submit'>Create Spot</button>

        </form>
    );
}

export default CreateSpotForm;
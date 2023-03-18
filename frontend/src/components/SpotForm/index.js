import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addNewSpot, updateSpot } from "../../store/spotReducer";
import { addNewSpotImage } from '../../store/spotReducer';
import './SpotForm.css'


const SpotForm = ({ spot, formType }) => {
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [description, setDescription] = useState(spot.description)
    const [name, setName] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    const [previewPhoto, setPreviewPhoto] = useState(spot.previewPhoto)
    const [photo2, setPhoto2] = useState(spot.photo2)
    const [photo3, setPhoto3] = useState(spot.photo3)
    const [photo4, setPhoto4] = useState(spot.photo4)
    const [photo5, setPhoto5] = useState(spot.photo5)
    const [errors, setErrors] = useState([])
    let spotId;
    if (spot.id) { spotId = spot.id }

    const dispatch = useDispatch();
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        let newSpot;

        if (formType === 'Create Spot') {
            newSpot = await dispatch(addNewSpot({ address, city, state, country, lat, lng, name, description, price }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors))
                });
            await dispatch(addNewSpotImage({ url: previewPhoto, preview: true, spotId: newSpot.id }))
            await dispatch(addNewSpotImage({ url: photo2, preview: false, spotId: newSpot.id }))
            await dispatch(addNewSpotImage({ url: photo3, preview: false, spotId: newSpot.id }))
            await dispatch(addNewSpotImage({ url: photo4, preview: false, spotId: newSpot.id }))
            await dispatch(addNewSpotImage({ url: photo5, preview: false, spotId: newSpot.id }))
        }
        if (formType === 'Update Spot') {
            newSpot = await dispatch(updateSpot({ spotId, address, city, state, country, lat, lng, name, description, price }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors))
                })
        }

        history.push(`/spots/${newSpot.id}`)
    }

    return (
        <div className='page'>
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
                <span>
                    <input
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </span>
                <label>
                    Street Address:
                </label>
                <span>
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </span>
                <div className='dual-input'>
                    <div className='city-input'>
                        <label>
                            City:
                        </label>
                        <input
                            type="text"
                            value={city}
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <h3>,</h3>
                    <div className='state-input'>
                        <label>
                            State:
                        </label>
                        <input
                            type="text"
                            value={state}
                            placeholder="STATE"
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                </div>
                <hr className='spot-form-divider' />
                <h3>Describe your place to guests</h3>
                <p>
                    Mention the best features of your space, any special amentities like
                    fast wif or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    className='textarea'
                    value={description}
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <hr className='spot-form-divider' />
                <h3>Create a title for your spot</h3>
                <p>
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>
                <span>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                    />
                </span>
                <hr className='spot-form-divider' />
                <h3>Set a base price for your spot</h3>
                <p>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                </p>
                <div className='price-input'>
                    <h4>$</h4>
                    <span>
                        <input
                            type="text"
                            value={price}
                            placeholder="Price per night (USD)"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </span>
                </div>
                <hr className='spot-form-divider' />
                {formType === 'Create Spot' && (
                    <>
                        <h3>Liven up your spot with photos</h3>
                        <p>
                            Submit a link to at least one photo to publish your spot.
                        </p>
                        <span>
                            <input
                                type="text"
                                value={previewPhoto}
                                placeholder="Preview Image URL"
                                onChange={(e) => setPreviewPhoto(e.target.value)}
                            />
                        </span>
                        <span>
                            <input
                                type="text"
                                value={photo2}
                                placeholder="Image URL"
                                onChange={(e) => setPhoto2(e.target.value)}
                            />
                        </span>
                        <span>
                            <input
                                type="text"
                                value={photo3}
                                placeholder="Image URL"
                                onChange={(e) => setPhoto3(e.target.value)}
                            />
                        </span>
                        <span>
                            <input
                                type="text"
                                value={photo4}
                                placeholder="Image URL"
                                onChange={(e) => setPhoto4(e.target.value)}
                            />
                        </span>
                        <span>
                            <input
                                type="text"
                                value={photo5}
                                placeholder="Image URL"
                                onChange={(e) => setPhoto5(e.target.value)}
                            />
                        </span>
                    </>
                )}
                <hr className='spot-form-divider' />
                <button
                    type='submit'
                    className='spot-form-button'
                >
                    {formType}
                </button>

            </form>
        </div>
    );
}

export default SpotForm;
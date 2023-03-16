import SpotForm from './index'

const CreateSpotForm = () => {
    // const spot = {
    //     country: '',
    //     address: '',
    //     city: '',
    //     state: '',
    //     lat: 40,
    //     lng: -122.4730327,
    //     description: '',
    //     name: '',
    //     price: 0,
    //     previewPhoto: '',
    //     photo2: '',
    //     photo3: '',
    //     photo4: '',
    //     photo5: ''
    // };
    const spot = {
        country: 'United States',
        address: 'Test',
        city: 'Test',
        state: 'IL',
        lat: 90,
        lng: -122.4730327,
        description: 'This is a really cool totally real spot that i am not just making up for testing purposes',
        name: 'TEST',
        price: 10000,
        previewPhoto: 'image.png',
        photo2: 'image.png',
        photo3: '',
        photo4: '',
        photo5: ''
    };

    return (
        <SpotForm spot={spot} formType="Create Spot" />
    )
}

export default CreateSpotForm;
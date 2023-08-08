import SpotForm from './index';

const CreateSpotForm = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        lat: 40,
        lng: -122.4730327,
        description: '',
        name: '',
        price: '',
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: ''
    };
    
    return (
        <SpotForm spot={spot} formType="Create Spot" />
    );
};

export default CreateSpotForm;
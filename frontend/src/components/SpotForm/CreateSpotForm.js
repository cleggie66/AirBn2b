import SpotForm from './index'

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
        price: 0,
        previewPhoto: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: ''
    };
    // const spot = {
    //     country: 'United States',
    //     address: 'Test',
    //     city: 'Test',
    //     state: 'IL',
    //     lat: 90,
    //     lng: -122.4730327,
    //     description: 'This is a really cool totally real spot that i am not just making up for testing purposes',
    //     name: 'TEST',
    //     price: 10000,
    //     previewPhoto: 'https://pyxis.nymag.com/v1/imgs/bcc/d5b/348d3f4a520447a43b969323f2bd826fe9-gandolfini-pool-cover.2x.rhorizontal.w807.jpg',
    //     photo2: 'https://cdn.britannica.com/48/103148-050-1CBE7D69/Cast-members-The-Sopranos-Steve-Van-Zandt.jpg',
    //     photo3: 'https://i.insider.com/5aa1827765c6e6224b8b45e4?width=1300&format=jpeg&auto=webp',
    //     photo4: 'https://ychef.files.bbci.co.uk/1600x900/p06xj8jl.webp',
    //     photo5: 'https://static.wikia.nocookie.net/sopranos/images/6/60/The_Soprano_Crew-_Tony_Soprano%2C_Christopher_Moltisanti%2C_Paulie_Gualtieri_and_Silvio_Dante.jpg/revision/latest/scale-to-width-down/1000?cb=20211026135123'
    // };

    return (
        <SpotForm spot={spot} formType="Create Spot" />
    )
}

export default CreateSpotForm;
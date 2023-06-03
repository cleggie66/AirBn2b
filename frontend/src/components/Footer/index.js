import './Footer.css';
import OpenModalButton from '../OpenModalButton';
import AboutModal from '../AboutModal';


function Footer({ isLoaded }) {
    return (
        <div className='footer'>
            <p>Copyright © 2023 Caleb Cleghorn</p>
            <p>•</p>
            <p>All rights reserved</p>
            <p>•</p>
            <OpenModalButton
                className={"about-link"}
                buttonText="About"
                modalComponent={<AboutModal/>}
            />
            <p>•</p>
            <div className='footer-icons'>
                <a href="https://cleggie66.github.io/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-globe"></i>
                </a>
                <a href="https://github.com/cleggie66" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github" />
                </a>
                <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin" />
                </a>
                <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-envelope" />
                </a>
            </div>
        </div>
    );
}

export default Footer;
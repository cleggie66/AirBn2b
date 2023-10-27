import OpenModalButton from '../OpenModalButton';
import AboutModal from "../AboutModal";
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <p>Copyright © 2023 Caleb Cleghorn</p>
            <h4>•</h4>
            <p>All rights reserved</p>
            <h4>•</h4>
            <OpenModalButton
                className={"about-link"}
                buttonText="About"
                modalComponent={<AboutModal/>}
            />
            <h4>•</h4>
            <div className='footer-icons'>
                <a href="https://caleb-cleghorn.onrender.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-globe"></i>
                </a>
                <a href="https://github.com/cleggie66" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github" />
                </a>
                <a href="https://www.linkedin.com/in/caleb-cleghorn-31843b189/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                </a>
                <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-envelope" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
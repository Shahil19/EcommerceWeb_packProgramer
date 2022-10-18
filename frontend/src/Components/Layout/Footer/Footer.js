import React from 'react';
import appStore from "../../../images/Appstore.png"
import playStore from "../../../images/playstore.png"
import "./Footer.css"

const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download our app for Android And IOS mobile phone</p>
                <img src={appStore} alt="appStore" />
                <img src={playStore} alt="playStore" />
            </div>
            <div className="midFooter">
                <h1>IBS.</h1>
                <p>High quality is our first priority</p>

                <p>Copyright 2022 &copy;SHAHIL </p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="#a">Instagram</a>
                <a href="#a">Facebook</a>
                <a href="#a">Youtube</a>
            </div>
        </footer>
    );
};

export default Footer;
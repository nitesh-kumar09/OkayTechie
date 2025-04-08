import React from "react";
import "./footer.css";
import {
  AiFillFacebook,

} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2025 Your OkayTechie Platform. All rights reserved. <br /> 
        </p>
        <div className="social-links" >
          <a href="#" target="_blank">
            <AiFillFacebook />
          </a>
          <a href="https://x.com/OkayTechie" target="_blank">
           <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/okaytechie/" target="_blank">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

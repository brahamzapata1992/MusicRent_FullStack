import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosPin } from "react-icons/io";
import logo from "../../assets/img_header/logo.png";
import "./footer.css";

function Footer() {
   return (
      <footer className='footer-principal'>
         <div className="container-footer-izq">
            <div className='contenedor-footer-img'>
            <img className='logo-footer' src={logo} alt="Logo" />
            </div>
            <div>
            <p className='Copy-footer'>&copy; 2024 Copyright.MusicRent</p>
            </div>                        
         </div>
            
      </footer>
   );
}
export default Footer;




'use client';
import './footer.css'

import { CiInstagram } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return(
    <>
    <div className="mainArea">
    <hr className="divider" />
      <div className="iconArea">
        <a href="https://www.instagram.com/mplusplus_official/" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
          <CiInstagram className='icon' />
        </a>
        <a href="https://x.com/mplusplus_jpn" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
          <RiTwitterXFill className='icon'/>
        </a>
        <a href="https://www.facebook.com/mplpl" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
          <FaFacebookF className='icon'/>
        </a>
        <a href="https://vimeo.com/mplusplus" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
          <FaVimeoV className='icon'/>
        </a>
        <a href="https://www.youtube.com/channel/UCxzxaKL-9ri5-Nhooi0_oBw" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
          <FaYoutube className='icon'/>
        </a>
      </div>
      <p style={{paddingTop: '5px'}}>COPYRIGHT © MPLUSPLUS Co.,Ltd.ALL RIGHTS RESERVED.</p>
    </div>
    </>
  );
}

export default Footer;
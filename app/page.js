'use client';
import styles from "./page.module.css";

import { CiInstagram } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from 'react';

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoScale, setVideoScale] = useState(1);
  const VIDEO_WIDTH = 1920;
  const VIDEO_HEIGHT =1080;

  useEffect(() => {
    setIsClient(true);
    const tmpScaleX = window.innerWidth/VIDEO_WIDTH + 0.0;
    const tmpScaleY = window.innerHeight/VIDEO_HEIGHT + 0.0;
    if(tmpScaleX > tmpScaleY) {
      setVideoScale(tmpScaleX);
    }
    else {
      setVideoScale(tmpScaleY);
    }

    const handleResize = () => {
      const tmpScaleX = window.innerWidth/VIDEO_WIDTH + 0.0;
      const tmpScaleY = window.innerHeight/VIDEO_HEIGHT + 0.0;
      if(tmpScaleX > tmpScaleY) {
        setVideoScale(tmpScaleX);
      }
      else {
        setVideoScale(tmpScaleY);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  if(!isClient) {
    return null;
  }
  return (
    <>
    <div style={{position: 'absolute', width: '100%', height: '100%',top:'0', pointerEvents: 'auto',zIndex:'-1'}}>
      <div className='vimeo-player-wrapper'
           style={{position: 'fixed',
                   top: '0',
                   left: '0',
                   right: '0',
                   bottom: '0',
                   overflow: 'hidden',
                   width: '100%',
                   height: '100%',
                   display: 'flex',
                   justifyContent: 'center',
                   aslignItems: 'center',
                   backgroundColor: 'black'}}
      >
      
        <iframe 
        src="https://player.vimeo.com/video/724408155?h=3d12c3d84c&controls=0&autoplay=1&loop=1&background=1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${VIDEO_WIDTH}px`,
          height: `${VIDEO_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${videoScale})`, // 動画を中心に拡大
          objectFit: 'none'
        }}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
      
        <div className="logos" style={{position: 'relative',display: 'flex',left: '0%',top: '20px',
            flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height: '100vh',zIndex: '1'}}>
          <img 
            src="https://www.mplpl.com/wp-content/themes/mplpl/images/top/img_01.png"
            href = "./project"
            className={styles['fade-in']}
            style={{width: '150px', height: 'auto'}}
          />
          <div style={{position: 'relative',display: 'absolute', justifyContent: 'center', marginTop: '30px'}}>
            <a href="https://www.instagram.com/mplusplus_official/" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
              <CiInstagram style={{ fontSize: "25px", color: "white", margin: "0 6px" }} />
            </a>
            <a href="https://x.com/mplusplus_jpn" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
              <RiTwitterXFill style={{fontSize: '25px', color: 'white', margin: '0 6px'}}/>
            </a>
            <a href="https://www.facebook.com/mplpl" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
              <FaFacebookF style={{fontSize: '25px', color: 'white', margin: '0 6px'}}/>
            </a>
            <a href="https://vimeo.com/mplusplus" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
              <FaVimeoV style={{fontSize: '25px', color: 'white', margin: '0 6px'}}/>
            </a>
            <a href="https://www.youtube.com/channel/UCxzxaKL-9ri5-Nhooi0_oBw" target="_blank" rel="noopener noreferrer" style={{ zIndex: '11' }}>
              <FaYoutube style={{fontSize: '25px', color: 'white', margin: '0 6px'}}/>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

Home.hideFooter = true;

export default Home;

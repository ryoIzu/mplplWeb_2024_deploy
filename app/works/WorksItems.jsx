'use client';
import './works.css';
import Image from 'next/image';
import  Col from 'react-bootstrap/Col';
import { useState } from 'react';

function WorksItems(props) {
  const [isHovered, setIsHovered] = useState([false,false,false]);

  const handleMouseEnter = (index) => {
    setIsHovered(prev =>{
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };
  const handleMouseLeave = (index) => {
    setIsHovered(prev =>{
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const handleLink = (url) => () => {
    window.location.href = url;
  };
  
  return(
    <>
        <Col xs={12} 
             md={4}
             className='image-container'
             onClick={handleLink(props.link_0)}
             onMouseEnter = {() => handleMouseEnter(0)}
             onMouseLeave={() => handleMouseLeave(0)}
        >
        <Image 
          key={props.key_0} src={props.imageURL_0}
          width={1280} height={720}
          alt= {props.alt_0}/>
          {isHovered[0] && (
            <p style={{cursor: 'pointer'}}>{props.title_0}</p>
          )}
        </Col>
    </>
  );
}

export default WorksItems;
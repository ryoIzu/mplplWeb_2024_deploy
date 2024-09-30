"use client";
import './who.css';
import Accordion from 'react-bootstrap/Accordion';

function Personality({props}) {
  return(
    <>
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>
          <div className='accordion-header-content'>
            <div>
              <p className='title'>{props.title}</p>
              <p className='name'>{props.name}<a href={props.webSiteURL} target="_blank" rel="noopener noreferrer" style={{marginLeft: '15px'}}>{props.webSiteText}</a></p>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {props.content}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default Personality;
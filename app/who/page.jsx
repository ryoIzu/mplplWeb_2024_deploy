'use client';
import './who.css';
import Accordion from 'react-bootstrap/Accordion';
import Personality from './Personality';
import Image from 'next/image';

import {
  content_fujimoto,
  content_nakata,
  content_yanagisawa,
  content_yoshiike,
  content_suzuki,
  content_ono,
  content_kato,
  content_ueda,
  content_takeuchi,
  content_fumiki,
} from './personality_mplpl';

import {
  content_shirasu,
  content_kohey,
  content_kurita,
  content_michido,
  content_tossi,
  content_Ai,
} from './personality_mplplStage';

export default function Who() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Image
        src="/logo/logo_mplpl.png"
        width={467}
        height={60}
        alt="mplpl"
        style={{ width: 'auto', height: '40px', paddingLeft: '30px' }}
      />
      <Accordion className="custom-accordion">
        <Personality props={content_fujimoto} />
        <Personality props={content_nakata} />
        <Personality props={content_yanagisawa} />
        <Personality props={content_yoshiike} />
        <Personality props={content_suzuki} />
        <Personality props={content_ono} />
        <Personality props={content_kato} />
        <Personality props={content_ueda} />
        <Personality props={content_takeuchi} />
        <Personality props={content_fumiki} />
      </Accordion>
      <Image
        src="/logo/logo_mplplstage.png"
        width={743}
        height={60}
        alt="mplpl"
        style={{
          width: 'auto',
          height: '40px',
          paddingLeft: '30px',
          marginTop: '60px',
        }}
      />
      <Accordion className="custom-accordion">
        <Personality props={content_shirasu} />
        <Personality props={content_nakata} />
        <Personality props={content_kohey} />
        <Personality props={content_kurita} />
        <Personality props={content_michido} />
        <Personality props={content_tossi} />
      </Accordion>
      <h2 style={{ paddingLeft: '30px', color: 'white' }}>Supporters</h2>
      <Accordion className="custom-accordion">
        <Personality props={content_Ai} />
      </Accordion>
    </div>
  );
}

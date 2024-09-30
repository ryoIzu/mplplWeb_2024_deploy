'use client';
import { useState, useEffect, useMemo } from 'react';

const EditorWorks = (props) => {
  const [test, setTest] = useState('from Child2222');

  useEffect(() => {
    props.setContents(test);
  }, []);

  return <></>;
};

export default EditorWorks;

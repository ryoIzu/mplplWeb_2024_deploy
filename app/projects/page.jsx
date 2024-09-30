'use client';
import './projects.css';
import { db, storage, ref, getDownloadURL } from '../store/firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProjectItem from './ProjectItem';
import { ProjectContext } from '@/features/hooks/projectContext/projectContext';

import Creation from '../components/layouts/CreateData/CreateData';

export default function Projects() {
  const { projects, projectInfo, isLoad, showProjectNum } =
    useContext(ProjectContext);
  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredContents, setFilteredContents] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    const execute = async () => {
      if (isLoad) {
        if (projects.length > 0) {
          await handleGetImg();
        }
      }
    };

    execute();
  }, [isLoad]);

  const handleFilter = async () => {
    const tmpContents = await contents.filter(
      (content) =>
        content.category === selectedCategory || selectedCategory === 'All',
    );
    //await console.log('tmpContents: ' + tmpContents[0].projectName);
    const filtered = await tmpContents.reduce((acc, _, index) => {
      if (index % 3 === 0) {
        const itemsInRow = [];
        for (let i = 0; i < 3; ++i) {
          const contextIndex = index + i;
          if (contextIndex < tmpContents.length) {
            itemsInRow.push(
              <ProjectItem
                key={contextIndex}
                key_0={contextIndex}
                link_0={`./${tmpContents[contextIndex].imgDir}/`}
                imageURL_0={tmpContents[contextIndex].fileNames[0]}
                alt_0={tmpContents[contextIndex].imgDir}
                title_0={tmpContents[contextIndex].projectName}
              />,
            );
          }
        }
        if (itemsInRow.length > 0) {
          acc.push(<Row key={index}>{itemsInRow}</Row>);
        }
      }
      return acc;
    }, []);

    setFilteredContents(filtered);
    setIsFilter(true);
  };

  useEffect(() => {
    handleFilter();
  }, [contents]);
  useEffect(() => {
    handleFilter();
  }, [selectedCategory]);

  const handleGetImg = async () => {
    try {
      const updatedContents = await Promise.all(
        projects.map(async (content) => {
          const updatedFileNames = await Promise.all(
            content.fileNames.map(async (fileName) => {
              const _tmpRef = content.imgDir + '/' + fileName;
              const _storageRef = ref(storage, _tmpRef);
              return getDownloadURL(_storageRef);
            }),
          );

          return {
            ...content,
            fileNames: updatedFileNames,
          };
        }),
      );
      await setContents(updatedContents);
    } catch (err) {
      console.error('Error', err);
    }
  };

  //firebaseにアップするときに使う
  const handleUpload = async () => {
    for (let i = 0; i < 29; ++i) {
      const _imgDir = i.toString().padStart(5, '0');
      const imgDir = 'projects/' + i.toString().padStart(5, '0');
      const data = {
        contents: '',
        fileNames: ['01.png'],
        movieLink: [false, 'url'],
        imgDir: imgDir,
        projectName: 'project0' + i.toString(),
      };
      const docID = _imgDir;
      const docRef = doc(db, 'projects', docID);
      await setDoc(docRef, data);
    }
  };

  const handleRegisterCategory = async () => {
    console.log('clicked');
    projects.map(async (project) => {
      try {
        const docID = project.imgDir.slice(9, 14);
        //console.log(docID);
        const docRef = doc(db, 'projects', docID);
        const data = {
          category: 'merchandise',
        };
        await updateDoc(docRef, data);
      } catch (e) {
        console.log('ERR', e);
      }
    });
    alert('done.');
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      {isFilter === true ? (
        <>
          {/*アップロード用 */}
          <Creation />
          <div className="search">
            <h5>category:</h5>
            <div className="div_radio">
              <input
                type="radio"
                id="All"
                name="search"
                value="All"
                onChange={handleChange}
                checked={selectedCategory === 'All'}
              />
              <label htmlFor="All">All</label>
            </div>
            <div className="div_radio">
              <input
                type="radio"
                id="merchandise"
                name="search"
                value="merchandise"
                onChange={handleChange}
                checked={selectedCategory === 'merchandise'}
              />
              <label htmlFor="merchandise">Merchandise</label>
            </div>
            <div className="div_radio">
              <input
                type="radio"
                id="performance"
                name="search"
                value="performance"
                onChange={handleChange}
                checked={selectedCategory === 'performance'}
              />
              <label htmlFor="performance">Performance</label>
            </div>
            <div className="div_radio">
              <input
                type="radio"
                id="system"
                name="search"
                value="system"
                onChange={handleChange}
                checked={selectedCategory === 'system'}
              />
              <label htmlFor="system">System</label>
            </div>
          </div>
          <Container
            fluid
            style={{ width: '100%', padding: '0px', margin: '0px' }}
          >
            {filteredContents}
          </Container>
        </>
      ) : (
        <>
          <p>Loading....</p>
        </>
      )}
    </>
  );
}

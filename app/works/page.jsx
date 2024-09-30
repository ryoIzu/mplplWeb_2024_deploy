'use client';
import './works.css';
import { db, storage, ref, getDownloadURL } from '../store/firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, uploadString } from 'firebase/storage';
import { useEffect, useState, useContext, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WorksItems from './WorksItems';
import { WorksContext } from '@/features/hooks/worksContext/worksContext';

import Editor_description from '../components/layouts/Editor/Editor';
import Editor_credit from '../components/layouts/Editor/Editor';

import Image from 'next/image';

export default function Works() {
  const { works, worksInfo, isLoadWorks } = useContext(WorksContext);
  const [contents, setContents] = useState([]);
  const [imageURLs, setImageURLs] = useState();
  const [isLoadStore, setIsLoadStore] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  //for storage
  const storage = getStorage();
  const fileInputRef = useRef(undefined);

  //for editor
  const [inputID, setInputID] = useState('');
  const [inputDate, setInputDate] = useState();
  const [inputUpdate, setInputUpdate] = useState();
  const [inputTitle, setInputTitle] = useState('');
  const [inputNumber, setInputNumber] = useState('00');
  const [inputCategory, setInputCategory] = useState('Produce');
  const [inputIsShow, setInputIsShow] = useState(true);
  const [inputDescription, setInputDescription] = useState([]);
  const [inputCredit, setInputCredit] = useState([]);
  const [inputImgDir, setInputImgDir] = useState('');
  const [inputImgURL, setInputImgURL] = useState([]);
  const [inputFileNames, setInputFileNames] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [thumbnailImg, setThumbnailImg] = useState([]);
  const [tmpEmbed, setTmpEmbed] = useState('');
  const [inputVideoEmbedCodes, setInputVideoEmbedCodes] = useState([]);
  const [embedCodeTextColors, setEmbedCodeTextColors] = useState([
    'white',
    'cyan',
  ]);
  const [selectEmbedCode, setSelectEmbedCode] = useState(0);

  const handleValueChange_description = (newValue) => {
    setInputDescription(JSON.stringify(newValue));
    //console.log('set description');
  };

  const handleValueChange_credit = (newValue) => {
    setInputCredit(JSON.stringify(newValue));
    //console.log(JSON.stringify(newValue));
  };

  const handleSelectImg = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      if (file) {
        //拡張子の確認
        const extension = file.name.split('.').pop();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            //画像表示用
            setInputFileNames((prev) => [...prev, file.name]);
            setPreviewImg((prev) => [...prev, reader.result]);
            setThumbnailImg((prev) => [...prev, 'false']);
          }
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });
  };

  const handleUploadImg = async () => {
    try {
      await Promise.all(
        previewImg.map((prev, index) => {
          const storageRef = ref(
            storage,
            inputImgDir + '/' + inputFileNames[index],
          ); //第二引数がファイル名
          return uploadString(storageRef, prev, 'data_url').then((snapShot) => {
            console.log('file: ' + inputFileNames[index]);
          });
        }),
      );
      const tmpImgURLs = await GetImgURL(inputFileNames);
      console.log(tmpImgURLs);
      await setInputImgURL(tmpImgURLs);
    } catch (e) {
      console.error('Error', e);
    }
  };

  useEffect(() => {
    //handleSetFromStore();
    console.log('works');
    if (isLoadWorks === true) {
      works.sort((a, b) => {
        return parseInt(b.update, 10) - parseInt(a.update, 10);
      });
      setContents(works);
      setIsLoadStore(true);
    }
  }, [isLoadWorks]);

  useEffect(() => {
    if (contents.length > 0) {
      handleDownLoad();
    }
  }, [isLoadStore]);

  const GetImgURL = async (files) => {
    try {
      const updateNames = await Promise.all(
        files.map(async (file) => {
          const _tmpRef = inputImgDir + '/' + file;
          const _storageRef = ref(storage, _tmpRef);
          return getDownloadURL(_storageRef);
        }),
      );
      return updateNames;
    } catch (e) {
      console.error('ERROR', e);
    }
  };

  const handleDownLoad = async () => {
    try {
      const updatedContents = await Promise.all(
        contents.map(async (content) => {
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

      setContents(updatedContents);
      setIsLoad(true);
    } catch (error) {
      console.error('Error', error);
      setIsLoad(false);
    }
  };

  const handleUpload_input = async () => {
    await handleUploadImg();
    console.log('click upload_input');
    console.log(inputID);

    // inputImgURL の更新を待つ
    /*
    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (inputImgURL.length > 0) {
          // または、他の条件で確認
          clearInterval(interval);
          resolve();
        } else {
          const tmpImgURLs = await GetImgURL(inputFileNames);
          //console.log(tmpImgURLs);
          await setInputImgURL(tmpImgURLs);
        }
      }, 100); // 100ミリ秒ごとにチェック
    });
    */

    try {
      const promise = async () => {
        const docID = inputID;
        const docRef = doc(db, 'works', docID);
        const data = {
          title: inputTitle,
          category: inputCategory,
          id: inputID,
          date: inputDate,
          update: inputUpdate,
          isShow: inputIsShow,
          description: JSON.parse(inputDescription),
          credit: JSON.parse(inputCredit),
          fileNames: inputFileNames,
          imgDir: inputImgDir,
          imgURLs: inputImgURL,
          videoEmbedCodes: videoEmbedCodes,
        };
        await setDoc(docRef, data);
      };
      await promise();
      alert('uploaded.');
    } catch (e) {
      console.error('ERROR', e);
    }
  };

  const handleSetEmbedCode = () => {
    console.log('click set embed code');
    setInputVideoEmbedCodes((prev) => [...prev, tmpEmbed]);
  };
  const handleSelectEmbedCode = () => {
    setSelectEmbedCode((prev) => {
      if (prev >= inputVideoEmbedCodes.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };
  const handleDeleteEmbedCode = () => {
    console.log('click delete embed code');
    const updatedCodes = inputVideoEmbedCodes.filter(
      (code, index) => index !== selectEmbedCode,
    );
    setInputVideoEmbedCodes(updatedCodes);
  };

  const handleOnChangeInput = (e) => {
    console.log('onChange');
    if (e.target.id === 'input_title') {
      setInputTitle(e.target.value);
    } else if (e.target.id === 'input_category') {
      setInputCategory(e.target.name);
    } else if (e.target.id === 'input_isShow') {
      setInputIsShow(e.target.value);
    } else if (e.target.id === 'input_date') {
      setInputDate(e.target.value);
      const tmp = e.target.value;
      const formatted = tmp.replace(/-/g, '') + inputNumber;
      setInputID(formatted);
      setInputImgDir('works/' + formatted);
    } else if (e.target.id === 'input_upDate') {
      setInputUpdate(e.target.value);
    } else if (e.target.id === 'input_isShow') {
      setInputIsShow(e.target.value);
    } else if (e.target.id === 'input_number') {
      setInputNumber(e.target.value);
      const tmp = inputDate;
      const formatted = tmp.replace(/-/g, '') + e.target.value;
      setInputID(formatted);
      setInputImgDir('works/' + formatted);
    } else if (e.target.id === 'input_thumbnail') {
      console.log(e.target.name);
      console.log(e.target.value);
      const tmp = [...thumbnailImg];
      const tmpUpdate = Array(tmp.length).fill(false);
      tmpUpdate[e.target.name] = true;
      setThumbnailImg(tmpUpdate);
      //change file name
      const tmpFileNames = [...inputFileNames];
      tmpUpdate.map((_tmp, index) => {
        if (_tmp === true) {
          //add thumbnail
          //***_thumbnail.jpegに変更 */
          const dotIndex = tmpFileNames[index].lastIndexOf('.');
          const base = tmpFileNames[index].substring(0, dotIndex);
          const extension = tmpFileNames[index].substring(dotIndex);
          const newFileName = `${base}_thumbnail${extension}`;
          tmpFileNames[index] = newFileName;
        } else {
          // if _thumbnail is exists, remove it.
          if (tmpFileNames[index].includes('_thumbnail')) {
            const newFileName = tmpFileNames[index].replace('_thumbnail', '');
            tmpFileNames[index] = newFileName;
          }
        }
        console.log('name: ' + tmpFileNames[index]);
      });
      setInputFileNames(tmpFileNames);
    } else if (e.target.id === 'input_embedCode') {
      setTmpEmbed(e.target.value);
    }
  };

  return (
    <>
      {/* 
      <div
        style={{
          borderStyle: 'Solid',
          borderColor: 'white',
          borderWidth: '1px',
          margin: '5px',
        }}
      >
        <button
          style={{ width: '400px', borderRadius: '20px' }}
          onClick={handleUpload_input}
        >
          Upload
        </button>
        <button
          style={{ width: '400px', borderRadius: '20px' }}
          onClick={handleUploadImg}
        >
          Upload img
        </button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .gif .webp"
          onChange={handleSelectImg}
          multiple
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>ID: {inputID}</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>image file: </p>
          {inputFileNames.length > 0 ? (
            inputFileNames.map((inputFileName, index) => {
              return (
                <>
                  <label style={{ color: 'white' }}>
                    <input
                      id="input_thumbnail"
                      type="radio"
                      value={index === 0 ? true : false}
                      name={index}
                      checked={thumbnailImg[index] === true}
                      onChange={handleOnChangeInput}
                    />
                    {inputFileName}
                  </label>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>Title:</p>
          <input
            id="input_title"
            type="text"
            onChange={handleOnChangeInput}
            style={{ width: '500px' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>Category: </p>
          <label style={{ color: 'white', marginRight: '10px' }}>
            <input
              id="input_category"
              type="radio"
              value={true}
              name="Produce"
              checked={inputCategory === 'Produce'}
              onChange={handleOnChangeInput}
            />
            Produce
          </label>
          <label style={{ color: 'white' }}>
            <input
              id="input_category"
              type="radio"
              value={false}
              name="Performance"
              checked={inputCategory === 'Performance'}
              onChange={handleOnChangeInput}
            />
            Performance
          </label>
          <label style={{ color: 'white' }}>
            <input
              id="input_category"
              type="radio"
              value={false}
              name="Exhibition"
              checked={inputCategory === 'Exhibition'}
              onChange={handleOnChangeInput}
            />
            Exhibition
          </label>
          <label style={{ color: 'white' }}>
            <input
              id="input_category"
              type="radio"
              value={false}
              name="TalkShow"
              checked={inputCategory === 'TalkShow'}
              onChange={handleOnChangeInput}
            />
            Talk show
          </label>
          <label style={{ color: 'white' }}>
            <input
              id="input_category"
              type="radio"
              value={false}
              name="Others"
              checked={inputCategory === 'Others'}
              onChange={handleOnChangeInput}
            />
            Others
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>Number:</p>
          <input
            id="input_number"
            type="text"
            defaultValue={inputNumber}
            onChange={handleOnChangeInput}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>Date: </p>
          <input id="input_date" type="date" onChange={handleOnChangeInput} />
          <p style={{ margin: '0 10px' }}>Update: </p>
          <input id="input_upDate" type="date" onChange={handleOnChangeInput} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>isShow: </p>
          <label style={{ color: 'white', marginRight: '10px' }}>
            <input
              id="input_isShow"
              type="radio"
              value={true}
              name="isShow"
              checked={inputIsShow === 'true'}
              onChange={handleOnChangeInput}
            />
            TRUE
          </label>
          <label style={{ color: 'white' }}>
            <input
              id="input_isShow"
              type="radio"
              value={false}
              name="isShow"
              checked={inputIsShow === 'false'}
              onChange={handleOnChangeInput}
            />
            FALSE
          </label>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>embedCodes: </p>
          <input
            id="input_embedCode"
            type="text"
            style={{ width: '500px' }}
            onChange={handleOnChangeInput}
          />
          <button
            style={{ width: '100px', borderRadius: '20px' }}
            onClick={handleSetEmbedCode}
          >
            Set
          </button>
          <button
            style={{ width: '100px', borderRadius: '20px' }}
            onClick={handleSelectEmbedCode}
          >
            Select
          </button>
          <button
            style={{ width: '100px', borderRadius: '20px' }}
            onClick={handleDeleteEmbedCode}
          >
            Delete
          </button>
          <p>select code is {selectEmbedCode}</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 10px' }}>embed codes: </p>
          {inputVideoEmbedCodes.length > 0 ? (
            inputVideoEmbedCodes.map((inputVideoEmbedCode, index) => {
              return (
                <>
                  {index === selectEmbedCode ? (
                    <label
                      style={{
                        color: embedCodeTextColors[1],
                        margin: '0 10px',
                      }}
                    >
                      {inputVideoEmbedCode}
                    </label>
                  ) : (
                    <label
                      style={{
                        color: embedCodeTextColors[0],
                        margin: '0 10px',
                      }}
                    >
                      {inputVideoEmbedCode}
                    </label>
                  )}
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div>
          <p style={{ margin: '0 10px' }}>Description: </p>
          <Editor_description
            pageName={'description'}
            setDescription={handleValueChange_description}
            setCredit={handleValueChange_credit}
          />
        </div>
        <div>
          <p style={{ margin: '0 10px' }}>Credit: </p>
          <Editor_credit
            pageName={'credit'}
            setDescription={handleValueChange_description}
            setCredit={handleValueChange_credit}
          />
        </div>
      </div>
      */}
      {isLoad === true ? (
        <>
          <Container
            fluid
            style={{ width: '100%', padding: '0px', margin: '0px' }}
          >
            {contents.reduce((acc, _, index) => {
              if (index % 3 === 0) {
                const itemsInRow = [];
                for (let i = 0; i < 3; ++i) {
                  const contextIndex = index + i;
                  if (contextIndex < contents.length) {
                    let thumbnailNum = 0;
                    contents[contextIndex].fileNames.forEach((file, index) => {
                      if (file.includes('_thumbnail')) {
                        thumbnailNum = index;
                      }
                    });
                    itemsInRow.push(
                      <WorksItems
                        key={contextIndex}
                        key_0={contextIndex}
                        link_0={`./works/${contents[contextIndex].id}/`}
                        imageURL_0={
                          contents[contextIndex].imgURLs[thumbnailNum]
                        }
                        alt_0={contents[contextIndex].imgDir}
                        title_0={contents[contextIndex].title}
                      />,
                    );
                  }
                }
                if (itemsInRow.length > 0) {
                  acc.push(<Row key={index}>{itemsInRow}</Row>);
                }
              }
              return acc;
            }, [])}
          </Container>
        </>
      ) : (
        <>
          <p>Loading.....</p>
        </>
      )}
    </>
  );
}

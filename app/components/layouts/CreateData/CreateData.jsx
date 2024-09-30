import { useState } from 'react';
import styles from './createData.module.css';

const Creation = (props) => {
  const [inputID, setInputID] = useState('0000');
  const [inputNumber, setInputNumber] = useState('00');
  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputUpdate, setInputUpdate] = useState('');
  const [inputContent, setInputContent] = useState([]);
  const [inputIsShow, setInputIsShow] = useState('true');
  const [thumbnailImg, setThumbnailImg] = useState([]);
  const [inputFileNames, setInputFileNames] = useState([]);
  const [inputImgURLs, setInputImgURLs] = useState([]);
  const [inputVideoURLs, setInputVideoURLs] = useState([]);
  const [inputDirectory, setInputDirectory] = useState('');

  //upload image ボタン
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
            //setPreviewImg((prev) => [...prev, reader.result]);
            setThumbnailImg((prev) => [...prev, 'false']);
          }
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });
  };

  //inputが変更された時の処理はここ
  const handleOnChangeInput = (e) => {
    if (e.target.id === 'input_date') {
    } else if (e.target.id === 'input_update') {
      setInputUpdate(e.target.value);
    } else if (e.target.id === 'input_isShow') {
      const value = JSON.parse(e.target.value);
      setInputIsShow(value);
    } else if (e.target.id === 'input_category') {
      setInputCategory(e.target.value);
    }
  };

  const handleOnChangeTitle = (e) => {
    setInputTitle(e.target.value);
  };

  //Date変更時
  const handleOnChangeDate = (e) => {
    setInputDate(e.target.value);
  };

  //update変更時
  const handleOnChangeUpDate = (e) => {
    setInputUpDate(e.target.value);
  };

  //number変更時
  const handleOnChangeNumber = (e) => {
    setInputNumber(e.target.value);
    const tmpID = inputDate + '-' + e.target.value;
    setInputID(tmpID);
  };

  //サムネイル選択用のラジオボタン
  const handleOnChangeThumbnail = (e) => {
    console.log('click thumbnail');
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
  };

  const handleOnChangeVideoURL = (e) => {
    console.log('change video url');
  };

  return (
    <>
      <div className={styles.main}>
        <button className={styles.btn}>Upload</button>
        <button className={styles.btn}>Upload images</button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .gif .webp"
          onChange={handleSelectImg}
          multiple
        />

        <div className={styles.part}>
          <p>ID: {inputID}</p>
        </div>

        <div className={styles.part}>
          <p>image file: </p>
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
                      onChange={handleOnChangeThumbnail}
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

        <div className={styles.part}>
          <p>Title:</p>
          <input
            id="inputTitle"
            type="text"
            onChange={handleOnChangeTitle}
            style={{ width: '500px' }}
          />
        </div>
        <div className={styles.part}>
          <p>Video URL:</p>
          <input
            id="inputVideoURL"
            type="text"
            onChange={handleOnChangeVideoURL}
            style={{ width: '500px' }}
          />
        </div>
        <div className={styles.part}>
          <p>Number:</p>
          <input
            id="inputTitle"
            type="text"
            value={inputNumber}
            onChange={handleOnChangeNumber}
            style={{ width: '100px' }}
          />
          <p>Date:</p>
          <input id="input_date" type="date" onChange={handleOnChangeDate} />
          <p>Update:</p>
          <input
            id="input_update"
            type="date"
            onChange={handleOnChangeUpDate}
          />
        </div>
        <div className={styles.part}>
          <p>isShow:</p>
          <label
            style={{
              color: inputIsShow ? 'cyan' : 'white',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            <input
              id="input_isShow"
              type="radio"
              value={true}
              name="isShow"
              checked={inputIsShow === true}
              onChange={handleOnChangeInput}
            />
            TRUE
          </label>
          <label
            style={{
              color: inputIsShow ? 'white' : 'cyan',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
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
        <div className={styles.part}>
          <p>Category:</p>
          <label
            style={{
              color: inputCategory === 'Merchandise' ? 'cyan' : 'white',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            <input
              id="input_category"
              type="radio"
              value={'Merchandise'}
              name="inputCategory"
              checked={inputCategory === 'Merchandise'}
              onChange={handleOnChangeInput}
            />
            Merchandise
          </label>
          <label
            style={{
              color: inputCategory === 'System' ? 'cyan' : 'white',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            <input
              id="input_category"
              type="radio"
              value={'System'}
              name="inputCategory"
              checked={inputCategory === 'System'}
              onChange={handleOnChangeInput}
            />
            System
          </label>
          <label
            style={{
              color: inputCategory === 'Performance' ? 'cyan' : 'white',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            <input
              id="input_category"
              type="radio"
              value={'Performance'}
              name="inputCategory"
              checked={inputCategory === 'Performance'}
              onChange={handleOnChangeInput}
            />
            Performance
          </label>
        </div>
      </div>
    </>
  );
};

export default Creation;

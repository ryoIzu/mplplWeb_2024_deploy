import React, { useState, useEffect, useMemo } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
  RichUtils,
  AtomicBlockUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './editor.css';

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from '@draft-js-plugins/buttons';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createImagePlugin from '@draft-js-plugins/image';
import createVideoPlugin from '@draft-js-plugins/video';

import '@draft-js-plugins/anchor/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';

import {
  db,
  storage,
  getDownloadURL,
  ref,
} from '../../../store/firebaseConfig';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

const MyEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [readOnly, setReadOnly] = useState(false);

  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin();
    const imagePlugin = createImagePlugin();
    const videoPlugin = createVideoPlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [
      [inlineToolbarPlugin, linkPlugin, imagePlugin, videoPlugin],
      inlineToolbarPlugin.InlineToolbar,
      linkPlugin.LinkButton,
    ];
  }, []);

  useEffect(() => {
    // コンポーネントのマウント時に EditorState を再初期化
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText('')),
    );
    props.handleTest;
  }, []);

  const onChange = (newState) => {
    setEditorState(newState);
    const contentState = newState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (props.pageName === 'credit') {
      props.setCredit(raw);
    } else if (props.pageName === 'description') {
      props.setDescription(raw);
    }
  };

  const handleGet = () => {
    const _contentState = convertToRaw(JSON.parse(props.defaultText));
    console.log(EditorState.createWithContent(_contentState));
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
    console.log(props.pageName);
    if (props.pageName === 'news') {
      handleUpload(raw);
    }
  };

  const handleNew = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
    console.log(props.pageName);
    if (props.pageName === 'news') {
      handleCreate(raw);
    }
  };
  const tmpDays = [
    '1000',
    '1001',
    '1002',
    '1003',
    '1004',
    '1005',
    '1006',
    '1007',
    '1008',
    '1009',
    '1010',
    '1011',
    '1012',
    '1013',
    '1014',
    '1015',
    '1016',
    '1017',
    '1018',
    '1019',
    '1020',
    '1021',
    '1022',
    '1023',
    '1024',
    '1025',
    '1026',
    '1027',
    '1028',
    '1029',
  ];
  const handleCreate = async (item) => {
    tmpDays.map(async (tmpDay) => {
      try {
        const promise = async () => {
          const _date = '2024' + tmpDay;
          const _update = '2024' + tmpDay;
          const _title =
            'SusHi Tech Tokyo 2024で披露のテクノロジーとダンスが融合した『光のパフォーマンス』ダイジェスト映像を公開';
          const docID = _date;
          const docRef = doc(db, 'news', docID);
          const _isShow = true;
          const data = {
            title: _title,
            date: _date,
            update: _update,
            description: item,
            isShow: _isShow,
          };
          await setDoc(docRef, data);
        };
        await promise(); //wait for finishing setDoc
        //alert('created');
      } catch (e) {
        console.error('ERROR', e);
      }
    });
  };

  const handleUpload = async (item) => {
    try {
      const promise = async () => {
        const docID = String(props.id);
        const docRef = doc(db, 'news', docID);
        const data = {
          description: item,
        };
        await updateDoc(docRef, data);
      };
      await promise(); //wait for finishing setDoc
      alert('saved');
    } catch (e) {
      console.error('ERROR', e);
    }
  };

  //文字のボールド
  const handleToggleBold = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  //アンダーライン
  const handleToggleUnderLine = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };
  //取消線
  const handleToggleStrikethrough = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };
  //pタグ
  const handleToggleP = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'paragraph'));
  };
  //h1タグの追加
  const handleToggleH1 = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };
  //h2
  const handleToggleH2 = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-two'));
  };

  //centre-align
  const handleCenterAlign = (event) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'center'));
  };

  const handleDroppedImg = (selection, files) => {
    console.log(files);
    //サーバに保存する処理を書いて、帰ってきたURLをinsertImageに渡す。

    //URLはサーバのURLを書く
    insertImage(
      'https://firebasestorage.googleapis.com/v0/b/mplplwebsite.appspot.com/o/projects%2F00000%2F01.png?alt=media&token=80e4ddd9-3c8a-464c-9c2b-849aa9adf66f',
    );
  };

  const insertImage = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: url },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    onChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    );
  };

  const myBlockStyleFunction = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'center') {
      return 'align-center';
    }
  };

  return editorState ? (
    <>
      <div>
        {readOnly ? (
          <button onClick={() => setReadOnly(false)}>Edit</button>
        ) : (
          <button onClick={() => setReadOnly(true)}>ReadOnly</button>
        )}
        <button onClick={handleGet}>get</button>
        <button onClick={handleSave}>save</button>
        <button onClick={handleNew}>create</button>
        <button onClick={handleToggleBold}>bold</button>
        <button onClick={handleToggleUnderLine}>underline</button>
        <button onClick={handleToggleStrikethrough}>strikethrough</button>
        <button onClick={handleToggleH1}>h1</button>
        <button onClick={handleCenterAlign}>centre</button>
      </div>
      <div style={{ backgroundColor: 'white', color: 'grey' }}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder={props.description}
          plugins={plugins}
          readOnly={readOnly}
          handleDroppedFiles={handleDroppedImg}
          blockStyleFn={myBlockStyleFunction}
        />
        <InlineToolbar>
          {(externalProps) => (
            <>
              <ItalicButton {...externalProps} />
              <BoldButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <LinkButton {...externalProps} />
            </>
          )}
        </InlineToolbar>
      </div>
    </>
  ) : null;
};

export default MyEditor;

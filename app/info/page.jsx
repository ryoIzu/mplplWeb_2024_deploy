"use client";
import { useEffect, useState } from 'react';
import './info.css';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Info() {
  const images = [
    "/info/X1.png",
    "/info/X2.png",
    "/info/X3.png"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        setFadeClass('fade-in');
      }, 1000); // フェードアウトの時間と同じに設定
    }, 4000); // 4000ms = 4秒（3秒の表示 + 1秒のフェードアウト）

    return () => clearInterval(interval);
  }, []);
  return(
    <div style={{backgroundColor: 'black', color: 'white'}}>
    <div className='topImage'>
        <Image 
          key={currentIndex}
          src={images[currentIndex]}
          width={1280}
          height={720}
          alt= {`Image ${currentIndex}`}
          className={`gallery ${fadeClass}`}
          style={{width: '100%', height: 'auto'}}  />

        <p className="text-overlay">
          “Innovating conventions with technology” <br/>
          テクノロジーの力で、常識を更新する
        </p>
      </div>

      <div className='logoArea'>
        <div className='mplplLogo'>
          <img 
              src="https://www.mplpl.com/wp-content/themes/mplpl/images/top/img_01.png"
              style={{width: '150px', height: 'auto'}}
          />
        </div>
        <div className='intro'>
        <Image 
          src= "/info/InfoText_1500x342.png"
          width= {1500}
          height={342}
          alt= {'infoText'}
          style={{width: 'auto', height: '215px', padding: '33.5px'}}  />
        </div>
      </div>
      <Container>
        <Row>
          <Col xs lg="2">Company Name</Col>
          <Col xs lg="6">MPLUSPLUS Co., Ltd.</Col>
          <Col xs lg="2">Managemesnt</Col>
          <Col xs lg="4s">
            CEO Minoru Fujimoto <br />
            CFO Makiko Nakata <br />
            CTO Yutaka Yanagisawa
          </Col>
        </Row>

        <Row>
          <Col xs lg="2">Address</Col>
          <Col xs lg="6">Shinagawa-ku, Tokyo,<br/>Japan (Closed Information)</Col>
          <Col xs lg="2">Established</Col>
          <Col xs lg="4s">August, 2013</Col>
        </Row>

        <Row>
          <Col xs lg="2">Fields of Business</Col>
          <Col xs lg="6">
            Stage Direction, Hardware Development,<br/>
            Software Development, Interactive Design,<br/>
            Choreograph, Costume Design
          </Col>
          <Col xs lg="2">Capital</Col>
          <Col xs lg="4s">8 million yen</Col>
        </Row>

        <Row>
          <Col xs lg="2">Contact</Col>
          <Col xs lg="6"><a href=''>Job request</a></Col>
          <Col xs lg="2"><a href=''>Other inquiries</a></Col>
          <Col xs lg="4s"></Col>
        </Row>

        <Row>
          <Col xs lg="2">社名</Col>
          <Col xs lg="6">MPLUSPLUS株式会社（エムプラスプラス株式会社）</Col>
          <Col xs lg="2">役員</Col>
          <Col xs lg="4s">
            代表取締役社長兼CEO 藤本 実<br/>
            取締役CFO 中田眞城子
            CTO 柳沢 豊
          </Col>
        </Row>

        <Row>
          <Col xs lg="2">本社所在地</Col>
          <Col xs lg="6">東京都品川区</Col>
          <Col xs lg="5"></Col>
          <Col xs lg="4s"></Col>
        </Row>

        <Row>
          <Col xs lg="2">業務内容</Col>
          <Col xs lg="6">
            -情報機器の企画開発、設計、製造、販売及びレンタル業務<br/>
            -空間デザインの企画、設計、製作、<br/>
             施工及びその監理並びにコンサルティング業務<br/>
            -イベント、興行、講演会のプロヂュース並びに<br/>
             それらのコンサルティング業務
          </Col>
          <Col xs lg="2">設立年月日</Col>
          <Col xs lg="4s">2013年8月</Col>
        </Row>

        <Row>
          <Col xs lg="2"></Col>
          <Col xs lg="6"></Col>
          <Col xs lg="2">資本金</Col>
          <Col xs lg="4s">8,000,000円</Col>
        </Row>

        <Row>
          <Col xs lg="2">問い合わせ</Col>
          <Col xs lg="6"><a href=''>仕事及び取材のお問い合わせ</a></Col>
          <Col xs lg="2"><a href=''>その他のお問い合わせ</a></Col>
          <Col xs lg="4s"></Col>
        </Row>

        <Row>
          <Col xs lg="2">関連会社</Col>
          <Col xs lg="6">
            MPLUSPLUS STAGE株式会社（エムプラスプラス ステージ株式会社）<br/>
            代表取締役社長兼CEO 白須 祐次<br/>
            東京都品川区
          </Col>
          <Col xs lg="2"></Col>
          <Col xs lg="4s"><a>M++STUDIO</a></Col>
        </Row>
        
        <Row>
          <Col xs lg="5"><a href='https://www.dropbox.com/scl/fi/edeq8gwkzgfw54i4cn3sk/.pdf?rlkey=un3ltb26fcqe26rokqq71r3pq&e=1&dl=0'>コンプライアンス行動規範について</a></Col>
          <Col xs lg="6"></Col>
          <Col xs lg="2"></Col>
          
        </Row>

        <Row>
          <Col xs lg="5"><a href='https://www.mplpl.com/lab/'>研究費の不正使用に係る通報窓口について</a></Col>
          <Col xs lg="6"></Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
      </div>
  );
}
import React from 'react';
import './Styles/FeatureHome.css';
import "./ViewEntity";
import EntityGrid from './Components/EntityGrid';
import Footer from './Components/Footer';
import ChatbotButton from './Components/ChatbotButton';

import MyFeatures from './MyFeatures';

const FeatureHome = () => {
  console.log("Rendering FeatureHome component");
  return (
    <>
      <div className="landing-page">
        <EntityGrid></EntityGrid>
          <div className="table-container">
            <MyFeatures></MyFeatures>  
          </div>
      </div>
      <br></br>
      <ChatbotButton />
      <Footer></Footer>
    </>
  );
};

export default FeatureHome;

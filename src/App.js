import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectButton, Modal } from "web3uikit";
import logo from "./images/Moralis.png";
import Coin from "./components/Coin"; 



const App = () => {
  const [BTC, setBTC] = useState(30);
  const [visible, setVisible] = useState(false); 
  const [modalToken, setModalToken] = useState();

  return (
    <>
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" height="50px"/>
          Sentiment
      </div>
      <ConnectButton/>
    </div>
    <div className="instructions">
      Who do you think will win Wimbledon?
    </div>
    <div className="list">
      <Coin perc={BTC} setPerc={setBTC} token="BTC"/>
    </div>

    <Modal isVisible={visible} onCloseButtonPressed={() => setVisible(false)} hasFooter={false} title={modalToken}>

    </Modal>
    </>
  );
};

export default App;

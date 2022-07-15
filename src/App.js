import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectButton, Modal } from "web3uikit";
import logo from "./images/logo.png";
import Coin from "./components/Coin"; 
import {abouts} from "./about";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import apecoin from "./images/apecoin.png";
import dogecoin from "./images/dogecoin.png";
import shibainucoin from "./images/shibainucoin.png";


const App = () => {
  const [DOGE, setDOGE] = useState(20);
  const [SHIB, setSHIB] = useState(47);
  const [APE, setAPE] = useState(78);
  const [modalPrice, setModalPrice] = useState(); 
  const web3Api = useMoralisWeb3Api();
  const {Moralis, isInitialised} = useMoralis();
  const [visible, setVisible] = useState(false); 
  const [modalToken, setModalToken] = useState();

  async function getRatio(tick, setPerc) {
    const Votes = Moralis.Object.extend("Votes");
    const query = new Moralis.Query(Votes);
    query.equalTo("ticker", tick); 
    const results = await query.first();
    let up = Number(results.attributes.up);
    let down = Number(results.attributes.down);
    let ratio = Math.round(up/(up+down)*100);
    setPerc(ratio);
  }

  useEffect(() => {
    if(isInitialised) {
      getRatio("DOGE", setDOGE);
      getRatio("SHIB", setSHIB);
      getRatio("APE", setAPE);

      async function createLiveQuery() {
        let query = new Moralis.Query("Votes");
        let subscription = await query.subscribe();
        // get updated data from moralis database when it's updated for each coin
        subscription.on("updatee", (object) => {
          if (object.attributes.ticker === "APE") {
            getRatio("APE", setAPE);
          } else if (object.attributes.ticker === "SHIB") {
            getRatio("SHIB", setSHIB); 
          } else if (object.attributes.ticker === "DOGE") {
            getRatio("DOGE", setDOGE);
          }
        })
      }
      createLiveQuery();
    }
  }, [isInitialised])

  // gets current crypto price from the moralis api
  useEffect(() => {
    async function getTokenPrice() {
      const options = {
        address: 
          abouts[abouts.findIndex((x) => x.token === modalToken)].address, 
      }; 
      const price = await web3Api.token.getTokenPrice(options);
      //set to USD
      setModalPrice(price.usdPrice.toFixed(2));
    }

    if(modalToken) {
      getTokenPrice()
    }
  }, [modalToken])

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
      ARE YOU BULLISH??????
    </div>
    <div className="list">
      <Coin perc={APE} setPerc={setAPE} token="APE" setModalToken={setModalToken} setVisible={setVisible} coinLogo={apecoin}/>
      <Coin perc={DOGE} setPerc={setDOGE} token="DOGE" setModalToken={setModalToken} setVisible={setVisible} coinLogo={dogecoin}/>
      <Coin perc={SHIB} setPerc={setSHIB} token="SHIB" setModalToken={setModalToken} setVisible={setVisible} coinLogo={shibainucoin}/>
    </div>
    <Modal isVisible={visible} onCloseButtonPressed={() => setVisible(false)} hasFooter={false} title={modalToken}>

      <div>
        <span style={{ color: "black"}}>{`Price: `}</span>
        {modalPrice}$
      </div>

      <div>
        <span style={{color:"black"}}>
          {`About`}
        </span>
      </div>
      {/* this isn't working properly -- showing DOGE for all*/}
      {modalToken && 
        abouts[abouts.findIndex((x) => modalToken)].about}
    </Modal>
    </>
  );
};

export default App;

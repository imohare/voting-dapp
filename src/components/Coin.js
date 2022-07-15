import React, { useEffect, useState } from "react";
import "./Coin.css";
import {Button} from "web3uikit";
import {useWeb3ExecuteFunction, useMoralis} from "react-moralis";

function Coin({perc, setPerc, token, setModalToken, setVisible, coinLogo}) {

  const [color, setColor] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const {isAuthenticated} = useMoralis();  
  
  // set the percentage color to change at 50%
  useEffect(() => {
    if (perc<50) {
      setColor("#c43d08");
    } else {
      setColor("green");
    }
  }, [perc])
  ;

  async function vote(upOrDown){
    // taken from polygonscan
    let options = {
      contractAddress: "0xcdb86f65c45c157Ebf6BCF21f25cbeB740741F96",
      functionName: "vote",
      abi: [{
        "inputs":[
          {
            "internalType":"string","name":"_ticker","type":"string"
          },
          {
            "internalType":"bool","name":"_vote","type":"bool"
          }
        ],
        "name":"vote",
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
      }
    ],
      params: {
        _ticker: token, 
        _vote: upOrDown
      },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("you just voted");
      }, 
      onError: (error) => {
        alert(error.data.message)
      }
    });
  }

  
  return (
    <>
    <div>
      <div className="token">
        {token}
      </div>
      <div className="circle" style={{ 
        boxShadow:`0 0 20px ${color}`,
        backgroundImage:`url(${coinLogo})`,
        backgroundSize: "100px"}}>
        <div className="wave" style={{marginTop: `${100 - perc}%`, boxShadow:`0 0 20px ${color}`, backgroundColor: color, }}>
        </div>
        <div className="percentage">
          {perc}
        </div>
      </div>
      <div className="votes">
        {/* check if the user is authenticated and then call vote function*/}
        <Button color="blue" onClick={() => {
          (isAuthenticated ? vote(true) : alert("You need to be authenticated to vote"))}} size="large" text="🚀" theme="colored" type="button" />
        <Button color="red" onClick={() => {
          (isAuthenticated ? vote(false) : alert("You need to be authenticated to vote"))}} size="large"
          text="💩" theme="colored" type="button"/>
      </div>
      <div className="votes">
        <Button onClick={() => { setModalToken(token); setVisible(true);}} text="INFO" theme="translucent" type="button"/>
      </div>

    </div>
      
    </>
  );
}

export default Coin;
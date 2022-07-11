import React, { useEffect, useState } from "react";
import "./Coin.css";
import {Button} from "web3uikit";


function Coin({perc, setPerc, token}) {

// set the percentage color to change at 50%
 const [color, setColor] = useState();
 useEffect(() => {
  if (perc<50) {
    setColor("#c43d08");
  } else {
    setColor("green");
  }
 }, [perc])
;

  return (
    <>
    <div>
      <div className="token">
        {token}
      </div>
      <div className="circle" style={{ boxShadow:`0 0 20px ${color}`}} >
        <div className="wave" style={{marginTop: `${100 - perc}%`, boxShadow:`0 0 20px ${color}`, backgroundColor: color, }}>
        </div>
        <div className="percentage">
          {perc}
        </div>
      </div>
      <div className="votes">
        <Button onClick={() => {setPerc(perc+1)}} text="Win" theme="primary" type="button"/>
        <Button color="red" onClick={() => {setPerc(perc-1)}} text="Lose" theme="colored" type="button"/>
      </div>
    </div>
      
    </>
  );
}

export default Coin;

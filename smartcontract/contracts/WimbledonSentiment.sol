// SPX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract wimbledonsentiment {
  address public owner; 
  string[] public tickersArray;

/// deployer becomes owner
constructor() {
  owner = msg.sender;
}

/// only one chance to vote 
struct ticker {
  bool exists;
  uint256 up; 
  uint256 down; 
  mapping(address => bool) Voters; 
};

/// for moralis to listen to the smartcontract
event tickerupdated {
  uint256 up, 
  uint256 down, 
  address voter,
  string ticker
};

/// takes string and maps it to ticker struct
mapping(string => ticker) private Tickers;

/// add tickers only callable by owner of contract
function addTicker(string memoru _ticker) public {
  require(msg.sender == owner, "Only owner can create ticker");
  ticker storage newTicker = Ticker(_ticker);
  newTicker.exists = true; 
  tickersArray.push(_ticker);
}

}
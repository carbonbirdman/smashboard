//not supported on free apis
const Web3 = require("web3");
const web3 = new Web3(
  "https://apis.ankr.com/300a0d7f15fc4a01b79ff1bd778088d7/45614406b1e8e84a919cc03be771db24/fantom/full/main"
);

const CONTRACT_ADDRESS = "0xC6F22Bd725FD986FcacD7bFeaf94fDAE2D1E3Bc4";
const CONTRACT_ABI = require("../src/token.json");
const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let options = {
  filter: {
    value: []
  },
  fromBlock: 0
};

myContract.events
  .Transfer(options)
  .on("data", (event) => console.log(event))
  .on("changed", (changed) => console.log(changed))
  .on("error", (err) => console.log(err))
  .on("connected", (str) => console.log(str));

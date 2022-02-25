const Web3 = require("web3");
const web3 = new Web3(
  "https://apis.ankr.com/300a0d7f15fc4a01b79ff1bd778088d7/45614406b1e8e84a919cc03be771db24/fantom/full/main"
);

const CONTRACT_ADDRESS = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
const CONTRACT_ABI = require("../src/token.json");
const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

web3.eth.getBlockNumber().then((blocknum) => {
  console.log(blocknum);

  let options = {
    //  filter: {
    //      value: ['1000', '1337']
    //  },    //Only get events where transfer value was 1000 or 1337
    fromBlock: blocknum - 100,
    address: ["0xb8a78253fc10dac192027c197759da3446357e74"], //Only get events from specific addresses
    toBlock: "latest"
  };

  myContract
    .getPastEvents("Transfer", options)
    .then((results) => console.log(results))
    .catch((err) => console.log(err));
});

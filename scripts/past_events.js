const Web3 = require("web3");
const web3 = new Web3(
  "https://apis.ankr.com/300a0d7f15fc4a01b79ff1bd778088d7/45614406b1e8e84a919cc03be771db24/fantom/full/main"
);

const CONTRACT_ADDRESS = "0xe120ffBDA0d14f3Bb6d6053E90E63c572A66a428";
const CONTRACT_ABI = require("../src/pairs.json");
const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const threshold = 10 * 10 ** 18;

web3.eth.getBlockNumber().then((blocknum) => {
  console.log(blocknum);

  let options = {
    //  filter: {
    //      value: ['1000', '1337']
    //  },    //Only get events where transfer value was 1000 or 1337
    fromBlock: blocknum - 1000,
    //address: ["0xb8a78253fc10dac192027c197759da3446357e74"], //Only get events from specific addresses
    toBlock: "latest"
  };

  myContract
    .getPastEvents("Swap", options)
    .then((results) => {
      console.log(results);
      //const criteria = (d) => d.logIndex > 20 && d.event === "Transfer";
      //const criteria = (d) => d.amount0In > threshold;
      //const arr3 = results.filter(criteria);
      //console.log(arr3);
      console.log(results);
    })
    .catch((err) => console.log(err));
});

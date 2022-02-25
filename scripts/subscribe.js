const Web3 = require("web3");
const web3 = new Web3(
  "https://apis.ankr.com/300a0d7f15fc4a01b79ff1bd778088d7/45614406b1e8e84a919cc03be771db24/fantom/full/main"
);

let options = {
  fromBlock: 31905433,
  address: ["0xb635b6804803c17530b2725ef8e5a4a76cf37e79"], //Only get events from specific addresses
  topics: [] //What topics to subscribe to
};

let subscription = web3.eth.subscribe("logs", options, (err, event) => {
  if (!err) console.log(event);
});

subscription.on("data", (event) => console.log(event));
subscription.on("changed", (changed) => console.log(changed));
subscription.on("error", (err) => {
  throw err;
});
subscription.on("connected", (nr) => console.log(nr));

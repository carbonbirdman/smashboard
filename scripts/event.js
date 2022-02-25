// monitor for events
const Web3 = require("web3");
var ftm_main_url = "https://rpc.ftm.tools/";
const web3 = new Web3(ftm_main_url);

//ENTER SMART CONTRACT ADDRESS BELOW. see abi.js if you want to modify the abi
const CONTRACT_ADDRESS = "0xC6F22Bd725FD986FcacD7bFeaf94fDAE2D1E3Bc4";
const CONTRACT_ABI = require("../src/token.json");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

async function getEvents() {
  let latest_block = await web3.eth.getBlockNumber();
  let historical_block = latest_block - 100; // you can also change the value to 'latest' if you have a upgraded rpc
  console.log("latest: ", latest_block, "historical block: ", historical_block);
  const events = await contract.getPastEvents(
    "Transfer", // change if your looking for a different event
    { fromBlock: historical_block, toBlock: "latest" }
  );
  await getTransferDetails(events);
}

var i = 0;
async function getTransferDetails(data_events) {
  for (i = 0; i < data_events.length; i++) {
    let from = data_events[i]["returnValues"]["from"];
    let to = data_events[i]["returnValues"]["to"];
    let amount = data_events[i]["returnValues"]["amount"];
    let converted_amount = web3.utils.fromWei(amount);
    if (converted_amount > 32) {
      //checking for transcations with above 32 eth as an example
      console.log("From:", from, "- To:", to, "- Value:", converted_amount);
    }
  }
}

getEvents(CONTRACT_ABI, CONTRACT_ADDRESS);

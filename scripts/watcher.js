const ethers = require("ethers");

const addresses = {
  factory: "0x991152411A7B5A14A8CF0cDDE8439435328070dF"
};

var rpc_url = "https://rpc.ftm.tools/";
const provider = new ethers.providers.JsonRpcProvider(rpc_url);
//console.log(provider);
//const wallet = ethers.Wallet.fromMnemonic(mnemonic);
//const account = wallet.connect(provider);
//const factory = new ethers.Contract(
// addresses.factory,
// [
//   "event PairCreated(address indexed token0, address indexed token1, address pair, uint)"
// ],
// provider
//);

const factoryABI = require("../src/factory.json");
const conn = new ethers.providers.JsonRpcProvider(rpc_url);
const factory = new ethers.Contract(addresses.factory, factoryABI, conn);
//console.log(factory);

factory.on("PairCreated", async (token0, token1, pairAddress) => {
  console.log(`
    New pair detected
    =================
    token0: ${token0}
    token1: ${token1}
    pairAddress: ${pairAddress}
  `);
});

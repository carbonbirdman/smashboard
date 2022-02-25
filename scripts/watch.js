console.log("Starting up");
const dx = require("../src/dexes");
var conn = dx.get_connection();
var dex = "spooky";
const factory = dx.factory_address[dex];
const ethers = require("ethers");
const factoryABI = require("../src/factory.json");
const factory_contract = new ethers.Contract(factory, factoryABI, conn);
factory_contract.on("PairCreated", async (token0, token1, pairAddress) => {
  console.log(`
    New pair detected
    =================
    token0: ${token0}
    token1: ${token1}
    pairAddress: ${pairAddress}
  `);
});

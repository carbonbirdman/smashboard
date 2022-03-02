// This script exercises the dex functions
console.log("Starting up");
const dx = require("../src/dexes");
const px = require("../src/price");
const el = require("../src/elements");
const routerABI = require("../src/router.json");
const ethers = require("ethers");
const factoryABI = require("../src/factory.json");
const pairABI = require("../src/pairs.json");
const tokenABI = require("../src/token.json");
var conn = dx.get_connection();

const token0_address = dx.token_address["FTM"];
const token1_address = dx.token_address["LQDR"];
console.log("SPIRIT");

console.log("SPOOKY BID");
// Get bid price from spooky. Because this is async, it's not the number from before.
var dex = "spooky";
var factory = dx.factory_address[dex];
var router = dx.router_address[dex];
var factory_contract = new ethers.Contract(factory, factoryABI, conn);
var pair_address = factory_contract.getPair(token0_address, token1_address);
px.getBidPrice("1", pair_address, factory, router, conn).then((bid_price) => {
  bid_price["dex"] = dex;
  console.log(bid_price);
});

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
//console.log(dx);

var conn = dx.get_connection();
//console.log(conn);
//var test = dx.test_dex();

const token0_address = dx.token_address["FTM"];
const token1_address = dx.token_address["LQDR"];
//const router = dx.router_address[dex];

console.log("SPOOKY");
var dex = "spooky";
var factory = dx.factory_address[dex];
var router = dx.router_address[dex];
const token1_contract = new ethers.Contract(token1_address, tokenABI, conn);
token1_contract
  .decimals()
  .then((token1_decimal) => console.log(token1_decimal));

var factory_contract = new ethers.Contract(factory, factoryABI, conn);
var pair_address = factory_contract.getPair(token0_address, token1_address);
var pair_contract = new ethers.Contract(pair_address, pairABI, conn);
pair_contract.decimals().then((decimals) => console.log(decimals));
console.log("SPOOKY");
console.log("End");

const eth_in = "1";

//get both ask and bid prices
dex = "spooky";
factory = dx.factory_address[dex];
router = dx.router_address[dex];
factory_contract = new ethers.Contract(factory, factoryABI, conn);
pair_address = factory_contract.getPair(token0_address, token1_address);
px.getAskBidPrice(eth_in, pair_address, factory, router, conn).then((price) =>
  console.log(price)
);

console.log("SPIRIT");
// Get the ask price from spirit
var token_in = 1.0;
dex = "spirit";
var spirit_factory = dx.factory_address[dex];
var spirit_router = dx.router_address[dex];
var spirit_factory_contract = new ethers.Contract(
  spirit_factory,
  factoryABI,
  conn
);
var spirit_pair_address = spirit_factory_contract.getPair(
  token0_address,
  token1_address
);
px.getAskPrice(
  eth_in,
  spirit_pair_address,
  spirit_factory,
  spirit_router,
  conn
).then((price) => {
  price["dex"] = "spirit";
  console.log(price);
  token_in = price.token_out;
});

console.log("SPIRIT BID");
px.getBidPrice(
  "1.0",
  spirit_pair_address,
  spirit_factory,
  spirit_router,
  conn
).then((price) => {
  price["dex"] = "spirit";
  console.log(price);
  token_in = price.token_out;
});
console.log("SPIRIT");

console.log("SPOOKY BID");
// Get bid price from spooky. Because this is async, it's not the number from before.
dex = "spooky";
factory = dx.factory_address[dex];
router = dx.router_address[dex];
factory_contract = new ethers.Contract(factory, factoryABI, conn);
pair_address = factory_contract.getPair(token0_address, token1_address);
px.getBidPrice("1", pair_address, factory, router, conn).then((bid_price) => {
  bid_price["dex"] = dex;
  console.log(bid_price);
});

// This script exercises the dex functions
console.log("Starting up");
const dx = require("../src/dexes");
const px = require("../src/price");
const el = require("../src/elements");
const routerABI = require("../src/router.json");
//console.log(dx);

var conn = dx.get_connection();
//console.log(conn);
//var test = dx.test_dex();

var dex = "spooky";
const token0_address = dx.token_address["FTM"];
const token1_address = dx.token_address["WBTC"];
//const router = dx.router_address[dex];
const factory = dx.factory_address[dex];
const router = dx.router_address[dex];

console.log("Getting pair");
const ethers = require("ethers");
const factoryABI = require("./factory.json");
const pairABI = require("./pairs.json");

const factory_contract = new ethers.Contract(factory, factoryABI, conn);
const pair_address = factory_contract.getPair(token0_address, token1_address);
const pair_contract = new ethers.Contract(pair_address, pairABI, conn);
pair_contract.decimals().then((decimals) => console.log(decimals));
console.log("End");

const eth_in = "1";

function get_pair_params(dex) {
  const factory = dx.factory_address[dex];
  const router = dx.router_address[dex];
  const factory_contract = new ethers.Contract(factory, factoryABI, conn);
  const pair_address = factory_contract.getPair(token0_address, token1_address);
  return { factory, router, factory_contract, pair_address };
}

async function get_prices() {
  try {
    var spooky_params = get_pair_params("spooky");
    var ask_price = await px.getAskPrice(
      eth_in,
      spooky_params.pair_address,
      spooky_params.factory,
      spooky_params.router,
      conn
    );
    console.log(
      "1. Ask price",
      ask_price.ask_price_ftm,
      ask_price.eth_in,
      ask_price.token_out
    );
  } catch (err) {
    console.log("Error ");
  }
  try {
    var spirit_params = get_pair_params("spirit");
    var bid_price = await px.getBidPrice(
      ask_price.token_out,
      spirit_params.pair_address,
      spirit_params.factory,
      spirit_params.router,
      conn
    );
    console.log(
      "2. Bid price",
      bid_price.bid_price_ftm,
      bid_price.token_in,
      bid_price.eth_out
    );
  } catch (err) {
    console.log("Error ");
  }
}

//get_prices();
const token0_symbol = "FTM";
const token1_symbol = "WBTC";
var dex_ask = "spooky";
var dex_bid = "spirit";
let swap_request = {
  eth_in,
  dex_ask,
  dex_bid,
  token0_symbol,
  token1_symbol,
  token0_address,
  token1_address,
  conn
};

el.getSwapPrice(swap_request).then((swapout) => console.log(swapout));

//dx.getPair(token0_address, token1_address, factory, conn).then((pair) =>
//  console.log(pair)
//);
//var pair_contract = pair["contract"];
//console.log("Getting price");
//var price = dx.getReservesPrice(token0_address, token1_address, factory, conn);

// This script exercises the dex functions

console.log("Starting up");
const dx = require("./dexes");
const px = require("./price");
const routerABI = require("./router.json");
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

const tokenABI = require("./token.json");
const token1_contract = new ethers.Contract(token1_address, tokenABI, conn);
token1_contract
  .decimals()
  .then((token1_decimal) => console.log(token1_decimal));

const factory_contract = new ethers.Contract(factory, factoryABI, conn);
const pair_address = factory_contract.getPair(token0_address, token1_address);
const pair_contract = new ethers.Contract(pair_address, pairABI, conn);
pair_contract.decimals().then((decimals) => console.log(decimals));
console.log("End");

const eth_in = "1";
const eth_in_wei = ethers.utils.parseUnits(eth_in);
const router_contract = new ethers.Contract(router, routerABI, conn);
// First call: for a given token0 input, find how much token1 we get out
router_contract
  .getAmountsOut(eth_in_wei, [token0_address, token1_address])
  .then((amount_out_token) => {
    console.log(amount_out_token);
    const amount_out0 = ethers.utils.formatEther(amount_out_token[0]);
    const amount_out1 = ethers.utils.formatEther(amount_out_token[1]);
    const amount_out1b = amount_out_token[1].div(Math.pow(10, 8)).toString();
    console.log(amount_out0);
    console.log(amount_out1);
    console.log(amount_out1b);
  });

var price = px.getAskBidPrice(eth_in, pair_address, factory, router, conn);
console.log(price);
//dx.getPair(token0_address, token1_address, factory, conn).then((pair) =>
//  console.log(pair)
//);
//var pair_contract = pair["contract"];
//console.log("Getting price");
//var price = dx.getReservesPrice(token0_address, token1_address, factory, conn);

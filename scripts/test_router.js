console.log("Starting up");
const dx = require("./dexes");
const routerABI = require("./router.json");
var conn = dx.get_connection();

var dex = "spooky";
const token0_address = dx.token_address["FTM"];
const token1_address = dx.token_address["WBTC"];
const router = dx.router_address[dex];

console.log("Getting pair");
const ethers = require("ethers");

const tokenABI = require("./token.json");
const token1_contract = new ethers.Contract(token1_address, tokenABI, conn);
token1_contract
  .decimals()
  .then((token1_decimal) => console.log(token1_decimal));

const eth_in_wei = ethers.utils.parseUnits(eth_in);
const router_contract = new ethers.Contract(router, routerABI, conn);
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

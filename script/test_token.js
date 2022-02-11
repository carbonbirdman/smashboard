const dx = require("../src/dexes");
const el = require("../src/elements");

var conn = dx.get_connection();
var eth_in = "1";
const token0_symbol = "FTM";
const token1_symbol = "ETH";
var dex_ask = "spirit"; //"spooky";
var dex_bid = "spooky"; //"spirit";
var dex_ask = "spooky";
var dex_bid = "spirit";
const token0_address = dx.token_address[token0_symbol];
const token1_address = dx.token_address[token1_symbol];

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

//const swap_price = el.getSwapPrice(swap_requests[1]);
//console.log(swap_price);
//console.log(swap_requests[1]);
//el.getSwapPrice(swap_requests[1]).then((swapout) => console.log(swapout));
let swap_request = {
  eth_in: eth_in,
  dex_ask: "spirit",
  dex_bid: "spooky",
  token0_symbol: "FTM",
  token1_symbol: "ETH",
  token0_address: dx.token_address["FTM"],
  token1_address: dx.token_address["ETH"],
  conn
};
//el.getSwapPrice(swap_request).then((swapout) => console.log(swapout));

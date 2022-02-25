// a test script for the element token list
const dx = require("../src/dexes");
const px = require("../src/price");
const el = require("../src/elements");
var conn = dx.get_connection();
var eth_in = "1";

let swap_requests = [
  {
    eth_in: eth_in,
    dex_ask: "spirit",
    dex_bid: "spooky",
    token0_symbol: "FTM",
    token1_symbol: "WBTC",
    token0_address: dx.token_address["FTM"],
    token1_address: dx.token_address["WBTC"],
    conn
  },
  {
    eth_in: eth_in,
    dex_ask: "spirit",
    dex_bid: "spooky",
    token0_symbol: "FTM",
    token1_symbol: "ETH",
    token0_address: dx.token_address["FTM"],
    token1_address: dx.token_address["ETH"],
    conn
  }
];

function newElement(list, symbol) {
  let new_element = list[1];
  new_element.token1_symbol = symbol;
  new_element.token1_address = dx.token_address[symbol];
  list.push(new_element);
}

//newElement(swap_requests);
console.log(swap_requests.length);

for (const element of ["LQDR", "ETH", "DAI", "SPA", "WBTC"]) {
  newElement(swap_requests, element);
}

console.log(swap_requests.length);

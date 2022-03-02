// Demonstrates how to do price comparison on an array of settings

const dx = require("../src/dexes");
const px = require("../src/price");
const el = require("../src/elements");
const ethers = require("ethers");

var conn = dx.get_connection();
var eth_in = "1";

let pq = {
  eth_in: eth_in,
  dex_ask: "spirit",
  dex_bid: "spooky",
  token0_symbol: "FTM",
  token1_symbol: "LQDR",
  token0_address: dx.token_address["FTM"],
  token1_address: dx.token_address["LQDR"],
  conn
};
//el.getSwapPrice(pq).then((price) => console.log(price));

const ask_factory = dx.factory_address[pq.dex_ask];
const ask_router = dx.router_address[pq.dex_ask];

dx.getPair(pq.token0_address, pq.token1_address, ask_factory, pq.conn).then(
  (ask_pair) => {
    px.getAskPrice(
      pq.eth_in,
      ask_pair.address,
      ask_factory,
      ask_router,
      pq.conn
    ).then((pout) => console.log(pout));
  }
);

const bid_factory = dx.factory_address[pq.dex_bid];
const bid_router = dx.router_address[pq.dex_bid];
dx.getPair(pq.token0_address, pq.token1_address, bid_factory, pq.conn).then(
  (bid_pair) => {
    px.getBidPrice(
      pq.eth_in,
      bid_pair.address,
      bid_factory,
      bid_router,
      pq.conn
    ).then((pout) => console.log(pout));
  }
);

//console.log(Object.keys(swap_requests));
//getAllSwapPrices(swap_requests).then((jarr) => console.log(jarr));

console.log("SPOOKY BID");
// Get bid price from spooky. Because this is async, it's not the number from before.
dex = "spooky";
factory = dx.factory_address[dex];
router = dx.router_address[dex];
factory_contract = new ethers.Contract(factory, factoryABI, conn);
pair_address = factory_contract.getPair(token0_address, token1_address);
px.getBidPrice(token_in, pair_address, factory, router, conn).then(
  (bid_price) => {
    bid_price["dex"] = dex;
    console.log(bid_price);
  }
);

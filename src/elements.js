// Data and objects for display on page
const dx = require("../script/dexes");
const px = require("../script/price");

// ASK
async function getSwapPrice(pq) {
  try {
    const ask_factory = dx.factory_address[pq.dex_ask];
    const ask_router = dx.router_address[pq.dex_ask];
    var ask_pair = await dx.getPair(
      pq.token0_address,
      pq.token1_address,
      ask_factory,
      pq.conn
    );
    var ask = await px.getAskPrice(
      pq.eth_in,
      ask_pair.address,
      ask_factory,
      ask_router,
      pq.conn
    );
    console.log(ask);

    // BID
    const bid_factory = dx.factory_address[pq.dex_bid];
    const bid_router = dx.router_address[pq.dex_bid];
    var bid_pair = await dx.getPair(
      pq.token0_address,
      pq.token1_address,
      bid_factory,
      pq.conn
    );
    var bid = await px.getBidPrice(
      ask.token_out,
      bid_pair.address,
      bid_factory,
      bid_router,
      pq.conn
    );
    console.log(bid);

    return {
      token0_symbol: pq.token0_symbol,
      token1_symbol: pq.token1_symbol,
      ask_price: ask.ask_price_ftm,
      bid_price: bid.bid_price_ftm,
      token_out: ask.token_out,
      eth_in: ask.eth_in,
      token_in: bid.token_in,
      eth_out: bid.eth_out,
      dex_ask: pq.dex_ask,
      dex_bid: pq.dex_bid
    };
  } catch (err) {
    console.log("Error ");
    console.log(err);
    return { err: "err" };
  }
}

async function getPriceDumb() {
  return 10.0;
}

module.exports = {
  getSwapPrice: getSwapPrice,
  getPriceDumb: getPriceDumb
};

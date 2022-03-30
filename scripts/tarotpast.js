const ethers = require("ethers");
const tarotRouterABI = require("../src/tarotRouter.json");

var rpc_url = "https://rpc.ftm.tools/";
const conn = new ethers.providers.JsonRpcProvider(rpc_url);

let factory_address = {
  spooky: "0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3",
  spirit: "0xEF45d134b73241eDa7703fa787148D9C9F4950b0"
};

let router_address = {
  spooky: "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
  spirit: "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52"
};

let token_address = {
  FTM: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
  DAI: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
  LQDR: "0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9",
  SPA: "0x5602df4a94eb6c680190accfa2a475621e0ddbdc"
};

let token0_address = token_address["DAI"];
let token1_address = token_address["FTM"];

async function main() {
  try {
    const pairABI = require("../src/pairs.json");
    const factoryABI = require("../src/factory.json");
    const factory_contract = new ethers.Contract(
      factory_address["spooky"],
      factoryABI,
      conn
    );

    const threshold = 10 * 10 ** 18;
    const pair_address = await factory_contract.getPair(
      token0_address,
      token1_address
    );

    console.log(pair_address);

    let currentBlock = await conn.getBlockNumber();
    const pair_contract = new ethers.Contract(pair_address, pairABI, conn);
    //console.log(pair_contract);
    let filter = pair_contract.filters.Swap();
    //  (event) => event.amount0In > threshold
    //);
    //console.log(filter);
    filter.fromBlock = currentBlock - 100;
    filter.toBlock = "latest";
    let query = await pair_contract.queryFilter(
      filter,
      currentBlock - 100,
      currentBlock
    );
    console.log(query);

    const tarotBorrowableAddress = "0xDb8B0449FE89cF8251c9029827fDA3f11Ed7150e";
    const tarotBorrowableABI = require("../src/tarotBorrowable.json");
    const tarotBorrowableContract = new ethers.Contract(
      tarotBorrowableAddress,
      tarotBorrowableABI,
      conn
    );
    //console.log(tarotBorrowableContract);
    //console.log(tarotBorrowableContract.filters.Borrow());
    let tarotfilter = tarotBorrowableContract.filters.Borrow();
    //filter.fromBlock = conn.getBlockNumber().then((b) => b - 50);
    const tarotresults = await tarotBorrowableContract.queryFilter(
      tarotfilter,
      currentBlock - 1000,
      currentBlock
    );
    console.log(tarotresults);
  } catch (err) {
    console.log(err);
  }
}

main();

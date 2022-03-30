const ethers = require("ethers");
const tokenABI = require("../src/token.json");
const routerABI = require("../src/router.json");
const factoryABI = require("../src/factory.json");
const pairABI = require("../src/pairs.json");

var ftm_main_url = "https://rpc.ftm.tools/";

const wallet = ethers.utils.getAddress(
  "0x831CEf5CC6d5ee48a8E33711c2AC70c5a6B30Cfb"
);

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

const weth_address = ethers.utils.getAddress(token_address["FTM"]);
const weth_decimal = 18;

function get_connection() {
  //provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new ethers.providers.JsonRpcProvider(ftm_main_url);
  return provider;
}

var conn = get_connection();

//owlracle.info/ftm/gas
const token0 = "DAI";
const token1 = "FTM";
const dex = "spooky";
const token0_address = token_address[token0];
const token1_address = token_address[token1];
const factory = factory_address[dex];
const factory_contract = new ethers.Contract(factory, factoryABI, conn);
const router_contract = new ethers.Contract(
  router_address["spooky"],
  routerABI,
  conn
);

async function main() {
  const token = new ethers.Contract(token0_address, tokenABI, conn);
  const recipient = wallet;
  const estimation = await token.estimateGas.transfer(recipient, 100);
  console.log("token gas estimate");
  console.log(estimation);

  try {
    const pair_address = await factory_contract.getPair(
      token0_address,
      token1_address
    );

    const pair_contract = new ethers.Contract(pair_address, pairABI, conn);
    //console.log(pair_contract);
    //console.log(router_contract);
    // swapExactTokensForTokens(uint256,uint256,address[],address,uint256)
    const amountIn = ethers.utils.parseEther("1");
    console.log(Date.now());

    console.log("gas_price");
    const gasPrice = await conn.getGasPrice();
    console.log(gasPrice);

    let token_amount_out = await router_contract.getAmountsOut(amountIn, [
      token0_address,
      token1_address
    ]);
    let decimal = 18;
    let min_amount_out = token_amount_out[1] - token_amount_out[1].div(10);
    console.log(amountIn);
    console.log(token_amount_out);
    console.log(min_amount_out);

    console.log("gas_estimate for swaps");

    try {
      const gas_estimate = await router_contract.estimateGas.swapExactTokensForTokens(
        String(amountIn),
        String(min_amount_out),
        [token0_address, token1_address],
        wallet,
        Date.now() + 1000 * 60 * 10,
        {
          from: wallet,
          gasPrice: gasPrice,
          gasLimit: 101000,
          nonce: conn.getTransactionCount(wallet)
        }
      );
      console.log(gas_estimate);
    } catch (err) {
      //console.log(err);
      console.log("Error in swap gas estimation");
    }
    //buy_tx = router_contract.functions.swapExactTokensForTokens(
    //  amount_in,
    //  min_amount_out,
    //  [web3.toChecksumAddress(token_address_in),
    //   web3.toChecksumAddress(ggtoken_address_out)],
    //  wallet_address,
    //  deadline).buildTransaction({
    //  'gas': max_gas,
    //  'gasPrice': web3.toWei(gas_price, 'gwei'),
    //  'nonce': web3.eth.get_transaction_count(wallet_address),
    //})
    //signed_tx = web3.eth.account.sign_transaction(buy_tx, holy_key)
    //tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
  } catch (err) {
    console.log(err);
    console.log("Error ");
  }
}

main();

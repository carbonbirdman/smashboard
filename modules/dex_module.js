export let token_address = {
  FTM: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  LQDR: "0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9",
  ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
  DAI: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
  SPA: "0x5602df4a94eb6c680190accfa2a475621e0ddbdc"
};

async function getAskBidPriceANy(eth_in, pair_address, factory, router, conn) {
  // Get the addresses of the two tokens, then get their contracts and
  // the decimal. If we could skip this step it would speed things up:
  // can we get this from the pair contract?
  const token0_address = pair_contract.token0();
  const token1_address = pair_contract.token1();
  const decimals = pair_contract.decimals();
  const token0_contract = new ethers.Contract(token0_address, tokenABI, conn);
  const token1_contract = new ethers.Contract(token1_address, tokenABI, conn);
  const token0_decimal = await token0_contract.decimals();
  const token1_decimal = await token1_contract.decimals();
  const factor = Math.pow(10, token0_decimal) / Math.pow(10, token1_decimal);
}

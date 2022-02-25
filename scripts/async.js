// Tons of experimentation to get async functions working
// with arrays

const input = [1, 2, 3, 4];

const getStap = async (sr) => {
  return sr + 1;
};

const getSwap = async (sreq) => {
  return await el.getSwapPrice(sreq);
};

const getSwaps = async (sr) => {
  return await Promise.all(sr.map(async (sr) => await getStap(sr)));
};

const jarr3 = getSwaps(input).then((jarr2) => console.log(jarr2));
console.log(input);
console.log(getStap(input[1]));
console.log(jarr3);

//el.getSwapPrice(swap_requests[1]).then((jarr2) => console.log(jarr2));
async function getAllSwap(swap_requests) {
  await Promise.all(
    swap_requests.map(async (sreq) => {
      let swap_price = await el.getSwapPrice(sreq);
      return swap_price;
    })
  );
}
//getAllSwap(swap_requests).then((jarr) => console.log(jarr));

// This doesn't really work
// better to return the whole thing async and then trim it
// on receipt.
async function getAllSwapPrices(swap_requests) {
  try {
    var prices = await Promise.all(
      swap_requests.map(async (sreq) => {
        let swap_price = el.getSwapPrice(sreq);
        return swap_price.token_out;
      })
    );
    return prices;
  } catch (err) {
    console.log(err);
    return { err: "err" };
  }
}
getAllSwapPrices(swap_requests).then((jarr) => console.log(jarr));

//const jarr = getAllSwapSync(swap_requests);
//console.log(jarr);

//Object.entries(obj).forEach(entry => {

//var jarr = getAllSwapPrices(swap_requests);
//console.log(jarr);
//Object.values(swap_requests).forEach((sreq) => {
//  console.log(sreq);
//});

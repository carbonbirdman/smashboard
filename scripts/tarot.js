const ethers = require("ethers");
const tarotRouterABI = require("../src/tarotRouter.json");

var rpc_url = "https://rpc.ftm.tools/";
const conn = new ethers.providers.JsonRpcProvider(rpc_url);
const routerAddress = "0x283e62cfe14b352db8e30a9575481dcbf589ad98";
const routerContract = new ethers.Contract(routerAddress, tarotRouterABI, conn);

const filter = {
  address: routerAddress,
  topics: [
    // the name of the event, parnetheses containing the data type of each event, no spaces
    ethers.utils.id("mintCollateral(address, uint256, address, uint256, bytes)")
  ]
};

console.log(routerContract);

async function main() {
  if (routerContract) {
    try {
      console.log("listening");
      conn.on(filter, (output) => {
        console.log(output);
      });
    } catch (err) {
      console.log(err);
      return "...er...";
    }
  }
}

main();

//routerContract.on(
//  "mintCollateral",
//  (poolToken, amount, to, deadline, permitData) => {
//   console.log("mint detected", to);
//    var return_object = {
//     poolToken,
//    amount,
// //     to,
//      deadline,
//      permitData
//    };
//    console.log(return_object);
//  }
//);`

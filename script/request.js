const axios = require("axios");
const token = "0xdac17f958d2ee523a2206206994597c13d831ec7";
var query_data = {
  url: "https://openapi.debank.com/v1/token",
  method: "GET",
  qs: {
    chain_id: "eth",
    id: "0xdac17f958d2ee523a2206206994597c13d831ec7"
  }
};

//var output = request(query_data, { json: true });
//console.log(output.body);

axios
  .get("https://openapi.debank.com/v1/token", {
    params: {
      chain_id: "eth",
      id: "0xdac17f958d2ee523a2206206994597c13d831ec7"
    }
  })
  .then((output) => {
    //let [err, res, body] = output;
    console.log(output.data);
  })
  .catch((err) => {
    console.log(err);
  });

//var output2 = axios
//  .get("https://openapi.debank.com/v1/token", {
//    qs: {
//     chain_id: "eth",
//     id: "0xdac17f958d2ee523a2206206994597c13d831ec7"
//   }
// })
// .then((output) => console.log(output.body));

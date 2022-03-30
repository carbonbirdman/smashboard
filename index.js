const express = require("express");
const dx = require("./src/dexes");
const el = require("./src/elements");
var path = require("path");

const app = express();
var eta = require("eta");
app.set("view engine", "eta");

app.set("views", "./views");
const port = 3000;

var indexTemplate = `
<!DOCTYPE html>
<p>Links:</p>
<% it.forEach(function(user){ %>
  <a href=" <%= user %> "><%= user %> </a> </br>
<% }) %>
`;

//<a href="<%-entry%>"><%-entry-></a></br>

var priceTemplate = `
<!DOCTYPE html>
<p>Price comparison</p>
<p>
 <%= it.token0_symbol %> <%= it.token1_symbol %> |
 <%=it.dex_ask%> => <%=it.dex_bid%> |
 <%= it.bid_price %> / <%= it.ask_price %>
  </p>
<p> <%=it.eth_in%>
 -> <%=it.token_out%>
 -> <%=it.token_in%>
 <%=it.eth_out%>
 </p>
<p>  </p>
`;

app.get("/", (req, res) => {
  res.send(eta.render(indexTemplate, ["home", "price", "inputs", "outputs"]));
});

app.get("/home", (req, res) => {
  res.render("home", {
    favorite: "Eta",
    name: "Carbonbirdman",
    reasons: ["fast", "lightweight", "simple"]
  });
});

app.get("/price", (req, res) => {
  var conn = dx.get_connection();
  let swap_request = {
    eth_in: "1",
    dex_ask: "spirit",
    dex_bid: "spooky",
    token0_symbol: "FTM",
    token1_symbol: "WBTC",
    token0_address: dx.token_address["FTM"],
    token1_address: dx.token_address["WBTC"],
    conn
  };
  console.log(swap_request);
  el.getSwapPrice(swap_request)
    .then((priceArray) => {
      console.log(priceArray);
      res.send(eta.render(priceTemplate, priceArray));
    })
    .catch((err) => {
      console.log(err);
      //res.send(Eta.render(indexTemplate));
    });
});

var inputTemplate = `
<!DOCTYPE html>
<ul>
<% it.forEach(function(entry) {%>
<li><%= entry.dex_ask%> <%= entry.dex_bid%> </li>
<%});%>
</ul>
`;

app.get("/inputs", function (req, res) {
  //array with items to send
  var items = el.getSwapList([
    "LQDR",
    "ETH",
    "DAI",
    "SPA",
    "WBTC",
    "ICE",
    "MIM",
    "CRV",
    "LINK",
    "SUSHI",
    "BIFI",
    "MIM",
    "ANY",
    "BNB",
    "CREAM"
  ]);
  console.log(items);
  res.send(eta.render(inputTemplate, items));
});

var outputTemplate = `
<!DOCTYPE html>
<ul>
<% it.forEach(function(iti) {%>
<li> <%= iti.dex_ask %> <%= iti.dex_bid%> <%= iti.token1_symbol%> <%= iti.eth_out%>    </li>
<%});%>
</ul>
`;

function cutSwaps(swps) {
  return swps.map((sp) => [sp.token1_symbol, sp.eth_out]);
}

app.get("/outputs", function (req, res) {
  //array with items to send
  var items = el.getSwapList([
    "LQDR",
    "ETH",
    "DAI",
    "SPA",
    "WBTC",
    "ICE",
    "MIM",
    "CRV",
    "LINK",
    "SUSHI",
    "BIFI",
    "MIM",
    "ANY",
    "BNB",
    "CREAM"
  ]);
  console.log(items);
  el.getSwaps(items)
    .then((swapOutputs) => {
      //const jc = cutSwaps(swapOutputs);
      //console.log(jc);
      //console.log(jc[0][1]);
      res.send(eta.render(outputTemplate, swapOutputs));
      //res.send(JSON.stringify(swapOutputs));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/string", (req, res) => {
  res.send(JSON.stringify(dx.token_address));
});

app.get("/header", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(dx.token_address);
});

app.get("/json", (req, res) => {
  res.json(dx.token_address);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  //var conn = dexes.get_connection();
  console.log(dx.token_address);
});

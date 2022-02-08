const express = require("express");
const app = express();
const dexes = require("../script/dexes");
const elements = require("./elements");
var Sqrl = require("squirrelly");
const port = 3000;
//app.listen(port, console.log("running"));
//https://squirrelly.js.org/docs/api/compilation

var objTemplate = `<p>{{@foreach(it) => key, val}}
This loops over each of an objects keys and values.
The value of the current child is {{val}}
The current key is {{key}}</p>
{{/foreach}}`;
//var compiled = Sqrl.compile(objTemplate);

var indexTemplate = `
<!DOCTYPE html>
<a href="string">string</a>
<a href="header">header</a>
<a href="sqrl">sqrl</a>
<a href="json">json</a>`;
//  .getPriceSimple()

var priceTemplate = `
<!DOCTYPE html>
<a href="string">string</a>
<a href="header">header</a>
<a href="sqrl">sqrl</a>
<a href="json">json</a>
<p> {{it.dex_ask}} {{ it.ask_price }} </p>
<p> {{it.dex_bid}} {{ it.bid_price }} </p>
`;

app.get("/", (req, res) => {
  res.send(Sqrl.render(indexTemplate));
});

app.get("/price", (req, res) => {
  elements
    .getPriceArray("spooky", "spirit")
    .then((priceArray) => {
      res.send(Sqrl.render(priceTemplate, { priceArray }));
    })
    .catch((err) => {
      console.log(err);
      res.send(Sqrl.render(indexTemplate));
    });
});

app.get("/string", (req, res) => {
  res.send(JSON.stringify(dexes.token_address));
});

app.get("/header", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(dexes.token_address);
});

app.get("/sqrl", (req, res) => {
  //res.send(Sqrl.render(template, JSON.stringify(dexes.token_address)));
  res.send(Sqrl.render(objTemplate, dexes.token_address));
  //res.send(Sqrl.render(compiled(dexes.token_address)));
});

app.get("/json", (req, res) => {
  res.json(dexes.token_address);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  //var conn = dexes.get_connection();
  console.log(dexes.token_address);
});

// Returns: '<p>My favorite kind of cake is: Chocolate!</p>
//Conditionals
//{{@if(it.somevalue === 1)}}
//Display this
//{{#else}}
//Display this
//{{/if}}
//Loops
//{{@each(it.somearray) => val, index}}
//Display this
//The current array element is {{val}}
//The current index is {{index}}
//{{/each}}

// GRAPH details and interface for dexes
//"https://thegraph.com/hosted-service/subgraph/layer3org/spiritswap-analytics?selected=playground"
//"https://thegraph.com/hosted-service/subgraph/eerieeight/spookyswap"
//"https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx/graphql"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const spookyClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap",
  cache: new InMemoryCache()
});

const spiritClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/layer3org/spiritswap-analytics",
  cache: new InMemoryCache()
});
//LQDR pair 0x4fe6f19031239f105f753d1df8a0d24857d0caa2

const beetsClient = new ApolloClient({
  uri: "https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx",
  cache: new InMemoryCache()
});

const spiritQuery = gql`
  query {
    pairs(where: { id: "0x4fe6f19031239f105f753d1df8a0d24857d0caa2" }) {
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
      token0Price
      token1Price
    }
  }
`;

const spookyQuery = gql`
  query {
    pairs(where: { id: "0x506ddcc751c7d500f983ffda6ddefbe458ba2c33" }) {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      token0Price
      token1Price
    }
  }
`;

//LQDR: 0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9
const beetsQuery = gql`
  query {
    tokenPrices(
      where: { asset: "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9" }
      orderDirection: desc
      orderBy: "block"
      first: 1
    ) {
      id
      price
    }
  }
`;

function PriceSpirit() {
  const { loading, error, data } = useQuery(spiritQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  console.log(data.pairs[0].token1Price);
  return data.pairs.map((pair) => (
    <div key={pair}>
      <p>
        {Number(pair.token0Price).toPrecision(5)} <br />
        {Number(pair.token1Price).toPrecision(5)}
      </p>
    </div>
  ));
}

function PriceSpooky() {
  const { loading, error, data } = useQuery(spookyQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("Spooky");
  console.log(data);
  console.log(data.pairs[0].token1Price);
  return data.pairs.map((pair) => (
    <div key={pair}>
      <p>
        {Number(pair.token0Price).toPrecision(5)} <br />
        {Number(pair.token1Price).toPrecision(5)}
      </p>
    </div>
  ));
}

function PriceBeets() {
  const { loading, error, data } = useQuery(beetsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.tokenPrices.map((pair) => (
    <div key={pair}>
      <p>{Number(pair.price).toPrecision(5)}</p>
    </div>
  ));
}

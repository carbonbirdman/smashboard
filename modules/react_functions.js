const DisplayPair = ({ token0, token1, factory, conn }) => {
  const [pair, setPair] = React.useState(0);
  console.log(pair);
  React.useEffect(() => {
    getPairInfo(
      token_address[token0],
      token_address[token1],
      factory,
      conn
    ).then((pair) => {
      setPair(pair);
    });
  }, [token0, token1, factory]);
  return (
    <div>
      {"TOKEN0:"} {token0} <br />
      {"TOKEN1:"} {token1}
      <br />
      {"PAIR price:"} {pair.reserves_price} <br />
    </div>
  );
};

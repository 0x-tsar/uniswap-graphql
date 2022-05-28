import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import type {
  GetStaticProps,
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
  NextPageContext,
} from "next";
import styles from "../../styles/Home.module.css";

interface Token {
  __typename: String;
  id: String;
  name: String;
  symbol: String;
  totalSupply: String | Number;
}

const Home: NextPage = ({ data }) => {
  return (
    <div className="panel">
      {data.tokens.map((token: Token, key: string | number) => {
        return (
          <div key={key} className="eachItem">
            <p>{token.id}</p>
            <p>{token.name}</p>
            <p>{token.symbol}</p>
            <p>{token.totalSupply.toString()}</p>
            <span>----------</span>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // export async function getStaticProps(): Promise<
  //   GetStaticPropsResult<Token> | any
  // > {
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    cache: new InMemoryCache(),
  });

  let { data } = await client.query({
    query: gql`
      {
        tokens {
          id
          name
          symbol
          totalSupply
        }
      }
    `,
  });

  return {
    props: {
      data: data,
    },
  };
};

export default Home;

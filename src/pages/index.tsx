import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";

const Home: NextPage = (data) => {
  console.log(data);

  return <div className={styles.container}></div>;
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
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
}

export default Home;

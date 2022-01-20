import Head from 'next/head';
import "../styles/globals.css";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Cool Blog</title>
        <meta name="viewport" description="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

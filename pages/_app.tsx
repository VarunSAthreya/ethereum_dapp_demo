import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>Ethereum DAPP Demo</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;

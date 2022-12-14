import type { NextPage } from 'next';
import Head from 'next/head';
import { Content } from '@components/Content';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="author" content="stay" />
      <meta
        name="keywords"
        content="stay, Zétény, Nagy, Zétény Nagy, BMSzC Neumann János Informatikai Technikum, Matek, Math, Maths, Quiz"
      />

      <meta property="og:locale" content="hu_HU" />
      <meta property="og:type" content="website" key="og_type" />
      <meta property="og:site_name" content="Matek - Zétény Nagy" key="site_name" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="znagy.hu" />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="rating" content="general" />

      <title>Matek - Zétény Nagy</title>
      <meta property="og:title" content="Matek - Zétény Nagy" key="title" />
      <meta name="twitter:title" content="Matek - Zétény Nagy" />

      <meta name="description" content="Matek - Zétény Nagy" />
      <meta property="og:description" content="Matek - Zétény Nagy" />
      <meta name="twitter:description" content="Matek - Zétény Nagy" />

      <meta name="url" content="https://matek.znagy.hu/" />
      <meta property="og:url" content="https://matek.znagy.hu/" />
      <meta property="twitter:url" content="https://matek.znagy.hu/" />
    </Head>

    <Content />
  </>
);

export default Page;

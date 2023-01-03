import Head from 'next/head';

export const Meta: React.FC<{
  path: string;
  title: string;
  desc: string;
}> = ({ path, title, desc }) => (
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

    <title>{title}</title>
    <meta property="og:title" content={title} key="title" />
    <meta name="twitter:title" content={title} />

    <meta name="description" content={desc} />
    <meta property="og:description" content={desc} />
    <meta name="twitter:description" content={desc} />

    <meta name="url" content={`https://matek.znagy.hu${path}`} />
    <meta property="og:url" content={`https://matek.znagy.hu${path}`} />
    <meta property="twitter:url" content={`https://matek.znagy.hu${path}`} />
  </Head>
);

import Head from 'next/head';

export const Layout: React.FC<{
  children: React.ReactNode;
  path: string;
  title: string;
  desc: string;
}> = ({ children, path, title, desc }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="author" content="stay" />
        <meta
          name="keywords"
          content="stay, Zétény, Nagy, Zétény Nagy, Full stack dev, Full stack developer, IT, IT Student, Kyokushin, Kyokushin Karate, Muay Thai, Thai Box, Thai-Boxing, Hungary, JavaScript, TypeScript, Node.js, Express, React, Next.js, Sass, SCSS, Tailwind CSS, TailwindCSS, tailwind, Mantine, tRPC, MySQL, Postgres, PostgreSQL,
          PlanetScale, Railway, Bootstrap, t3-stack, MongoDB, HTML, HTML5, CSS, CSS3, Nodemailer, Vercel, Netlify, Heroku, Linode, DigitalOcean, Vercel, Discord.js, REGALE Energy Zrt., Anything, Resume, Education, Skills, Hobbies, IT, Web Development, Web Developer, Data modeling, Data structuring, DevOps, Cloud, Networking,
          Languages & Libraries, Technologies, Platforms, School, Újlaki Általános Iskola, BMSzC Neumann János Informatikai Technikum"
        />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" key="og_type" />
        <meta property="og:site_name" content="Zétény Nagy" key="site_name" />

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

      <main>{children}</main>
    </>
  );
};

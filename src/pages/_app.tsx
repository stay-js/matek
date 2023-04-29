import type { AppType } from 'next/dist/shared/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { trpc } from '@utils/trpc';

import '@styles/globals.css';

const App: AppType = ({ Component, pageProps }) => (
  <>
    <Analytics />
    <Component {...pageProps} />
  </>
);

export default trpc.withTRPC(App);

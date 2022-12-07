import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '@utils/trpc';

import '@styles/globals.css';

const App: AppType = ({ Component, pageProps }) => <Component {...pageProps} />;

export default trpc.withTRPC(App);

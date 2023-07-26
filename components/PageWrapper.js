"use client";

import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
import {SITE_NAME, SITE_URL} from 'lib/constants'

export default function PageWrapper({ meta, children, fullViewport = false }) {
  // const router = useRouter();
  // const title = meta.title || SITE_NAME;
  // const url = meta.url || `${SITE_URL}${router.asPath}`;
  // const description = meta.description || SITE_NAME;

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      {/* <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head> */}
      {children}
    </div>
  );
}
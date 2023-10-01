// This file contains our custom Meta

import React from "react";
import Head from "next/head";

export type CustomMetaProps = {
  icon?: string; /// Defaults to our normal favicon
  ogMeta?: Record<string, string>;
  title: string;
};

export const CustomMeta = ({ icon, ogMeta, title }: CustomMetaProps) => {
  const useTitle = `${title} | Buddies of Budgie`;
  return (
    <Head>
      <title>{useTitle}</title>
      <meta charSet="utf-8" />
      <link rel="icon" href={icon ?? "/images/logo.svg"} />
      <link rel="me" href="https://floss.social/@BuddiesOfBudgie" />
      {ogMeta &&
        Object.entries(ogMeta).map(([key, value]) => <meta key={`og:${key}`} property={`og:${key}`} content={value} />)}
    </Head>
  );
};

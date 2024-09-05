import React from "react";
import { Helmet } from "react-helmet-async";
import siteMetadata from "../utils/siteMetadata";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  ogType,
  ogImage,
  noIndex = false,
}: SEOProps) {
  const siteTitle = title
    ? `${title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const siteDescription = description || siteMetadata.description;
  const siteUrl = siteMetadata.siteUrl;
  const siteImage = ogImage || siteMetadata.siteLogo;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content={siteMetadata.locale} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}

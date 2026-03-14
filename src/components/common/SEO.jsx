import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'Abdulwarith Portfolio';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Full Stack Developer portfolio showcasing projects and experience.';
  const defaultKeywords = 'Full Stack Developer, React, Node.js, Portfolio, Web Development';
  const siteUrl = 'https://abdulwarith.dev'; // Replace with actual URL if known
  const defaultImage = '/og-image.png'; // Placeholder for OG image

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEO;

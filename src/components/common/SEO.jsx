import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'Abdulwarith';
  const fullTitle = title ? `${title} | ${siteName}` : 'Abdulwarith | Systems Engineering & Technical Reports';
  const defaultDescription = 'Technical reports, compact language models, hardware-aligned tokenizers, and production systems engineering by Abdulwarith.';
  const defaultKeywords = 'Tokenizer, Byte-Level BPE, uint16, Language Models, Systems Engineering, Technical Reports, PyTorch';
  const siteUrl = 'https://www.enigmare.xyz';
  const rawImage = image || '/images/og-preview.png';
  const absoluteImage = rawImage.startsWith('http') ? rawImage : `${siteUrl}${rawImage}`;
  const canonicalUrl = url || siteUrl;

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
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Enigmare AI Research" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;

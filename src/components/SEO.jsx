import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Rehan's Portfolio | Student Developer",
  description = "Learning | Building | Sharing - Portfolio of Rehan, a passionate student developer eager to learn new technologies and build impactful projects.",
  keywords = "Rehan, Portfolio, Student Developer, React, JavaScript, Web Developer, Lahore, Computer Science",
  author = "Rehan Jamil",
  ogImage = "/images/logo.png",
  canonical = "https://your-domain.com"
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Rehan's Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#2563eb" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/images/logo.png" />
    </Helmet>
  );
}

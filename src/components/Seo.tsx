import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bigdaddysbigtips.com";

/**
 * Tags that exist statically in index.html (as a fallback for crawlers that
 * don't run JS) and are also managed by Helmet. Once Helmet is live we drop
 * the static copies client-side so pages never ship duplicates.
 */
const STATIC_DUPES = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:url"]',
];

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for canonical + og:url. */
  path: string;
  noindex?: boolean;
}

const Seo = ({ title, description, path, noindex }: SeoProps) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;

  useEffect(() => {
    STATIC_DUPES.forEach((selector) => {
      document
        .querySelectorAll(`${selector}:not([data-rh])`)
        .forEach((el) => el.remove());
    });
  }, []);



  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};

export default Seo;

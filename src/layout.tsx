import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";

// ─── Site-wide SEO Configuration ───────────────────────────────────────────
const SITE_NAME          = "Rana Car Wash And Tires";
const SITE_URL           = "https://ranacarwashandtires.com";
const DEFAULT_DESCRIPTION =
  "Rana Car Wash And Tires — professional car wash, tire services, and auto care in Kingston, ON. Spotless results, expert hands. Book your service today!";
const DEFAULT_OG_IMAGE   = `${SITE_URL}/og-image.png`; // 1200×630px branded image
const LOGO_URL           = `${SITE_URL}/logo.png`;     // your public logo
const INSTA_URL          = "https://www.instagram.com/ranacarwashandtires";
const BUSINESS_PHONE     = "613-900-1530";
const BUSINESS_ADDRESS   = {
  street:  "1525 John Counter Blvd",
  city:    "Kingston",
  state:   "ON",
  zip:     "K7M 8M9",
  country: "CA",
};

const Layout = () => {
  const { pathname } = useLocation();
  const canonicalUrl  = `${SITE_URL}${pathname}`;

  return (
    <>
      <Helmet defaultTitle={SITE_NAME} titleTemplate={`%s | ${SITE_NAME}`}>

        {/* ── Core ──────────────────────────────────────────────────────── */}
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />

        {/* ── Favicon / Logo ────────────────────────────────────────────── */}
        <link rel="icon"            href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ── Keywords ──────────────────────────────────────────────────── */}
        <meta
          name="keywords"
          content="car wash Kingston ON, tire service Kingston, auto detailing Kingston, tire repair, tire replacement, wheel alignment, Rana Car Wash, professional car wash Ontario"
        />

        {/* ── Authorship & Theme ────────────────────────────────────────── */}
        <meta name="author"      content="Rana Car Wash And Tires" />
        <meta name="theme-color" content="#1a1a2e" />

        {/* ── Crawling & Indexing ───────────────────────────────────────── */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* ── Open Graph ───────────────────────────────────────────────── */}
        <meta property="og:type"         content="website" />
        <meta property="og:site_name"    content={SITE_NAME} />
        <meta property="og:url"          content={canonicalUrl} />
        <meta property="og:title"        content={SITE_NAME} />
        <meta property="og:description"  content={DEFAULT_DESCRIPTION} />
        <meta property="og:image"        content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content="Rana Car Wash And Tires — Kingston, ON" />
        <meta property="og:locale"       content="en_CA" />

        {/* ── Twitter / X Card (no Twitter? use og fallback — still correct) */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={SITE_NAME} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image"       content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:image:alt"   content="Rana Car Wash And Tires" />

        {/* ── Geo Tags (Local SEO) ──────────────────────────────────────── */}
        <meta name="geo.region"    content="CA-ON" />
        <meta name="geo.placename" content="Kingston, Ontario" />

        {/* ── JSON-LD Structured Data ───────────────────────────────────── */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type":       ["LocalBusiness", "AutoWash"],
                "@id":         `${SITE_URL}/#business`,
                name:          SITE_NAME,
                url:           SITE_URL,
                logo:          LOGO_URL,
                image:         DEFAULT_OG_IMAGE,
                description:   DEFAULT_DESCRIPTION,
                telephone:     BUSINESS_PHONE,
                priceRange:    "$$",
                address: {
                  "@type":         "PostalAddress",
                  streetAddress:   BUSINESS_ADDRESS.street,
                  addressLocality: BUSINESS_ADDRESS.city,
                  addressRegion:   BUSINESS_ADDRESS.state,
                  postalCode:      BUSINESS_ADDRESS.zip,
                  addressCountry:  BUSINESS_ADDRESS.country,
                },
                sameAs: [INSTA_URL],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name:    "Car Wash & Tire Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type":       "Service",
                        name:          "Car Wash",
                        description:   "Full-service exterior and interior car wash.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type":       "Service",
                        name:          "Tire Services",
                        description:   "Tire repair, replacement, rotation, and balancing.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type":       "Service",
                        name:          "Auto Detailing",
                        description:   "Professional interior and exterior vehicle detailing.",
                      },
                    },
                  ],
                },
              },
              {
                "@type":     "WebSite",
                "@id":       `${SITE_URL}/#website`,
                url:         SITE_URL,
                name:        SITE_NAME,
                publisher:   { "@id": `${SITE_URL}/#business` },
                potentialAction: {
                  "@type":       "SearchAction",
                  target:        `${SITE_URL}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <div>
        <Navbar />
        <ToastContainer />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
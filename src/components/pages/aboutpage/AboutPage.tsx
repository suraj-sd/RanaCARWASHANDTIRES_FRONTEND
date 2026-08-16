import { Helmet } from "react-helmet-async";
import AboutSection from "../homepage/AboutSection";
import AboutDetails from "./AboutDetails";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Us</title>
                <meta
                    name="description"
                    content="Learn about Rana Car Wash And Tires in Kingston, ON — our story, our team, and our commitment to professional car wash and tire services since day one."
                />
                <meta
                    name="keywords"
                    content="about Rana Car Wash, Kingston car wash team, auto care Kingston Ontario, professional tire service, car wash story"
                />

                {/* ── Open Graph ──────────────────────────────────────────── */}
                <meta property="og:title"       content="About Us | Rana Car Wash And Tires" />
                <meta property="og:description" content="Meet the team behind Rana Car Wash And Tires — Kingston's trusted car wash and tire service professionals." />
                <meta property="og:url"         content="https://ranacarwashandtires.com/about" />
                <meta property="og:type"        content="website" />

                {/* ── Twitter Card ────────────────────────────────────────── */}
                <meta name="twitter:title"       content="About Us | Rana Car Wash And Tires" />
                <meta name="twitter:description" content="Meet the team behind Rana Car Wash And Tires — Kingston's trusted car wash and tire service professionals." />

                {/* ── JSON-LD: AboutPage schema ────────────────────────────── */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type":    "AboutPage",
                        "@id":      "https://ranacarwashandtires.com/about#webpage",
                        url:        "https://ranacarwashandtires.com/about",
                        name:       "About Rana Car Wash And Tires",
                        description:
                            "Learn about Rana Car Wash And Tires — our story, our team, and our commitment to professional auto care in Kingston, Ontario.",
                        isPartOf: {
                            "@id": "https://ranacarwashandtires.com/#website",
                        },
                        about: {
                            "@id": "https://ranacarwashandtires.com/#business",
                        },
                        breadcrumb: {
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                {
                                    "@type":    "ListItem",
                                    position:   1,
                                    name:       "Home",
                                    item:       "https://ranacarwashandtires.com",
                                },
                                {
                                    "@type":    "ListItem",
                                    position:   2,
                                    name:       "About",
                                    item:       "https://ranacarwashandtires.com/about",
                                },
                            ],
                        },
                    })}
                </script>
            </Helmet>

            <main className="bg-[#06090d] overflow-hidden">

                {/* SEO H1 (hidden, does NOT affect UI) */}
                <h1 className="sr-only">
                    About Rana Car Wash & Tires - Professional Car Wash and Automotive Services in Kingston, ON
                </h1>

                {/* Minimal "About" label */}
                <div className="inline-flex items-center gap-2 mb-8 mt-4 md:ml-45 md:mt-0">
                    <div className="h-px w-12 bg-linear-to-r from-cyan-500 to-transparent" />
                    <span className="text-sm font-medium text-cyan-400 tracking-widest uppercase">
                        About
                    </span>
                </div>

                {/* Content Sections */}
                <section aria-label="About Rana Car Wash">
                    <AboutSection />
                </section>

                <section aria-label="Our Services and Details">
                    <AboutDetails />
                </section>

            </main>
        </>
    );
};

export default AboutPage;
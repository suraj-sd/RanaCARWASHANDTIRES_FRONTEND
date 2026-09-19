import { Helmet } from "react-helmet-async";
import { ArrowRight, CarFront, CheckCircle2, Clock3, Droplets, MapPin, Phone, ShieldCheck, Snowflake, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const bookingState = {
  serviceName: "Oil-Based Rust Proofing / Undercoating",
  servicePrice: "$69 + tax",
  planType: "Rust Proofing",
};

const protectionPoints = [
  "Protect exposed metal surfaces",
  "Reduce moisture contact underneath the vehicle",
  "Create a protective barrier against road salt and winter grime",
  "Reach appropriate accessible areas under the vehicle",
  "Help slow the development of rust and corrosion",
  "Add protection during Canadian winter driving",
];

const treatedAreas = [
  "Underbody components",
  "Frame areas and metal brackets",
  "Wheel-well areas",
  "Other accessible metal surfaces",
];

const vehicleTypes = ["Cars", "SUVs", "Crossovers", "Minivans", "Light trucks", "Daily drivers"];

const faqs = [
  {
    question: "What is oil-based rust proofing?",
    answer:
      "It is a corrosion-protection treatment that coats accessible vehicle areas with an oil-based product to help protect metal from moisture, salt and other contaminants.",
  },
  {
    question: "How much does rust proofing cost?",
    answer: "Our special price for oil-based rust proofing and undercoating is only $69 plus tax.",
  },
  {
    question: "Do I need an appointment?",
    answer: "Walk-ins are welcome, but appointments are recommended to help reduce waiting time.",
  },
  {
    question: "Does rust proofing stop existing rust?",
    answer:
      "Rust proofing is preventative. It does not repair structural rust or reverse existing corrosion. Severely rusted or damaged areas should be assessed separately.",
  },
  {
    question: "How often should I rust proof my vehicle?",
    answer:
      "The right interval depends on the vehicle, driving conditions, product and condition of any previous treatment. We can inspect the vehicle and advise you.",
  },
  {
    question: "Can you rust proof SUVs and trucks?",
    answer:
      "Yes. Cars, SUVs, crossovers, minivans and light trucks can be treated, subject to vehicle condition and accessibility.",
  },
];

const RustProofing = () => {
  return (
    <>
      <Helmet>
        <title>Rust Proofing Kingston ON | Rana Car Wash & Tires</title>
        <meta
          name="description"
          content="Protect your vehicle before winter with professional oil-based rust proofing and undercoating in Kingston, ON. Only $69 plus tax at Rana Car Wash & Tires."
        />
        <meta
          name="keywords"
          content="rust proofing Kingston ON, oil-based undercoating Kingston, rust protection Ontario, winter undercoating, Rana Car Wash rust proofing"
        />
        <meta property="og:title" content="Oil-Based Rust Proofing in Kingston, ON - Only $69" />
        <meta
          property="og:description"
          content="Professional oil-based rust proofing and undercoating at Rana Car Wash & Tires. Walk-ins welcome."
        />
        <meta property="og:url" content="https://ranacarwashandtires.com/rust-proofing" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Oil-Based Rust Proofing and Undercoating",
            description:
              "Professional oil-based rust proofing and undercoating for vehicles in Kingston, Ontario.",
            provider: {
              "@type": "AutoWash",
              name: "Rana Car Wash & Tires",
              telephone: "+1-613-900-1530",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1525 John Counter Blvd",
                addressLocality: "Kingston",
                addressRegion: "ON",
                postalCode: "K7M 8M9",
                addressCountry: "CA",
              },
            },
            areaServed: { "@type": "City", name: "Kingston", containedIn: "Ontario, Canada" },
            offers: { "@type": "Offer", price: "69", priceCurrency: "CAD" },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-[#071016] text-white">
        <section className="relative border-b border-cyan-100/10 px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,116,144,0.28),transparent_38%),linear-gradient(135deg,#071016_0%,#0b1e29_55%,#102c35_100%)]" />
          <div className="absolute -right-32 top-24 h-96 w-96 rounded-full border border-cyan-300/10" />
          <div className="absolute -right-16 top-40 h-64 w-64 rounded-full border border-cyan-300/10" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <Snowflake className="h-4 w-4" />
                Kingston winter protection
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                Protect your vehicle before winter does the damage.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Professional oil-based rust proofing and undercoating for cars, SUVs and light trucks at Rana Car Wash & Tires.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/booking"
                  state={bookingState}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  Book rust proofing <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:6139001530"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-100/25 px-6 py-3.5 font-semibold text-white transition hover:border-cyan-200 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> Call 613-900-1530
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> Walk-ins welcome</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-300" /> Appointments recommended</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="border border-amber-200/30 bg-[#10252d]/90 p-8 shadow-2xl shadow-cyan-950/40 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Winter special</p>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-7xl font-black tracking-tight text-white">$69</span>
                  <span className="pb-3 text-lg font-semibold text-slate-300">+ tax</span>
                </div>
                <div className="my-7 h-px bg-white/15" />
                <p className="text-lg font-semibold">Oil-based rust proofing / undercoating</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  An affordable extra layer of protection before heavy snow, salt and slush arrive.
                </p>
                <Link to="/booking" state={bookingState} className="mt-7 inline-flex items-center gap-2 font-semibold text-amber-300 hover:text-amber-200">
                  Reserve your spot <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Built for Canadian conditions</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A practical barrier against salt, moisture and winter grime.</h2>
              <p className="mt-5 leading-8 text-slate-400">
                Road salt and moisture can collect underneath your vehicle and gradually affect exposed metal. Our oil-based treatment is applied to appropriate accessible areas based on your vehicle's design and condition.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {protectionPoints.map((point) => (
                <div key={point} className="border border-white/10 bg-white/[0.04] p-6">
                  <ShieldCheck className="h-7 w-7 text-cyan-300" />
                  <p className="mt-5 font-semibold leading-7 text-slate-100">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0c2028] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 text-cyan-300"><Droplets className="h-6 w-6" /><span className="font-semibold uppercase tracking-[0.16em]">The treatment</span></div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Oil-based undercoating for vehicles driven year-round.</h2>
              <p className="mt-5 leading-8 text-slate-300">
                The oil-based product provides a protective coating that can help protect accessible areas underneath the vehicle where moisture, salt and road contaminants may accumulate.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {vehicleTypes.map((vehicle) => <span key={vehicle} className="border border-cyan-100/15 px-3 py-3 text-center text-sm text-slate-200">{vehicle}</span>)}
              </div>
            </div>
            <div className="border border-white/10 bg-[#071016] p-7 sm:p-9">
              <div className="flex items-center gap-3"><Wrench className="h-6 w-6 text-amber-300" /><h3 className="text-xl font-bold">Areas that may be treated</h3></div>
              <p className="mt-4 text-sm leading-7 text-slate-400">Treatment areas vary with vehicle design, condition and existing coatings.</p>
              <ul className="mt-7 space-y-4">
                {treatedAreas.map((area) => <li key={area} className="flex items-start gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />{area}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Questions answered</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Rust proofing, explained simply.</h2>
              <p className="mt-5 leading-8 text-slate-400">Preventative protection is most useful before winter conditions arrive. We will help you understand what is appropriate for your vehicle.</p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-100 marker:content-none">
                    {faq.question}<span className="text-2xl font-normal text-cyan-300 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl pr-8 text-sm leading-7 text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-100/10 bg-[#10252d] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Visit Rana Car Wash & Tires</p>
              <h2 className="mt-3 text-3xl font-bold">Protect it. Maintain it. Drive it.</h2>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> 1525 John Counter Blvd, Kingston, ON K7M 8M9</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-300" /> Open 9 AM - 8 PM</span>
                <span className="inline-flex items-center gap-2"><CarFront className="h-4 w-4 text-cyan-300" /> Walk-ins welcome</span>
              </div>
            </div>
            <Link to="/booking" state={bookingState} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300">
              Book for $69 + tax <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default RustProofing;

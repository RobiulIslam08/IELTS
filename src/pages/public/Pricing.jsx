import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Online IELTS Course",
    price: "৳1,000",
    period: "full course",
    highlight: false,
    badge: null,
    desc: "Complete IELTS preparation via live & recorded online sessions with certified trainers.",
    features: [
      "Live Zoom / Google Meet classes",
      "Recorded session replays (lifetime)",
      "Digital PDFs & study guides",
      "4 full-length online mock tests",
      "WhatsApp group support",
      "1-on-1 doubt sessions",
      "Progress tracking dashboard",
      "Certificate of completion",
    ],
    cta: "Enroll Online",
    ctaTo: "/user/register",
    ctaClass: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
  },
  {
    name: "Offline IELTS Course",
    price: "৳1,000",
    period: "full course",
    highlight: true,
    badge: "Most Popular",
    desc: "Face-to-face classroom instruction at our Dhaka center with expert tutors and on-site exams.",
    features: [
      "In-person classroom sessions",
      "Printed workbooks & materials",
      "4 on-site mock exams",
      "Direct tutor access & feedback",
      "Peer study group access",
      "Center library access (3 months)",
      "On-site exam registration help",
      "Certificate of completion",
    ],
    cta: "Visit Our Center",
    ctaTo: "/about#center",
    ctaClass: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    name: "Mock Test Only",
    price: "৳350",
    period: "per mock test",
    highlight: false,
    badge: "Flexible",
    desc: "Purchase individual full-length IELTS mock tests without enrolling in a full course.",
    features: [
      "One complete IELTS mock test",
      "All 4 sections (L / R / W / S)",
      "Timed exam conditions",
      "Instant score estimate",
      "Detailed answer explanations",
      "Comparative performance report",
      "Retake discounts available",
    ],
    cta: "Buy a Mock Test",
    ctaTo: "/user/register",
    ctaClass: "border-2 border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-600",
  },
];

const addOns = [
  { name: "Speaking Practice Session",   price: "৳200 / session" },
  { name: "Essay Correction (Writing)",   price: "৳150 / essay"   },
  { name: "1-on-1 Tutor Consultation",   price: "৳400 / hour"    },
  { name: "Extended Materials Bundle",   price: "৳300"            },
];

const faqs = [
  { q: "Is the course price truly ৳1,000 with no hidden fees?",  a: "Yes. The ৳1,000 course fee covers everything listed in the plan — no hidden charges. The only optional extras are the add-on services listed separately." },
  { q: "Can I pay in installments?",                              a: "Absolutely. We accept Tabby and Tabby Tamara for interest-free installment payments. Split your ৳1,000 into up to 4 equal payments of ৳250 per month." },
  { q: "What payment methods do you accept?",                      a: "We accept PayPal, Visa, Mastercard, Debit Cards, Credit Cards, Tabby, and Tabby Tamara." },
  { q: "Is there a refund policy?",                                a: "Yes. If you paid via electronic means (card, PayPal, Tabby, etc.), you are entitled to a full refund within 24 hours of your transaction. See our Terms & Conditions for details." },
  { q: "Can I switch between online and offline?",                 a: "Yes. Contact our support team to switch modes at no extra charge." },
  { q: "Are group discounts available?",                           a: "Yes. Groups of 5 or more students receive a 10% discount. Contact us to arrange group enrollment." },
];

const Pricing = () => {
  return (
    <div className="bg-white text-slate-800">

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-white pb-20 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Transparent Pricing</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Simple, Affordable IELTS Prep
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            World-class IELTS coaching at just <strong className="text-indigo-600">৳1,000</strong>. No upsells, no surprises.
            Pay in full or split it via <strong>Tabby</strong> — your choice.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border-2 p-8 transition-all ${
                  plan.highlight
                    ? "border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-100"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow">
                    ⭐ Most Popular
                  </div>
                )}
                {plan.badge && !plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-bold text-slate-600 shadow">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-2 text-sm font-bold text-indigo-600">{plan.name}</div>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-400">/ {plan.period}</span>
                </div>
                <p className="mb-7 text-sm leading-7 text-slate-500">{plan.desc}</p>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaTo}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${plan.ctaClass}`}
                >
                  {plan.cta} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabby callout */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-700 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                <Zap size={14} /> Buy Now, Pay Later
              </div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Pay with Tabby or Tabby Tamara
              </h2>
              <p className="mt-3 text-purple-100 leading-7">
                Split your course fee into <strong className="text-white">4 interest-free monthly installments</strong> of just{" "}
                <strong className="text-white">৳250</strong> each. Available for all courses and mock test packages.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Month 1", amount: "৳250", sub: "First installment" },
                { label: "Month 2", amount: "৳250", sub: "Auto-deducted"    },
                { label: "Month 3", amount: "৳250", sub: "Auto-deducted"    },
                { label: "Month 4", amount: "৳250", sub: "Final payment"    },
              ].map(({ label, amount, sub }) => (
                <div key={label} className="rounded-2xl bg-white/15 p-4 text-white">
                  <div className="text-xs font-semibold text-purple-200">{label}</div>
                  <div className="text-xl font-black">{amount}</div>
                  <div className="text-[10px] text-purple-300">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">Optional Extras</p>
            <h2 className="text-2xl font-black text-slate-900">Add-On Services</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {addOns.map(({ name, price }) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-indigo-500" />
                  <span className="text-sm font-semibold text-slate-700">{name}</span>
                </div>
                <span className="text-sm font-black text-indigo-600">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Pricing FAQ</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Common Pricing Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-800 text-sm">
                  {q}
                  <ChevronRight size={18} className="shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-500">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center text-sm text-slate-500">
            Still have questions?{" "}
            <Link to="/contact" className="font-semibold text-indigo-600 hover:underline">
              Contact our team →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Start for just ৳1,000 today.</h2>
          <p className="mt-4 text-indigo-100">Or split it with Tabby — 4 payments of ৳250. Zero interest. Zero hassle.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/user/register" className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors shadow">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/terms-and-conditions#refund" className="rounded-2xl border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors">
              View Refund Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

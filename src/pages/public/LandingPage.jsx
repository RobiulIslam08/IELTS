import { Link } from "react-router-dom";
import {
  ArrowRight, Award, BookOpen, BriefcaseBusiness, Building2,
  CheckCircle2, Clock, CreditCard, Globe2, GraduationCap,
  Headphones, MapPin, Mic, Plane, PenLine, Star, TrendingUp,
  Users, Wallet, ChevronRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const destinations = [
  { name: "USA",       x: "12%", y: "36%", delay: "0s"   },
  { name: "Canada",   x: "18%", y: "22%", delay: "0.4s"  },
  { name: "UK",       x: "43%", y: "24%", delay: "0.8s"  },
  { name: "Germany",  x: "49%", y: "30%", delay: "1.1s"  },
  { name: "UAE",      x: "57%", y: "46%", delay: "1.4s"  },
  { name: "Australia",x: "79%", y: "68%", delay: "1.7s"  },
  { name: "Japan",    x: "82%", y: "34%", delay: "2s"    },
];

const stats = [
  { value: "15,000+", label: "Students Enrolled", icon: Users      },
  { value: "98%",     label: "Success Rate",       icon: TrendingUp },
  { value: "50+",     label: "Countries Reached",  icon: Globe2     },
  { value: "Band 9",  label: "Target Score",       icon: Award      },
];

const steps = [
  { step: "01", title: "Register & Choose a Course", desc: "Sign up online or visit our center. Pick Online or Offline classes. Pay just ৳1,000." },
  { step: "02", title: "Study with Expert Tutors",   desc: "Attend live sessions, access recordings, and practice with our full-length mock tests." },
  { step: "03", title: "Achieve & Go Global",         desc: "Earn your target band score and open doors to universities, visas, and careers worldwide." },
];

const courses = [
  {
    title: "Online IELTS Course",
    price: "৳1,000",
    badge: "Most Popular",
    badgeClass: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    Icon: Globe2,
    desc: "Live & recorded classes via Zoom / Google Meet with certified IELTS trainers. Study from anywhere in Bangladesh.",
    features: [
      "Live interactive classes via Zoom",
      "Recorded session replays (lifetime access)",
      "Digital study materials & PDFs",
      "Full-length online mock tests",
      "Dedicated WhatsApp support group",
      "1-on-1 doubt-clearing sessions",
    ],
    cta: "Enroll Online",
    cardClass: "border-indigo-200 hover:border-indigo-400",
    ctaClass: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    title: "Offline IELTS Course",
    price: "৳1,000",
    badge: "Center-Based",
    badgeClass: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    Icon: Building2,
    desc: "In-person classroom sessions at our Dhaka coaching center. Direct face-to-face interaction with expert instructors.",
    features: [
      "Face-to-face classroom instruction",
      "Printed study materials & workbooks",
      "On-site full practice exams",
      "Peer study group environment",
      "Access to center library resources",
      "On-site exam registration support",
    ],
    cta: "Visit Our Center",
    cardClass: "border-emerald-200 hover:border-emerald-400",
    ctaClass: "bg-emerald-600 hover:bg-emerald-700",
  },
];

const mockFeatures = [
  { Icon: Headphones, title: "Listening",  desc: "4 sections, 40 questions with authentic audio recordings timed to IELTS standards." },
  { Icon: BookOpen,   title: "Reading",    desc: "Academic & General Training passages with comprehension, matching, and gap-fill tasks." },
  { Icon: PenLine,    title: "Writing",    desc: "Task 1 & Task 2 with model-answer comparisons and structured feedback." },
  { Icon: Mic,        title: "Speaking",   desc: "Timed prompts across 3 parts, mirroring the real IELTS speaking examiner format." },
];

const testimonials = [
  { name: "Tasnim Rahman",   avatar: "TR", score: "Band 8.0", country: "🇦🇺 Australia",       text: "Band9Test's mock exams felt exactly like the real IELTS. Six weeks of practice and I achieved 8.0 on my first attempt! The online course is phenomenal." },
  { name: "Md. Faisal Islam", avatar: "MF", score: "Band 7.5", country: "🇬🇧 United Kingdom", text: "The offline classes at the center gave me the confidence I needed. The instructors are world-class. I highly recommend Band9Test to every serious student." },
  { name: "Sadia Akter",     avatar: "SA", score: "Band 7.0", country: "🇨🇦 Canada",          text: "I paid via Tabby in installments — so convenient! The course is affordable and the mock tests showed me exactly where I needed to improve. Brilliant platform." },
];

const faqs = [
  { q: "Can I take both online and offline classes?",        a: "Yes! You may switch between online and offline modes at any time by notifying our support team. Both options cost ৳1,000." },
  { q: "How long do I get access to the course materials?",  a: "Online students retain lifetime access to recordings and PDFs. Offline students may revisit the center library for 3 months after course completion." },
  { q: "Is the mock test the same difficulty as real IELTS?", a: "Absolutely. Our mock tests are designed by certified IELTS trainers to mirror the exact format, difficulty level, and timing of official Cambridge IELTS exams." },
  { q: "Can I pay in installments via Tabby?",               a: "Yes! We officially support Tabby and Tabby Tamara for both course fees and mock test fees. Split your payment into up to 4 interest-free installments." },
  { q: "What is the refund policy?",                          a: "If you paid via electronic methods (Tabby, PayPal, card, etc.), you are entitled to a full refund within 24 hours of your transaction. See our Terms & Conditions for details." },
];

/* ─── Component ─────────────────────────────────────────── */
const LandingPage = () => {
  return (
    <div className="bg-white text-slate-800">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-white pb-24 pt-16 sm:pt-20 lg:pt-28">
        {/* Subtle dot-grid background */}
        <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left — Copy */}
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-700 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                Bangladesh&apos;s #1 IELTS Platform
              </div>

              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Master IELTS.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 bg-clip-text text-transparent">
                  Unlock the World.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">
                From focused exam preparation in our classrooms to landing
                university offers, visas, and international careers — your
                global journey starts right here.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  to="/user/register"
                  className="hero-cta-primary flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl hover:shadow-indigo-300/60"
                >
                  Start Preparing Free <ArrowRight size={16} />
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  View Pricing
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-slate-500 lg:justify-start">
                {["No credit card required", "Cancel anytime", "24/7 support"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-500" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Animated visual stack */}
            <div className="relative mx-auto h-[500px] w-full max-w-lg">

              {/* Central world-map card */}
              <div className="absolute inset-x-6 bottom-12 top-20 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-100/60">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-sky-50/40 to-white" />
                <div className="relative flex h-full flex-col p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Globe2 size={14} className="text-indigo-500" />
                      Global Destinations Unlocked
                    </span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      50+ countries
                    </span>
                  </div>

                  {/* World map dot area */}
                  <div className="relative flex-1 overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-sky-100/60 to-indigo-100/40">
                    {/* Dotted world-map texture */}
                    <div className="hero-world-dots absolute inset-0 opacity-25" aria-hidden="true" />

                    {/* Country pins */}
                    {destinations.map((d) => (
                      <div
                        key={d.name}
                        className="hero-pin absolute flex flex-col items-center"
                        style={{ left: d.x, top: d.y, animationDelay: d.delay }}
                      >
                        <div className="hero-ping-ring absolute h-4 w-4 rounded-full border-2 border-indigo-500 opacity-70" />
                        <div className="relative h-2.5 w-2.5 rounded-full bg-indigo-600 shadow" />
                        <span className="mt-0.5 rounded bg-white/90 px-1 py-0.5 text-[8px] font-bold text-slate-700 shadow-sm">
                          {d.name}
                        </span>
                      </div>
                    ))}

                    {/* Animated plane */}
                    <div className="hero-plane-fly absolute">
                      <Plane size={16} className="text-indigo-600 drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Country tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["🇦🇺 Australia", "🇬🇧 UK", "🇨🇦 Canada", "🇩🇪 Germany", "🇦🇪 UAE", "🇯🇵 Japan"].map((c) => (
                      <span key={c} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-semibold text-slate-600 shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating card — study progress (top-left) */}
              <div className="hero-float-a absolute -left-2 top-4 w-48 rounded-2xl border border-indigo-100 bg-white p-4 shadow-xl sm:w-56">
                <div className="mb-2.5 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100">
                    <BookOpen size={15} className="text-indigo-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Study Progress</span>
                </div>
                {[{ label: "Reading", pct: 82 }, { label: "Writing", pct: 74 }, { label: "Listening", pct: 90 }].map((p) => (
                  <div key={p.label} className="mb-1.5">
                    <div className="mb-0.5 flex justify-between text-[9px] text-slate-500">
                      <span>{p.label}</span><span className="font-semibold">{p.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-400"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating card — band score achieved (bottom-right) */}
              <div className="hero-float-b absolute -right-2 bottom-6 w-40 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl sm:w-48">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Award size={15} className="text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700">Band Score</span>
                </div>
                <div className="text-4xl font-black leading-none text-emerald-600">8.5</div>
                <div className="mt-1 text-[9px] font-semibold text-slate-500">Overall Achieved 🎉</div>
                <div className="mt-2 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Floating card — destination offer (top-right) */}
              <div className="hero-float-c absolute -right-0 top-6 w-36 rounded-2xl border border-sky-100 bg-white p-3.5 shadow-lg">
                <div className="mb-1 flex items-center gap-1.5">
                  <Plane size={13} className="text-sky-600" />
                  <span className="text-[10px] font-bold text-slate-700">Offer Received!</span>
                </div>
                <div className="text-sm font-black text-slate-800">🇬🇧 London</div>
                <div className="mt-0.5 text-[9px] text-slate-500">University of London</div>
                <div className="mt-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                  ✓ Visa Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="border-y border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                  <Icon size={24} className="text-indigo-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">{value}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Simple 3-Step Process</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              From Registration to Global Success
            </h2>
            <p className="mt-4 text-slate-500">Everything you need to achieve your target IELTS band score and unlock international opportunities.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 text-5xl font-black text-indigo-100">{step}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-800">{title}</h3>
                <p className="text-sm leading-7 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COURSES ══════════════ */}
      <section id="courses" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Courses & Pricing</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Online &amp; Offline IELTS Classes
            </h2>
            <p className="mt-4 text-slate-500">
              Both courses cost just <strong className="text-indigo-600">৳1,000</strong>. Choose what works for your lifestyle.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {courses.map((c) => (
              <div
                key={c.title}
                className={`relative rounded-3xl border-2 bg-white p-8 shadow-sm transition-all hover:shadow-lg ${c.cardClass}`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.iconBg}`}>
                    <c.Icon size={26} className={c.iconColor} />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${c.badgeClass}`}>{c.badge}</span>
                </div>
                <h3 className="mb-1 text-xl font-black text-slate-800">{c.title}</h3>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{c.price}</span>
                  <span className="text-sm text-slate-400">/ course</span>
                </div>
                <p className="mb-6 text-sm leading-7 text-slate-500">{c.desc}</p>
                <ul className="mb-7 space-y-2.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/user/register"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-colors ${c.ctaClass}`}
                >
                  {c.cta} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Payments accepted via PayPal, Visa, Mastercard, Debit/Credit Card, Tabby &amp; Tabby Tamara.
            <Link to="/pricing" className="ml-1 font-semibold text-indigo-600 hover:underline">
              View full pricing →
            </Link>
          </p>
        </div>
      </section>

      {/* ══════════════ MOCK TESTS ══════════════ */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center text-white">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-200">Practice Like the Real Thing</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Full-Length IELTS Mock Tests</h2>
            <p className="mt-4 text-indigo-100">
              Our mock tests simulate the exact conditions of the official IELTS exam — same timing, same format, same difficulty.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockFeatures.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-6 text-indigo-100">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/user/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:shadow-xl hover:bg-indigo-50"
            >
              Take a Free Mock Test <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ PHYSICAL CENTER ══════════════ */}
      <section id="center" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 to-sky-100 shadow-xl" style={{ minHeight: 380 }}>
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                alt="Band9Test coaching center classroom"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={18} className="text-indigo-600" />
                  <span className="font-bold text-slate-800">Band9Test Physical Center</span>
                </div>
                <p className="text-xs text-slate-500">Mirpur, Dhaka — Open 7 days a week</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Visit Us In Person</p>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Our Physical Coaching Center
              </h2>
              <p className="mb-6 text-slate-500 leading-7">
                We operate a fully equipped, modern IELTS coaching center in Dhaka. Students can walk in without an appointment to register, meet tutors, and even take their practice exams on-site.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: GraduationCap, title: "Walk-In Registration",  desc: "Visit us any day and complete your registration in person. No appointment needed." },
                  { icon: BookOpen,      title: "On-Site Exam Sessions", desc: "Take your full IELTS mock exams under realistic exam-room conditions at our center." },
                  { icon: Users,         title: "Expert Tutors On-Site",  desc: "Meet and speak directly with our certified IELTS trainers for personalized guidance." },
                  { icon: Clock,         title: "Flexible Hours",         desc: "We are open 7 days a week, morning through evening, to fit your busy schedule." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <Icon size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{title}</p>
                      <p className="text-sm text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about#center"
                className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Get directions to our center <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PAYMENT METHODS ══════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Secure & Flexible Payments</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Pay Your Way
            </h2>
            <p className="mt-4 text-slate-500">
              We accept all major payment methods. Need to spread the cost? Use <strong>Tabby</strong> or <strong>Tabby Tamara</strong> for interest-free installments.
            </p>
          </div>

          {/* Tabby spotlight */}
          <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-purple-700 p-8 text-white shadow-xl lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                  ⚡ Buy Now, Pay Later
                </div>
                <h3 className="mb-3 text-2xl font-black sm:text-3xl">Pay with Tabby &amp; Tabby Tamara</h3>
                <p className="mb-6 text-purple-100 leading-7">
                  Split your course fee (৳1,000) or mock test fee into <strong className="text-white">4 interest-free installments</strong>.
                  No hidden charges. No credit score checks. Just flexible, student-friendly payment.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Pay ৳250 today", "৳250 after 1 month", "৳250 after 2 months", "৳250 after 3 months"].map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-semibold">
                      <CheckCircle2 size={13} className="text-green-300" /> {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/user/register"
                    className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-purple-700 hover:bg-purple-50 transition-colors shadow"
                  >
                    Enroll with Tabby
                  </Link>
                  <Link
                    to="/terms-and-conditions#refund"
                    className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    View Refund Policy
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Tabby",        sub: "4 installments",    color: "bg-white/20" },
                  { name: "Tabby Tamara", sub: "Flexible schedule",  color: "bg-white/15" },
                  { name: "Pay in Full",  sub: "One-time payment",   color: "bg-white/15" },
                  { name: "0% Interest",  sub: "Always",             color: "bg-white/20" },
                ].map((item) => (
                  <div key={item.name} className={`${item.color} rounded-2xl p-4`}>
                    <div className="mb-1 text-sm font-bold text-white">{item.name}</div>
                    <div className="text-xs text-purple-200">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Standard payment methods */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "PayPal",      icon: "🌐", desc: "International",   color: "border-blue-200 bg-blue-50"   },
              { name: "Visa",        icon: "💳", desc: "Debit & Credit",  color: "border-sky-200 bg-sky-50"     },
              { name: "Mastercard",  icon: "💳", desc: "Debit & Credit",  color: "border-red-200 bg-red-50"     },
              { name: "Debit Card",  icon: "🏦", desc: "All local banks", color: "border-slate-200 bg-slate-50" },
              { name: "Credit Card", icon: "💳", desc: "All networks",    color: "border-green-200 bg-green-50" },
            ].map(({ name, icon, desc, color }) => (
              <div key={name} className={`flex flex-col items-center justify-center rounded-2xl border-2 p-5 text-center transition-shadow hover:shadow-md ${color}`}>
                <span className="mb-2 text-3xl">{icon}</span>
                <span className="font-bold text-slate-800 text-sm">{name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Wallet size={16} className="text-indigo-500" />
            All transactions are secured with 256-bit SSL encryption.
            <Link to="/terms-and-conditions" className="font-semibold text-indigo-600 hover:underline">Refund policy →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Student Success Stories</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Real Students. Real Results.
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {testimonials.map(({ name, avatar, score, country, text }) => (
              <div key={name} className="relative rounded-3xl border border-slate-100 bg-slate-50 p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-7 text-slate-600 italic">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{name}</div>
                    <div className="text-[11px] text-slate-500">{score} · {country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">FAQ</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-800 text-sm list-none">
                  {q}
                  <ChevronRight size={18} className="shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-500">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Your Band 9 journey starts today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Join over 15,000 students who have used Band9Test to prepare for IELTS and open global doors. Register free in under 2 minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/user/register"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-indigo-200">
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link to="/policy" className="hover:text-white transition-colors">Our Policy</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

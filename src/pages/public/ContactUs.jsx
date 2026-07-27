import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const contactInfo = [
  { icon: MapPin,    label: "Address",       value: "Mirpur-1, Dhaka-1216, Bangladesh" },
  { icon: Phone,     label: "Phone",         value: "+880 1700-000000" },
  { icon: Mail,      label: "Email",         value: "support@band9test.com" },
  { icon: Clock,     label: "Center Hours",  value: "Sat–Thu 8am–9pm · Fri 2pm–9pm" },
];

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — wire to backend when ready
    setSent(true);
  };

  return (
    <div className="bg-white text-slate-800">

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-white pb-20 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Get in Touch</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Have a question about our courses, payments, or mock tests? We&apos;re here to help — online or at our center.
          </p>
        </div>
      </section>

      {/* Grid: form + info */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Contact Form */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-black text-slate-900">Send Us a Message</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={52} className="mb-4 text-emerald-500" />
                  <h3 className="text-xl font-black text-slate-800">Message Sent!</h3>
                  <p className="mt-2 text-slate-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="">Select a subject…</option>
                      <option value="enrollment">Course Enrollment</option>
                      <option value="payment">Payment / Tabby Query</option>
                      <option value="refund">Refund Request</option>
                      <option value="mocktest">Mock Test Support</option>
                      <option value="center">Physical Center Visit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help you…"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + Map */}
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-black text-slate-900">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                        <Icon size={19} className="text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div>
                        <div className="mt-0.5 text-sm font-semibold text-slate-700">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical center CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                  <Building2 size={26} className="text-white" />
                </div>
                <h3 className="mb-2 text-xl font-black">Visit Our Center</h3>
                <p className="mb-5 text-sm leading-7 text-indigo-100">
                  Students are welcome to walk in directly during center hours. Complete your registration in person and speak with our tutors face-to-face.
                </p>
                <Link
                  to="/about#center"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Get Directions →
                </Link>
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm" style={{ minHeight: 220 }}>
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80"
                  alt="Band9Test center location"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="border-t border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-4 text-sm text-slate-500">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: "/terms-and-conditions#refund", label: "Refund Policy"    },
              { to: "/policy",                       label: "Privacy Policy"   },
              { to: "/pricing",                      label: "Course Pricing"   },
              { to: "/user/register",                label: "Register Now"     },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

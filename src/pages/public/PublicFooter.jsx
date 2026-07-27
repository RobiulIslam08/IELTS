import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = {
  platform: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact Us" },
  ],
  legal: [
    { to: "/terms-and-conditions", label: "Terms & Conditions" },
    { to: "/policy", label: "Our Policy" },
    { to: "/policy#privacy", label: "Privacy Policy" },
    { to: "/policy#cookies", label: "Cookie Policy" },
    { to: "/policy#refund", label: "Refund Policy" },
  ],
  resources: [
    { to: "/user/register", label: "Free Registration" },
    { to: "/user/login", label: "Student Login" },
    { to: "/pricing", label: "Mock Test Packages" },
    { to: "/about#center", label: "Visit Our Center" },
  ],
};

const socials = [
  { Icon: FaFacebook, href: "#", label: "Facebook" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
];

const PublicFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column – spans 2 cols on large */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="text-lg font-black text-white">
                Band<span className="text-indigo-400">9</span>Test
                <span className="text-slate-400 font-normal">.com</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-slate-400">
              Bangladesh&apos;s premier IELTS preparation platform. Expert-led online
              &amp; offline courses, full mock tests, and a physical coaching center
              dedicated to getting you to Band 9.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            {/* Contact snippet */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-indigo-400" />
                <span>Mirpur, Dhaka-1216, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={15} className="shrink-0 text-indigo-400" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={15} className="shrink-0 text-indigo-400" />
                <span>support@band9test.com</span>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 transition-colors hover:text-indigo-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-400 transition-colors hover:text-indigo-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-400 transition-colors hover:text-indigo-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accepted payments badge row */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-800/50 px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {["PayPal", "Visa", "Mastercard", "Debit Card", "Credit Card", "Tabby", "Tabby Tamara"].map((m) => (
              <span
                key={m}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {year} Band9Test.com — All rights reserved. Operated from Dhaka, Bangladesh.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <Link to="/terms-and-conditions" className="transition-colors hover:text-indigo-300">
              Terms
            </Link>
            <Link to="/policy" className="transition-colors hover:text-indigo-300">
              Policy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-indigo-300">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

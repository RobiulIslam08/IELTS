import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact Us" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/policy", label: "Our Policy" },
];

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-200">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div className="leading-none">
            <span className="text-[17px] font-black tracking-tight text-slate-800">
              Band<span className="text-indigo-600">9</span>Test
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              .com
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/user/login"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            Sign In
          </Link>
          <Link
            to="/user/register"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200/50 transition-all hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:shadow-indigo-300/50"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="space-y-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
            <Link
              to="/user/login"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              to="/user/register"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-center text-sm font-bold text-white shadow-md shadow-indigo-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;

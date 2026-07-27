import { Link } from "react-router-dom";
import {
  Award, BookOpen, Building2, CheckCircle2, Clock,
  GraduationCap, Globe2, Heart, MapPin, Phone, Mail,
  Star, Target, TrendingUp, Users,
} from "lucide-react";

const values = [
  { icon: Target,      title: "Excellence",     desc: "We hold ourselves to the highest standards — both in teaching quality and student outcomes." },
  { icon: Heart,       title: "Student-First",   desc: "Every decision we make is guided by what best serves our students' long-term success." },
  { icon: Globe2,      title: "Global Mindset",  desc: "We prepare students not just for an exam, but for life on the world stage." },
  { icon: TrendingUp,  title: "Continuous Improvement", desc: "We regularly update our materials and methods to match the latest IELTS test formats." },
];

const team = [
  { name: "Md. Shahriar Hasan",  role: "Founder & Head IELTS Trainer",    score: "Band 9.0", avatar: "SH" },
  { name: "Nusrat Jahan",         role: "Senior Speaking & Writing Coach",  score: "Band 8.5", avatar: "NJ" },
  { name: "Tanvir Ahmed",          role: "Listening & Reading Specialist",   score: "Band 8.0", avatar: "TA" },
  { name: "Fatema Begum",          role: "Student Support & Operations",     score: "",          avatar: "FB" },
];

const milestones = [
  { year: "2019", event: "Founded Band9Test.com with a vision to make IELTS success accessible to every Bangladeshi student." },
  { year: "2020", event: "Launched our first online course. 200 students enrolled in the first month." },
  { year: "2021", event: "Opened our physical coaching center in Mirpur, Dhaka. Introduced full mock test sessions." },
  { year: "2022", event: "Partnered with Tabby for installment-based payments, making courses even more affordable." },
  { year: "2023", event: "Crossed 10,000 students enrolled. 94% reported achieving their target band score." },
  { year: "2024", event: "Expanded to 4 new course formats. Launched our comprehensive digital mock test platform." },
  { year: "2025", event: "15,000+ students enrolled. Students achieving IELTS success in 50+ destination countries." },
];

const AboutUs = () => {
  return (
    <div className="bg-white text-slate-800">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-white pb-20 pt-16 sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">About Us</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            We Turn IELTS Aspirations
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Into Global Realities
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Band9Test.com was born from a simple belief: every student in Bangladesh deserves world-class IELTS
            preparation that is affordable, accessible, and actually effective.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl bg-indigo-600 p-10 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <Target size={26} className="text-white" />
              </div>
              <h2 className="mb-4 text-2xl font-black">Our Mission</h2>
              <p className="leading-8 text-indigo-100">
                To provide the most comprehensive, affordable, and results-driven IELTS preparation available
                in Bangladesh — through both online and offline channels — so that every student can achieve
                the band score they need to pursue their global ambitions.
              </p>
            </div>
            <div className="rounded-3xl border-2 border-indigo-100 bg-indigo-50 p-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600">
                <Globe2 size={26} className="text-white" />
              </div>
              <h2 className="mb-4 text-2xl font-black text-slate-900">Our Vision</h2>
              <p className="leading-8 text-slate-600">
                To become the leading IELTS preparation platform in South Asia — where students from all
                backgrounds can walk through our doors, or log into our platform, and emerge ready to
                confidently take on the world stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { val: "15,000+", label: "Students Enrolled", icon: Users     },
              { val: "98%",     label: "Success Rate",       icon: TrendingUp},
              { val: "6+",      label: "Years of Excellence",icon: Award    },
              { val: "50+",     label: "Countries",          icon: Globe2   },
            ].map(({ val, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                  <Icon size={24} className="text-indigo-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">{val}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Our Journey</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">The Band9Test Story</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100 sm:left-1/2 sm:-translate-x-px" />
            <div className="space-y-10">
              {milestones.map(({ year, event }, i) => (
                <div key={year} className={`relative flex items-start gap-6 sm:gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-indigo-600 bg-white font-black text-xs text-indigo-600 shadow sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    {year.slice(-2)}
                  </div>
                  <div className={`ml-6 flex-1 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"}`}>
                    <div className="mb-1 text-xs font-bold text-indigo-600">{year}</div>
                    <p className="text-sm leading-7 text-slate-600">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">What We Stand For</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
                  <Icon size={22} className="text-indigo-600" />
                </div>
                <h3 className="mb-2 font-bold text-slate-800">{title}</h3>
                <p className="text-sm leading-7 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Expert Educators</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-slate-500">Each instructor is a certified IELTS professional with a proven track record of student success.</p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(({ name, role, score, avatar }) => (
              <div key={name} className="rounded-3xl border border-slate-100 bg-slate-50 p-7 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-xl font-black text-white shadow-lg shadow-indigo-200">
                  {avatar}
                </div>
                <h3 className="font-bold text-slate-800">{name}</h3>
                <p className="mt-1 text-xs text-slate-500">{role}</p>
                {score && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    Achieved {score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Center */}
      <section id="center" className="bg-gradient-to-br from-indigo-50 to-sky-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">Visit Us In Person</p>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Our Physical Coaching Center</h2>
              <p className="mb-7 leading-8 text-slate-600">
                Our Dhaka center is a modern, air-conditioned facility equipped with exam-condition classrooms,
                a reference library, and on-site support staff. Students can visit directly to register,
                meet tutors, and sit their practice exams.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, text: "Mirpur-1, Dhaka-1216, Bangladesh" },
                  { Icon: Phone,  text: "+880 1700-000000" },
                  { Icon: Mail,   text: "support@band9test.com" },
                  { Icon: Clock,  text: "Open 7 days · Sat–Thu 8am–9pm · Fri 2pm–9pm" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                      <Icon size={16} className="text-indigo-600" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl" style={{ minHeight: 340 }}>
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                alt="Band9Test coaching center"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to start your journey?</h2>
          <p className="mt-4 text-indigo-100">Register online or visit our center today. Just ৳1,000 for a complete IELTS course.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/user/register" className="rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors shadow">
              Register Now
            </Link>
            <Link to="/contact" className="rounded-2xl border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

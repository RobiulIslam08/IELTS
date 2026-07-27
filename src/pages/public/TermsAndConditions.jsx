import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-24">
    <h2 className="mb-4 text-xl font-black text-slate-900 border-b border-slate-200 pb-3">{title}</h2>
    <div className="space-y-4 text-sm leading-8 text-slate-600">{children}</div>
  </section>
);

const Clause = ({ children }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="mt-1 shrink-0 text-indigo-400" />
    <p>{children}</p>
  </div>
);

const toc = [
  { id: "acceptance",       label: "1. Acceptance of Terms"              },
  { id: "description",      label: "2. Service Description"             },
  { id: "accounts",         label: "3. User Accounts & Registration"    },
  { id: "eligibility",      label: "4. Eligibility"                     },
  { id: "enrollment",       label: "5. Course Enrollment & Access"      },
  { id: "refund",            label: "6. Payment, Fees & Refund Policy"   },
  { id: "tabby",             label: "7. Tabby & Installment Payments"    },
  { id: "conduct",           label: "8. Code of Conduct"                 },
  { id: "ip",                label: "9. Intellectual Property"           },
  { id: "mocktest",          label: "10. Mock Test Rules"                },
  { id: "privacy",           label: "11. Privacy & Data"                 },
  { id: "disclaimer",        label: "12. Disclaimers & Liability"        },
  { id: "termination",       label: "13. Suspension & Termination"      },
  { id: "modifications",     label: "14. Modifications to Terms"         },
  { id: "governing",         label: "15. Governing Law"                  },
  { id: "contact",           label: "16. Contact Information"            },
];

const TermsAndConditions = () => {
  const effective = "1 January 2025";
  return (
    <div className="bg-white text-slate-800">

      {/* Page header */}
      <section className="bg-gradient-to-br from-indigo-50 to-sky-50 pb-16 pt-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-slate-500">
            <strong>Band9Test.com</strong> · Effective Date: <strong>{effective}</strong>
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Please read these Terms and Conditions carefully before using the Band9Test.com platform or enrolling
            in any of our courses. By accessing or using our services, you confirm that you have read, understood,
            and agree to be bound by these terms.
          </p>

          {/* 24-hour refund highlight box */}
          <div id="refund-highlight" className="mt-8 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <AlertCircle size={20} />
              <span className="font-black text-base">Important: Electronic Payment Refund Policy</span>
            </div>
            <p className="text-sm leading-7 text-emerald-800">
              <strong>If a student pays using any form of electronic money</strong> — including but not limited to
              PayPal, Visa, Mastercard, Debit Card, Credit Card, Tabby, or Tabby Tamara — <strong>they have the
              unconditional right to apply for a full refund within 24 hours of the transaction</strong>. No questions
              asked. No processing fee will be charged. Refund requests must be submitted via email to{" "}
              <a href="mailto:refunds@band9test.com" className="font-semibold underline">refunds@band9test.com</a>{" "}
              within the 24-hour window.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">Table of Contents</p>
              <nav className="space-y-1">
                {toc.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <article>

            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>
                By visiting, registering on, or using any part of the Band9Test.com website, mobile interface, or
                associated services (collectively, the &quot;Platform&quot;), you (&quot;User,&quot; &quot;Student,&quot; or &quot;you&quot;) agree
                to comply with and be legally bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to
                any part of these Terms, you must immediately discontinue use of the Platform.
              </p>
              <p>
                These Terms constitute a binding legal agreement between you and Band9Test.com (&quot;we,&quot; &quot;us,&quot; or
                &quot;Company&quot;), a IELTS preparation services business operating from Dhaka, Bangladesh.
              </p>
              <p>
                By clicking &quot;Register,&quot; &quot;Enroll,&quot; or &quot;Purchase,&quot; or by using the Platform in any manner, you confirm
                that you are of legal age to enter into binding agreements in your jurisdiction or have obtained
                parental/guardian consent.
              </p>
            </Section>

            <Section id="description" title="2. Service Description">
              <p>Band9Test.com provides:</p>
              <Clause>Online IELTS preparation courses delivered via live video sessions and recorded classes.</Clause>
              <Clause>Offline IELTS preparation courses conducted at our physical coaching center in Dhaka, Bangladesh.</Clause>
              <Clause>Full-length IELTS mock tests covering Listening, Reading, Writing, and Speaking modules.</Clause>
              <Clause>Study materials including PDF guides, workbooks, and digital resources.</Clause>
              <Clause>1-on-1 tutoring and supplementary coaching sessions (optional add-ons).</Clause>
              <Clause>Progress tracking, performance analytics, and score prediction tools.</Clause>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time
                without prior notice, though we will make reasonable efforts to inform enrolled students of
                material changes that affect their active course access.
              </p>
            </Section>

            <Section id="accounts" title="3. User Accounts & Registration">
              <p>
                To access premium content, enroll in courses, or take mock tests, you must create a Band9Test.com
                account. You agree to:
              </p>
              <Clause>Provide accurate, complete, and current information during registration.</Clause>
              <Clause>Maintain the confidentiality of your login credentials (username and password).</Clause>
              <Clause>Accept responsibility for all activity that occurs under your account.</Clause>
              <Clause>Notify us immediately if you suspect unauthorized access to your account.</Clause>
              <Clause>Not share your account credentials or allow third parties to use your account.</Clause>
              <p>
                We reserve the right to suspend or permanently close accounts that are found to be created
                fraudulently, that share login details, or that violate any provision of these Terms.
              </p>
            </Section>

            <Section id="eligibility" title="4. Eligibility">
              <p>
                The Band9Test.com Platform is open to all individuals who are preparing for or planning to take
                the IELTS (International English Language Testing System) examination. There is no minimum age
                requirement imposed by Band9Test.com; however, users under 18 years of age must obtain
                verifiable parental or guardian consent before enrolling in any paid course or making any payment.
              </p>
              <p>
                Students from all countries are welcome to use our online platform. Offline center access is
                available to students who can physically attend our Dhaka, Bangladesh location.
              </p>
            </Section>

            <Section id="enrollment" title="5. Course Enrollment & Access">
              <p>
                Upon successful payment and enrollment in a Band9Test.com course, you will receive access to
                the course content as described in the course details at the time of enrollment. Specific terms of access:
              </p>
              <Clause>Online course students receive lifetime access to recorded materials and digital resources.</Clause>
              <Clause>Live class schedules are set by Band9Test.com and may be updated with reasonable notice.</Clause>
              <Clause>Offline course students have center access during the active course duration and library access for 3 months post-completion.</Clause>
              <Clause>Mock tests purchased separately are accessible for 30 days from the date of purchase.</Clause>
              <Clause>Course access is strictly non-transferable. Sharing, selling, or lending access is prohibited.</Clause>
              <Clause>If technical issues prevent access, report them to our support team. We will credit lost time.</Clause>
              <p>
                Course content, schedules, and instructors may change due to operational needs. We commit to
                maintaining equivalent quality and notifying students of any significant changes.
              </p>
            </Section>

            <Section id="refund" title="6. Payment, Fees & Refund Policy">
              <h3 className="font-bold text-slate-800 mb-2">6.1 Course Fees</h3>
              <p>
                The current standard course fee is <strong>৳1,000 (one thousand Bangladeshi Taka)</strong> for
                both the Online IELTS Course and the Offline IELTS Course. Individual mock test fees are listed
                separately on the Pricing page. Fees are subject to change; any changes will be communicated
                at least 30 days in advance and will not affect already-paid enrollments.
              </p>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.2 Accepted Payment Methods</h3>
              <p>We accept the following payment methods:</p>
              <Clause>PayPal (international payments)</Clause>
              <Clause>Visa Debit and Credit Cards</Clause>
              <Clause>Mastercard Debit and Credit Cards</Clause>
              <Clause>Local Debit Cards (all major Bangladesh banks)</Clause>
              <Clause>Tabby — Buy Now, Pay Later in up to 4 installments</Clause>
              <Clause>Tabby Tamara — Flexible installment payment plan</Clause>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.3 Electronic Payment Refund Policy (24-Hour Guarantee)</h3>
              <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-5 my-3">
                <p className="font-bold text-emerald-800 text-base mb-2">
                  ✅ Full Refund Guarantee Within 24 Hours
                </p>
                <p className="text-emerald-800">
                  <strong>If a student pays using any form of electronic money</strong> — including PayPal, Visa,
                  Mastercard, Debit Card, Credit Card, Tabby, Tabby Tamara, or any other digital payment
                  instrument — <strong>they have the absolute right to apply for and receive a full refund within
                  24 hours of the transaction date and time</strong>.
                </p>
                <ul className="mt-3 space-y-1.5 text-emerald-800">
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> The refund will be processed to the original payment method within 3–7 business days.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> No reason is required. No questions will be asked.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> No processing or cancellation fee will be deducted.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> To request a refund, email <a href="mailto:refunds@band9test.com" className="font-semibold underline">refunds@band9test.com</a> with your transaction ID and the email address used at registration.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0" /> Refund requests submitted after 24 hours of the original transaction will not be eligible for a full refund under this policy.</li>
                </ul>
              </div>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.4 Refunds After 24 Hours</h3>
              <p>
                Refund requests submitted more than 24 hours after the transaction are evaluated on a case-by-case
                basis. We may offer a partial credit or course transfer at our discretion, especially in cases
                of documented medical emergencies, bereavement, or proven technical failures on our part.
              </p>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.5 Non-Refundable Situations</h3>
              <Clause>Students who have consumed more than 50% of course content are not eligible for refunds.</Clause>
              <Clause>Refunds will not be issued for dissatisfaction with band score outcomes.</Clause>
              <Clause>Mock tests that have been partially or fully attempted are non-refundable.</Clause>
            </Section>

            <Section id="tabby" title="7. Tabby & Installment Payment Terms">
              <p>
                Band9Test.com officially supports Tabby and Tabby Tamara as Buy Now, Pay Later (BNPL) payment
                options. When paying via Tabby or Tabby Tamara, the following additional terms apply:
              </p>
              <Clause>Your installment agreement is directly with Tabby / Tabby Tamara, not with Band9Test.com. You must comply with Tabby&apos;s own terms and conditions.</Clause>
              <Clause>Band9Test.com receives the full payment from Tabby at the time of enrollment. Your installment schedule is managed by Tabby.</Clause>
              <Clause>If you fail to make installment payments to Tabby, your course access may be suspended until the outstanding balance is resolved.</Clause>
              <Clause>The 24-hour electronic refund policy applies equally to Tabby payments. Refunds initiated within 24 hours will be coordinated between Band9Test.com and Tabby.</Clause>
              <Clause>Installment amounts, schedules, and late payment consequences are governed by Tabby&apos;s policies, not Band9Test.com.</Clause>
            </Section>

            <Section id="conduct" title="8. Code of Conduct">
              <p>All students and users of the Band9Test.com Platform agree to conduct themselves professionally and respectfully. You must not:</p>
              <Clause>Harass, intimidate, or disrespect instructors, staff, or other students.</Clause>
              <Clause>Engage in academic dishonesty, including sharing mock test questions or answers.</Clause>
              <Clause>Attempt to reverse-engineer, copy, scrape, or extract Platform content.</Clause>
              <Clause>Post or transmit any harmful, defamatory, abusive, or illegal content.</Clause>
              <Clause>Use automated tools (bots, scrapers) to access the Platform.</Clause>
              <Clause>Create multiple accounts to circumvent restrictions or obtain multiple trial periods.</Clause>
              <p>
                Violation of this code of conduct may result in immediate suspension or permanent termination
                of your account without refund, and may be reported to relevant authorities where applicable.
              </p>
            </Section>

            <Section id="ip" title="9. Intellectual Property">
              <p>
                All content on the Band9Test.com Platform — including but not limited to course videos,
                audio recordings, written materials, PDF guides, mock test questions, answer keys, graphic
                designs, logos, and software — is the exclusive intellectual property of Band9Test.com or
                its licensed content providers.
              </p>
              <Clause>You are granted a limited, non-exclusive, non-transferable license to access and use course content for personal IELTS preparation only.</Clause>
              <Clause>You may not reproduce, distribute, publicly display, sell, or create derivative works from any Platform content.</Clause>
              <Clause>Recording of live classes is strictly prohibited without explicit written consent from Band9Test.com.</Clause>
              <Clause>Any user-generated content (forum posts, feedback) you submit grants Band9Test.com a royalty-free license to use for Platform improvement.</Clause>
            </Section>

            <Section id="mocktest" title="10. Mock Test Rules">
              <p>
                Band9Test.com mock tests are designed to simulate official IELTS examination conditions.
                By taking a mock test, you agree to:
              </p>
              <Clause>Complete each section within the allotted time without the use of unauthorized aids.</Clause>
              <Clause>Not share, screenshot, publish, or distribute test questions or answers in any format.</Clause>
              <Clause>Not allow others to complete a mock test on your behalf.</Clause>
              <Clause>Understand that mock test scores are estimates and not official IELTS scores. Band9Test.com does not guarantee correlation with actual IELTS exam results.</Clause>
            </Section>

            <Section id="privacy" title="11. Privacy & Data">
              <p>
                Your use of the Platform is subject to our{" "}
                <Link to="/policy" className="font-semibold text-indigo-600 hover:underline">Privacy & Policy</Link>{" "}
                page, which is incorporated into these Terms by reference. By using the Platform, you consent
                to the collection and use of your personal data as described in that policy. Key points:
              </p>
              <Clause>We collect only the personal data necessary to deliver our educational services.</Clause>
              <Clause>We do not sell your personal data to third parties.</Clause>
              <Clause>Payment data is processed by PCI-DSS compliant third-party processors. We do not store card details.</Clause>
              <Clause>You have the right to request access to, correction of, or deletion of your personal data at any time.</Clause>
            </Section>

            <Section id="disclaimer" title="12. Disclaimers & Limitation of Liability">
              <p>
                Band9Test.com provides its services on an &quot;as-is&quot; and &quot;as available&quot; basis. We make no
                warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose
                of any content on the Platform.
              </p>
              <p>
                We do not guarantee that use of our courses or mock tests will result in a specific IELTS
                band score. Results depend on individual effort, prior language ability, and many other factors
                beyond our control.
              </p>
              <p>
                To the maximum extent permitted by applicable law, Band9Test.com shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not limited to
                loss of profits, data, or goodwill arising from your use of, or inability to use, the Platform.
              </p>
              <p>
                Our total liability to you for any claim arising from these Terms or your use of the Platform
                shall not exceed the amount you paid to Band9Test.com in the 3 months preceding the claim.
              </p>
            </Section>

            <Section id="termination" title="13. Suspension & Termination">
              <p>
                Band9Test.com reserves the right to suspend or permanently terminate your account and access
                to all Platform services, with or without notice, if we determine that you have:
              </p>
              <Clause>Violated any provision of these Terms and Conditions.</Clause>
              <Clause>Provided false or fraudulent information during registration or payment.</Clause>
              <Clause>Engaged in conduct that is harmful to other students, staff, or the reputation of Band9Test.com.</Clause>
              <Clause>Initiated fraudulent chargebacks or payment disputes.</Clause>
              <p>
                Upon termination, your license to access Platform content immediately ceases. Refunds in
                termination cases will be subject to clause 6.5 (Non-Refundable Situations) unless termination
                was caused by an error on Band9Test.com&apos;s part.
              </p>
            </Section>

            <Section id="modifications" title="14. Modifications to Terms">
              <p>
                Band9Test.com reserves the right to modify these Terms and Conditions at any time. When changes
                are made, we will update the &quot;Effective Date&quot; at the top of this page and make reasonable efforts
                to notify registered users via email or in-platform notification.
              </p>
              <p>
                Your continued use of the Platform after any modification constitutes your acceptance of the
                revised Terms. If you do not agree with updated Terms, you must stop using the Platform and
                contact us to close your account.
              </p>
            </Section>

            <Section id="governing" title="15. Governing Law & Dispute Resolution">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                People&apos;s Republic of Bangladesh. Any disputes arising from or relating to these Terms
                or your use of Band9Test.com shall be submitted to the exclusive jurisdiction of the
                competent courts located in Dhaka, Bangladesh.
              </p>
              <p>
                Before initiating formal legal proceedings, both parties agree to attempt to resolve
                disputes amicably through direct communication and good-faith negotiation for a period
                of at least 30 days.
              </p>
            </Section>

            <Section id="contact" title="16. Contact Information">
              <p>If you have questions about these Terms and Conditions, please contact us:</p>
              <Clause>Email: <a href="mailto:legal@band9test.com" className="font-semibold text-indigo-600 hover:underline">legal@band9test.com</a></Clause>
              <Clause>Refund requests: <a href="mailto:refunds@band9test.com" className="font-semibold text-indigo-600 hover:underline">refunds@band9test.com</a></Clause>
              <Clause>General support: <a href="mailto:support@band9test.com" className="font-semibold text-indigo-600 hover:underline">support@band9test.com</a></Clause>
              <Clause>Address: Mirpur-1, Dhaka-1216, Bangladesh</Clause>
              <Clause>Phone: +880 1700-000000</Clause>
            </Section>

            <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-6 text-sm text-slate-500">
              <strong>Effective Date:</strong> {effective}. These Terms supersede all prior versions.
              See also: <Link to="/policy" className="font-semibold text-indigo-600 hover:underline">Our Policy</Link> ·{" "}
              <Link to="/pricing#refund" className="font-semibold text-indigo-600 hover:underline">Pricing & Refund Summary</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

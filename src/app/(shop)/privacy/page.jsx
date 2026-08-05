import React from "react";
import {
  FiDatabase,
  FiActivity,
  FiPieChart,
  FiShare2,
  FiLock,
  FiUserCheck,
  FiEdit3,
  FiHeadphones,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-8 text-center sm:text-left">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Vyzo BD
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-primary/60">
            Last Updated:{" "}
            <span className="font-medium text-primary/80">August 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg font-medium text-primary/80 leading-relaxed mb-12">
          At Vyzo BD, we are committed to protecting your personal information
          and your right to privacy. This policy explains how we collect, use,
          and share your data when you visit or make a purchase from our
          website.
        </p>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* 1. Information We Collect */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiDatabase className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when
              registering on the website, expressing an interest in obtaining
              information about us or our products, or otherwise contacting us.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2">
              <li>
                <strong>Personal Info:</strong> Name, email address, phone
                number, shipping and billing addresses.
              </li>
              <li>
                <strong>Payment Info:</strong> We process payments securely;
                however, we do not store your direct credit card numbers.
              </li>
              <li>
                <strong>Device Data:</strong> IP address, browser type,
                operating system, and pages visited (collected automatically).
              </li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiActivity className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-sm text-primary/70 mb-4">
              We use personal information collected via our website for a
              variety of business purposes described below:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2">
              <li>To fulfill and manage your orders, payments, and returns.</li>
              <li>
                To deliver administrative information to you regarding products
                or changes to our terms.
              </li>
              <li>
                To send marketing and promotional communications (you can
                opt-out at any time).
              </li>
              <li>To improve our website functionality and user experience.</li>
            </ul>
          </section>

          {/* 3. Cookies and Tracking */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiPieChart className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                3. Cookies and Tracking
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              We use cookies and similar tracking technologies to access or
              store information. You can set your browser to refuse all or some
              browser cookies, or to alert you when websites set or access
              cookies. If you disable or refuse cookies, please note that some
              parts of this website may become inaccessible or not function
              properly.
            </p>
          </section>

          {/* 4. Data Sharing and Disclosure */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiShare2 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                4. Data Sharing and Disclosure
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              We only share information with your consent, to comply with laws,
              to provide you with services, to protect your rights, or to
              fulfill business obligations. We may share your data with
              third-party vendors, service providers, contractors, or agents who
              perform services for us (e.g., delivery partners like
              Pathao/RedX).
            </p>
            <p className="text-sm text-primary/80 leading-relaxed font-semibold">
              We do not sell, rent, or trade your personal information to third
              parties.
            </p>
          </section>

          {/* 5. Data Security */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                5. Data Security
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure.
            </p>
          </section>

          {/* 6. Your Privacy Rights */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiUserCheck className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                6. Your Privacy Rights
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              You have the right to review, change, or terminate your account at
              any time. If you would like to request access to, correct, or
              delete the personal information we have collected from you, please
              submit a request to our support email.
            </p>
          </section>

          {/* 7. Changes to This Policy */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiEdit3 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                7. Changes to This Policy
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              We may update this privacy policy from time to time. The updated
              version will be indicated by an updated "Revised" date and the
              updated version will be effective as soon as it is accessible. We
              encourage you to review this privacy policy frequently to be
              informed of how we are protecting your information.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section className="bg-secondary p-6 sm:p-8 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiHeadphones className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                8. Contact Us
              </h2>
            </div>
            <p className="text-sm text-primary/80 mb-6">
              If you have questions or comments about this policy, you may
              contact our Data Protection Officer (DPO) via the following
              channels:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="mailto:support@vyzobd.com"
                className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-primary/10">
                  <FiMail className="w-4 h-4" />
                </div>
                support@vyzobd.com
              </a>
              <a
                href="tel:+8801622862227"
                className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-primary/10">
                  <FiPhoneCall className="w-4 h-4" />
                </div>
                +8801622862227
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

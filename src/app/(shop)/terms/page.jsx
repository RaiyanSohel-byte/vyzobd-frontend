import React from "react";
import {
  FiBookOpen,
  FiUserCheck,
  FiTag,
  FiShoppingCart,
  FiShield,
  FiAlertTriangle,
  FiEdit3,
  FiHeadphones,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-8 text-center sm:text-left">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Vyzo BD
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-primary/60">
            Last Updated:{" "}
            <span className="font-medium text-primary/80">August 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg font-medium text-primary/80 leading-relaxed mb-12">
          Welcome to Vyzo BD. By accessing or using our website, you agree to be
          bound by the following terms and conditions. Please read them
          carefully before making a purchase.
        </p>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* 1. General Conditions */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiBookOpen className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                1. General Conditions
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              We reserve the right to refuse service to anyone for any reason at
              any time. You understand that your content (not including credit
              card information), may be transferred unencrypted and involve
              transmissions over various networks.
            </p>
            <p className="text-sm text-primary/80 leading-relaxed">
              You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without express written permission by us.
            </p>
          </section>

          {/* 2. User Accounts */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiUserCheck className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                2. User Accounts
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2">
              <li>
                You must provide accurate, complete, and current information
                when creating an account.
              </li>
              <li>
                You are responsible for safeguarding the password that you use
                to access your account.
              </li>
              <li>
                You must notify us immediately upon becoming aware of any breach
                of security or unauthorized use of your account.
              </li>
            </ul>
          </section>

          {/* 3. Products and Pricing */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiTag className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                3. Products and Pricing
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue the Service
              (or any part or content thereof) without notice at any time.
            </p>
            <p className="text-sm text-primary/80 leading-relaxed">
              We have made every effort to display as accurately as possible the
              colors and images of our products that appear on the store. We
              cannot guarantee that your computer monitor's display of any color
              will be accurate.
            </p>
          </section>

          {/* 4. Orders and Billing */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiShoppingCart className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                4. Orders and Billing
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              We reserve the right to refuse any order you place with us. We
              may, in our sole discretion, limit or cancel quantities purchased
              per person, per household, or per order.
            </p>
            <p className="text-sm text-primary/80 leading-relaxed">
              In the event that we make a change to or cancel an order, we may
              attempt to notify you by contacting the e-mail and/or billing
              address/phone number provided at the time the order was made.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiShield className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                5. Intellectual Property
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              All content included on this site, such as text, graphics, logos,
              images, and software, is the property of Vyzo BD or its content
              suppliers and protected by international copyright laws.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                6. Limitation of Liability
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              In no case shall Vyzo BD, our directors, officers, employees,
              affiliates, agents, contractors, interns, or suppliers be liable
              for any injury, loss, claim, or any direct, indirect, incidental,
              punitive, special, or consequential damages of any kind,
              including, without limitation lost profits, lost revenue, lost
              savings, loss of data, replacement costs, or any similar damages.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiEdit3 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                7. Changes to Terms
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              You can review the most current version of the Terms and
              Conditions at any time on this page. We reserve the right, at our
              sole discretion, to update, change or replace any part of these
              Terms and Conditions by posting updates and changes to our
              website.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section className="bg-secondary p-6 sm:p-8 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiHeadphones className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                8. Contact Information
              </h2>
            </div>
            <p className="text-sm text-primary/80 mb-6">
              Questions about the Terms and Conditions should be sent to us at:
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

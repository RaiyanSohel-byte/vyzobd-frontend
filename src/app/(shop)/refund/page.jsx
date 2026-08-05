import React from "react";
import Link from "next/link";
import {
  FiRefreshCcw,
  FiXCircle,
  FiDollarSign,
  FiTruck,
  FiSlash,
  FiHeadphones,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function RefundPolicyPage() {
  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-8 text-center sm:text-left">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Vyzo BD
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-sm text-primary/60">
            Last Updated:{" "}
            <span className="font-medium text-primary/80">August 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg font-medium text-primary/80 leading-relaxed mb-12">
          At Vyzo BD, customer satisfaction is our priority. Please review our
          guidelines below regarding returns, refunds, and cancellations.
        </p>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* 1. Return Eligibility */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiRefreshCcw className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                1. Return Eligibility
              </h2>
            </div>
            <p className="text-sm text-primary/70 mb-4">
              You can request a return if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2 mb-6">
              <li>You receive a damaged product.</li>
              <li>You receive the wrong product.</li>
              <li>The product has a manufacturing defect.</li>
            </ul>
            <div className="bg-primary/5 border border-primary/10 p-4 rounded-md">
              <p className="text-sm font-semibold text-primary">
                Return requests must be made within{" "}
                <span className="text-accent font-bold">3 days</span> of
                receiving the product.
              </p>
            </div>
          </section>

          {/* 2. Non-Returnable Items */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiXCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold tracking-tight">
                2. Non-Returnable Items
              </h2>
            </div>
            <p className="text-sm text-primary/70 mb-4">
              We do not accept returns if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2">
              <li>You change your mind after purchase.</li>
              <li>The product has been used or damaged by the customer.</li>
              <li>The product is returned without its original packaging.</li>
            </ul>
          </section>

          {/* 3. Refund Policy */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiDollarSign className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                3. Refund Policy
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              Once the returned product is inspected and approved, your refund
              or replacement will be processed promptly.
            </p>
          </section>

          {/* 4. Return Shipping */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiTruck className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                4. Return Shipping
              </h2>
            </div>
            <div className="space-y-4 text-sm text-primary/80">
              <p>
                <strong className="text-primary">Our Mistake:</strong> If the
                mistake is from our side (wrong or damaged product), Vyzo BD
                will bear the return shipping cost.
              </p>
              <p>
                <strong className="text-primary">Other Reasons:</strong> If the
                return is due to reasons not caused by us, the customer will be
                responsible for the return shipping cost.
              </p>
            </div>
          </section>

          {/* 5. Order Cancellation */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiSlash className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                5. Order Cancellation
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              Orders can be cancelled before they are shipped. Once an order has
              been dispatched, it cannot be cancelled.
            </p>
          </section>

          {/* 6. Contact Us */}
          <section className="bg-secondary p-6 sm:p-8 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiHeadphones className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                6. Contact Us
              </h2>
            </div>
            <p className="text-sm text-primary/80 mb-6">
              For any return or refund request, please contact our support team:
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

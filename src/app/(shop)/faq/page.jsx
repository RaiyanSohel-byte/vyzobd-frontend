import React from "react";
import {
  FiHelpCircle,
  FiShoppingBag,
  FiTruck,
  FiRefreshCcw,
  FiUserCheck,
  FiHeadphones,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function FAQPage() {
  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-8 text-center sm:text-left">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Vyzo BD Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-primary/60">
            Last Updated:{" "}
            <span className="font-medium text-primary/80">August 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg font-medium text-primary/80 leading-relaxed mb-12">
          Have a question? We're here to help. Below you'll find answers to the
          most common questions about ordering, shipping, and our policies.
        </p>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {/* 1. Ordering & Payments */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-primary/5 pb-4">
              <FiShoppingBag className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                Ordering & Payments
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  How do I place an order?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Simply browse our products, select your desired items, and
                  click "Add to Cart." When you're ready, proceed to the
                  checkout page, fill in your shipping details, and confirm your
                  order.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Currently, we process all orders via{" "}
                  <strong>Cash on Delivery (COD)</strong>. You can safely pay
                  with cash when your package arrives at your doorstep.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  Can I cancel my order?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Yes, you can cancel your order as long as it hasn't been
                  shipped yet. Once an order has been dispatched from our
                  facility, it cannot be canceled.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Shipping & Delivery */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-primary/5 pb-4">
              <FiTruck className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                Shipping & Delivery
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  What are the delivery charges?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Delivery inside Dhaka costs <strong>৳80</strong>. For
                  addresses outside of Dhaka (including all other divisions and
                  districts), the delivery charge is <strong>৳130</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  How long will it take to receive my order?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Orders inside Dhaka are typically delivered within 1-2
                  business days. For deliveries outside of Dhaka, please allow
                  3-5 business days depending on the exact location.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Returns & Refunds */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-primary/5 pb-4">
              <FiRefreshCcw className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                Returns & Refunds
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  What is your return policy?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  We accept returns within <strong>3 days</strong> of delivery
                  if the product is damaged, defective, or if you received the
                  wrong item. Products must be unused and in their original
                  packaging.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  Do I have to pay for return shipping?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  If the mistake is on our end (wrong or damaged product), Vyzo
                  BD covers the return shipping cost. If the return is for other
                  reasons, the customer is responsible for the shipping fees.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Account & Security */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-primary/5 pb-4">
              <FiUserCheck className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                Account & Security
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  Do I need an account to place an order?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  You can browse our store freely, but creating an account helps
                  you track your orders, save your shipping details for faster
                  checkout, and manage your purchase history easily.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-primary mb-2">
                  Is my personal information secure?
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  Absolutely. We use industry-standard encryption to protect
                  your data. We do not sell your personal information to third
                  parties. For more details, please review our Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Contact Us */}
          <section className="bg-secondary p-6 sm:p-8 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiHeadphones className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                Still have questions?
              </h2>
            </div>
            <p className="text-sm text-primary/80 mb-6">
              If you couldn't find the answer you were looking for, our customer
              support team is always ready to assist you.
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

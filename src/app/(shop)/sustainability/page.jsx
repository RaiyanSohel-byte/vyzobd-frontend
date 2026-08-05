import React from "react";
import {
  FiLeaf,
  FiPackage,
  FiGlobe,
  FiRefreshCw,
  FiUsers,
  FiTrendingUp,
  FiHeadphones,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function SustainabilityPage() {
  return (
    <div className="bg-secondary min-h-screen text-primary selection:bg-accent selection:text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-primary/10 pb-8 text-center sm:text-left">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Vyzo BD
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Our Sustainability Commitment
          </h1>
          <p className="text-sm text-primary/60">
            Last Updated:{" "}
            <span className="font-medium text-primary/80">August 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg font-medium text-primary/80 leading-relaxed mb-12">
          At Vyzo BD, we believe that great products shouldn't come at the
          expense of our planet. We are committed to taking actionable steps
          toward a more sustainable future by minimizing our environmental
          footprint and maximizing our positive social impact in Bangladesh and
          beyond.
        </p>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* 1. Eco-Friendly Packaging */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiPackage className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                1. Eco-Friendly Packaging
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              Packaging waste is one of the biggest challenges in e-commerce. We
              are actively working to reduce single-use plastics across our
              supply chain.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-primary/80 ml-2">
              <li>
                Transitioning to 100% recyclable or biodegradable mailers.
              </li>
              <li>Minimizing excess void-fill in our shipping boxes.</li>
              <li>
                Encouraging our vendor partners to adopt sustainable packaging
                practices.
              </li>
            </ul>
          </section>

          {/* 2. Sustainable Sourcing */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiGlobe className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                2. Sustainable Sourcing
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              We care about where our products come from. We are continually
              auditing our supply chain to partner with brands and manufacturers
              who share our environmental values.
            </p>
            <p className="text-sm text-primary/80 leading-relaxed">
              Whenever possible, we prioritize local sourcing to support the
              local economy and reduce the carbon emissions associated with
              long-distance freight.
            </p>
          </section>

          {/* 3. Waste Reduction & Circularity */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiRefreshCw className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                3. Waste Reduction & Circularity
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              We have optimized our inventory management systems to prevent
              overstocking and reduce product obsolescence. In our warehouses,
              we maintain strict recycling programs for cardboard, paper, and
              plastic waste generated during day-to-day operations.
            </p>
          </section>

          {/* 4. Social Responsibility */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiUsers className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                4. Social Responsibility
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed mb-4">
              Sustainability is not just about the environment; it is also about
              people. We ensure that our workplace operates on the principles of
              fairness, equality, and safety.
            </p>
            <p className="text-sm text-primary/80 leading-relaxed">
              We expect our suppliers and logistical partners to strictly adhere
              to fair labor practices, ensuring safe working conditions and fair
              wages for all workers involved in bringing our products to your
              doorstep.
            </p>
          </section>

          {/* 5. Continuous Improvement */}
          <section className="bg-white p-6 sm:p-8 rounded-lg border border-primary/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiTrendingUp className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">
                5. Continuous Improvement
              </h2>
            </div>
            <p className="text-sm text-primary/80 leading-relaxed">
              We know that our journey toward sustainability is far from
              complete. We are committed to transparency and will continue
              setting new, measurable goals each year to reduce our carbon
              footprint, improve energy efficiency, and offer more eco-friendly
              product options.
            </p>
          </section>

          {/* 6. Contact Us / Suggestions */}
          <section className="bg-secondary p-6 sm:p-8 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiHeadphones className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                6. Share Your Ideas
              </h2>
            </div>
            <p className="text-sm text-primary/80 mb-6">
              We love hearing from our community. If you have suggestions on how
              Vyzo BD can improve our sustainability efforts, please reach out
              to us:
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

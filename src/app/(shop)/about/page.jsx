import Image from "next/image";
import Link from "next/link";
import { FiLayers, FiScissors, FiGlobe, FiArrowRight } from "react-icons/fi";

const BRAND_VALUES = [
  {
    id: "01",
    icon: FiScissors,
    title: "Meticulous Craftsmanship",
    description:
      "Every seam, stitch, and silhouette is engineered for longevity. We partner exclusively with multi-generational artisans who share our unwavering obsession with detail.",
  },
  {
    id: "02",
    icon: FiLayers,
    title: "Architectural Design",
    description:
      "Inspired by modern architecture, our garments focus on structural integrity, clean lines, and purposeful utility, removing the unnecessary to celebrate the essential.",
  },
  {
    id: "03",
    icon: FiGlobe,
    title: "Sustainable Practices",
    description:
      "Luxury shouldn't cost the earth. We source organic, upcycled, and low-impact materials, ensuring our footprint is as minimal as our aesthetic.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-secondary text-primary py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Our Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Redefining the modern <br className="hidden sm:block" />
            wardrobe.
          </h1>
          <p className="text-lg text-primary/60 font-light leading-relaxed max-w-xl">
            We believe that what you wear should be an extension of how you
            live—uncomplicated, purposeful, and beautifully constructed.
          </p>
        </div>

        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 lg:mb-32 items-center">
          {/* Left Image (Main) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-white/50 border border-primary/10 shadow-sm">
              <Image
                src="/placeholder-about-1.jpg" // Replace with your actual image path
                alt="Artisan working on fabric"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative block behind image */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary rounded-lg -z-10 hidden sm:block"></div>
          </div>

          {/* Right Content & Secondary Image */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Born from a desire for permanence in a disposable world.
            </h2>
            <div className="space-y-6 text-primary/70 font-light text-sm sm:text-base leading-relaxed mb-10">
              <p>
                Founded in 2026, our studio set out to challenge the relentless
                cycle of fast fashion. We don't design for seasons; we design
                for lifetimes. By stripping away fleeting trends, we create
                foundational pieces that serve as the architecture of your
                personal style.
              </p>
              <p>
                Every fabric is meticulously sourced. Every pattern is draped
                and tested endlessly. The result is a collection of everyday
                essentials that feel bespoke, offering uncompromising quality
                without the traditional luxury markup.
              </p>
            </div>

            {/* Optional Small Secondary Image for visual interest */}
            <div className="relative w-full sm:w-3/4 aspect-[16/9] rounded-lg overflow-hidden border border-primary/10 shadow-sm">
              <Image
                src="/placeholder-about-2.jpg" // Replace with your actual image path
                alt="Close up of fabric textures"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Brand Values Grid */}
        <div className="border-t border-primary/10 pt-16 lg:pt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              The Pillars of Our Design
            </h2>
            <Link
              href="/sustainability"
              className="group flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary transition-colors"
            >
              Read our full manifesto
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRAND_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.id}
                  className="bg-white p-8 rounded-lg border border-primary/5 shadow-xs hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
                >
                  {/* Subtle background number */}
                  <span className="absolute -top-4 -right-4 text-9xl font-bold text-secondary/50 select-none z-0 group-hover:scale-110 transition-transform duration-500">
                    {value.id}
                  </span>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center mb-6 border border-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                    <p className="text-sm text-primary/60 font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

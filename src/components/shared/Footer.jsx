// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";
import logoImg from "../../../public/logos/navLogo.png";

const FOOTER_LINKS = {
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Careers", href: "/careers" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const SOCIAL_LINKS = [
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-secondary pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Links & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column - Expanded to take up half the grid for a balanced two-sided layout */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="mb-8 inline-flex items-center justify-center bg-secondary px-5 py-3 rounded-md transition-transform duration-300 hover:scale-105 shadow-sm"
            >
              <Image src={logoImg} width={64} height={64} alt="Store Logo" />
            </Link>

            <p className="text-secondary/70 text-sm leading-relaxed max-w-sm mb-8 font-light">
              Elevating everyday essentials through meticulous craftsmanship,
              sustainable practices, and modern architectural silhouettes.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-secondary/60 hover:text-white transition-colors duration-300 p-2 -ml-2 rounded-full hover:bg-white/5"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns - Shifted to the right with offset (lg:col-start-8) for an elegant gap */}
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
            {/* Support */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6">
                Support
              </h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary/70 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-0 h-[1px] bg-white mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary/70 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-0 h-[1px] bg-white mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary/50 text-xs tracking-wide">
            &copy; {currentYear} Store Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-secondary/50 text-xs tracking-wide">
            <span>Bangladesh</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>BDT (৳)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

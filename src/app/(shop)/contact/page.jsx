"use client";

import { useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const CONTACT_INFO = [
  {
    id: "email",
    icon: FiMail,
    title: "Email Us",
    details: ["support@store.com", "wholesale@store.com"],
  },
  {
    id: "phone",
    icon: FiPhone,
    title: "Call Us",
    details: ["+880 1622862227", "Mon-Fri, 9am - 6pm (BDT)"],
  },
  {
    id: "location",
    icon: FiMapPin,
    title: "Location",
    details: [
      "House- 30 , Road- 14",
      "Block- D , Mirpur-12 Dhaka 1216 Bangladesh",
    ],
  },
];
//House- 30, Road- 14, Block- D, Mirpur-12 Dhaka 1216 Bangladesh

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully.");
    }, 1500);
  };

  return (
    <section className="bg-secondary text-primary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Let's start a <br className="hidden sm:block" />
            conversation.
          </h1>
          <p className="text-lg text-primary/60 font-light leading-relaxed max-w-xl">
            Whether you have a question about sizing, styling, or our
            sustainable practices, our dedicated team is here to assist you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.id}
                  className="bg-white p-8 rounded-lg border border-primary/5 shadow-xs hover:shadow-md transition-shadow duration-300 flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 bg-secondary rounded-md flex-shrink-0 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-primary/70 font-light"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Operating Hours Card */}
            <div className="bg-transparent p-8 rounded-lg border border-primary/10 flex items-start gap-6">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-primary/40">
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                  Operating Hours
                </h3>
                <p className="text-sm text-primary/70 font-light leading-relaxed">
                  Our customer service team is available Monday through Friday.
                  We strive to respond to all inquiries within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-primary/10 shadow-sm">
              <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-semibold uppercase tracking-wider text-primary/80"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full bg-secondary text-primary text-sm px-4 py-3 rounded-md border border-primary/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
                      placeholder="Jane"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-semibold uppercase tracking-wider text-primary/80"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full bg-secondary text-primary text-sm px-4 py-3 rounded-md border border-primary/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-primary/80"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-secondary text-primary text-sm px-4 py-3 rounded-md border border-primary/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold uppercase tracking-wider text-primary/80"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full bg-secondary text-primary text-sm px-4 py-3 rounded-md border border-primary/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic...</option>
                    <option value="order">Order Inquiry</option>
                    <option value="sizing">Sizing & Fit</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-wider text-primary/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-secondary text-primary text-sm px-4 py-3 rounded-md border border-primary/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-accent text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ?
                    "Sending..."
                  : <>
                      Send Message
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

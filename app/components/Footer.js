import React from "react";
import Image from "next/image";
import logo from "@/public/me2.jpg";

export default function Footer() {
  // Footer Data
  const footerSections = [
    {
      title: "Product",
      links: [
        "Overview",
        "Features",
        { label: "Solutions", badge: "New" },
        "Tutorials",
        "Pricing",
        "Releases",
      ],
    },
    {
      title: "Company",
      links: ["About us", "Careers", "Press", "News", "Media kit", "Contact"],
    },
    {
      title: "Resources",
      links: [
        "Blog",
        "Newsletter",
        "Events",
        "Help centre",
        "Tutorials",
        "Support",
      ],
    },
    {
      title: "Use cases",
      links: [
        "Startups",
        "Enterprise",
        "Government",
        "SaaS centre",
        "Marketplaces",
        "Ecommerce",
      ],
    },
    {
      title: "Social",
      links: [
        "Twitter",
        "LinkedIn",
        "Facebook",
        "GitHub",
        "AngelList",
        "Dribbble",
      ],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Cookies", "Licenses", "Settings", "Contact"],
    },
  ];

  return (
    <footer className="px-14 mt-16">
      {/* Top Section */}
      <div className="logo">
        <Image
          src={logo}
          alt="Company logo"
          width={50}
          height={50}
          className="rounded-lg"
        />
      </div>

      <div className="detail mt-8 flex flex-wrap justify-between items-center border-b border-gray-200 pb-10">
        <div>
          <h1 className="text-4xl font-bold pb-5 text-gray-900">
            Let&apos;s get started on something great
          </h1>
          <p className="text-lg text-gray-600">
            Join over 4,000+ startups already growing with Untitled
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button className="text-white bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-3 rounded-xl shadow-sm transition">
            Get started
          </button>
        </div>
      </div>

      {/* Footer Links (Dynamic Loop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 py-12 text-sm text-gray-600">
        {footerSections.map((section, index) => (
          <div key={index}>
            <h6 className="text-gray-900 font-semibold mb-4">{section.title}</h6>
            <ul className="space-y-2">
              {section.links.map((link, i) =>
                typeof link === "string" ? (
                  <li key={i}>{link}</li>
                ) : (
                  <li key={i} className="flex items-center gap-1">
                    {link.label}
                    {link.badge && (
                      <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-md">
                        {link.badge}
                      </span>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Untitled. All rights reserved.</p>
        <p>Made with ❤️ by Your Company</p>
      </div>
    </footer>
  );
}

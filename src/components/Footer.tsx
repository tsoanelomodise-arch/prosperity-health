import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react";
import { PageId } from "../types";

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks: { name: string; page: PageId }[] = [
    { name: "Home", page: "home" },
    { name: "Meet The Team", page: "meet-the-team" },
    { name: "Contact & Bookings", page: "contact" },
  ];

  const services: { name: string; page: PageId }[] = [
    { name: "Ultrasound Scans", page: "ultrasound-scans" },
    { name: "Sports Injuries", page: "sports-injuries" },
    { name: "Wellness Check-Ups", page: "wellness-check-ups" },
    { name: "Chronic Disease Programs", page: "chronic-disease" },
    { name: "Dental Care", page: "dental-care" },
    { name: "Eye Care", page: "eye-care" },
    { name: "IV Therapy", page: "iv-therapy" },
    { name: "Mental Health Services", page: "mental-health" },
    { name: "Minor Procedures", page: "minor-procedures" },
  ];

  return (
    <footer className="bg-primary-dark text-white/80 pt-16 pb-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-48 h-16 md:w-60 md:h-20 bg-white rounded-xl shadow-lg border border-white/25 flex items-center justify-center p-2 overflow-hidden">
                <img
                  src="https://donotdelete.wonderlandstudio.co.za/prosperity/Logo_Horizontal.jpeg"
                  alt="Prosperity Health Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-sans font-bold text-[1.15rem] leading-none text-white">
                  Prosperity Health
                </span>
                <span className="block font-sans font-medium text-[0.7rem] text-accent mt-0.5">
                  Medical Centre
                </span>
              </div>
            </div>
            <p className="text-[0.93rem] text-white/70 leading-relaxed mb-6">
              At Prosperity Health Medical Centre, your health is our mission.
              From general practice to dental care, optometry, and social work,
              we are here to provide Soweto residents with the comprehensive,
              premium care they deserve.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/100063518685406/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-200 text-white/80 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/prosperityhealth_za/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-200 text-white/80 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-[0.95rem] font-bold uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[0.95rem] text-white/75 hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left focus:outline-none"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-[0.95rem] font-bold uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Our Services
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {services.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[0.875rem] text-white/75 hover:text-white hover:translate-x-1.5 transition-all duration-200 cursor-pointer text-left focus:outline-none"
                  >
                    • {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-[0.95rem] font-bold uppercase tracking-wider mb-6 border-l-2 border-accent pl-2.5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-[0.9rem] text-white/75 leading-relaxed">
                  25510 Vincent Rd,
                  <br />
                  Meadowlands West Zone 6, Soweto, 1852
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="mailto:info@prosperityhealth.co.za"
                  className="text-[0.9rem] text-white/75 hover:text-white hover:underline"
                >
                  info@prosperityhealth.co.za
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="tel:+27101012499"
                  className="text-[0.9rem] text-white/75 hover:text-white hover:underline font-medium"
                >
                  010 101 2499
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <MessageSquare className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="https://wa.me/27672705995"
                  className="text-[0.9rem] text-white/75 hover:text-white hover:underline font-medium"
                >
                  067 270 5995 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center sm:text-left">
            © 2026 Dr Phumelele Skosana & Prosperity Health Medical Centre. All
            Rights Reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5 justify-center">
            Dedicated to Soweto's wellness with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

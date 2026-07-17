import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Calendar, ArrowRight } from "lucide-react";
import { PageId } from "../types";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ currentPage, onNavigate, onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services: { id: PageId; name: string }[] = [
    { id: "ultrasound-scans", name: "Ultrasound Scans" },
    { id: "sports-injuries", name: "Sports Injuries" },
    { id: "wellness-check-ups", name: "Wellness Check-Ups & Exams" },
    { id: "chronic-disease", name: "Chronic Disease Programs" },
    { id: "dental-care", name: "Dental Care" },
    { id: "eye-care", name: "Eye Care" },
    { id: "iv-therapy", name: "IV Therapy" },
    { id: "mental-health", name: "Mental Health & Social Work" },
    { id: "minor-procedures", name: "Minor Procedures" },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setIsOpen(false);
    setServicesDropdown(false);
  };

  const isServiceActive = services.some((s) => s.id === currentPage);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-transparent backdrop-blur-md shadow-sm border-white/20 py-3"
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-48 h-16 md:w-60 md:h-20 bg-white rounded-xl shadow-lg border border-primary/15 flex items-center justify-center p-2 transition-transform duration-200 group-hover:scale-105 overflow-hidden">
              <img
                src="https://donotdelete.wonderlandstudio.co.za/prosperity/Logo_Horizontal.jpeg"
                alt="Prosperity Health Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => handleLinkClick("home")}
              className={`px-4 py-2 rounded-full font-medium text-[0.95rem] transition-all duration-300 cursor-pointer border ${
                currentPage === "home"
                  ? "text-white bg-primary-dark border-primary-dark font-semibold shadow-sm"
                  : "text-white bg-primary border-primary/20 hover:bg-primary-dark hover:border-primary-dark shadow-sm hover:shadow"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleLinkClick("meet-the-team")}
              className={`px-4 py-2 rounded-full font-medium text-[0.95rem] transition-all duration-300 cursor-pointer border ${
                currentPage === "meet-the-team"
                  ? "text-white bg-primary-dark border-primary-dark font-semibold shadow-sm"
                  : "text-white bg-primary border-primary/20 hover:bg-primary-dark hover:border-primary-dark shadow-sm hover:shadow"
              }`}
            >
              Meet The Team
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className={`px-4 py-2 rounded-full font-medium text-[0.95rem] flex items-center gap-1.5 transition-all duration-300 cursor-pointer border ${
                  isServiceActive
                    ? "text-white bg-primary-dark border-primary-dark font-semibold shadow-sm"
                    : "text-white bg-primary border-primary/20 hover:bg-primary-dark hover:border-primary-dark shadow-sm hover:shadow"
                }`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${servicesDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {servicesDropdown && (
                <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-xl border border-primary/10 p-2 mt-1 animate-fade-in z-50">
                  <div className="grid grid-cols-1 gap-0.5">
                    {services.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleLinkClick(item.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.9rem] font-medium flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                          currentPage === item.id
                            ? "bg-accent-light/40 text-primary font-bold"
                            : "text-text-light hover:text-primary hover:bg-off-white hover:translate-x-1"
                        }`}
                      >
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-full font-medium text-[0.95rem] transition-all duration-300 cursor-pointer text-white bg-primary border border-primary/20 hover:bg-primary-dark hover:border-primary-dark shadow-sm hover:shadow"
            >
              Contact Us
            </button>

            <button
              onClick={onOpenBooking}
              className="ml-4 px-6 py-2.5 rounded-full font-bold text-[0.95rem] flex items-center gap-2 shadow-md bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 shadow-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-primary-dark rounded-xl hover:bg-off-white transition-colors duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-[96px] bg-white z-40 flex flex-col p-6 overflow-y-auto transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1.5 mb-6">
          <button
            onClick={() => handleLinkClick("home")}
            className={`w-full text-left px-5 py-3.5 rounded-xl font-semibold text-[1.1rem] transition-colors ${
              currentPage === "home"
                ? "bg-primary/10 text-primary"
                : "text-text-light hover:bg-off-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick("meet-the-team")}
            className={`w-full text-left px-5 py-3.5 rounded-xl font-semibold text-[1.1rem] transition-colors ${
              currentPage === "meet-the-team"
                ? "bg-primary/10 text-primary"
                : "text-text-light hover:bg-off-white"
            }`}
          >
            Meet The Team
          </button>
          <button
            onClick={() => {
              onOpenBooking();
              setIsOpen(false);
            }}
            className="w-full text-left px-5 py-3.5 rounded-xl font-semibold text-[1.1rem] transition-colors text-text-light hover:bg-off-white"
          >
            Contact Us
          </button>
        </div>

        <div className="mb-6">
          <div className="px-5 text-xs font-bold text-primary-light uppercase tracking-wider mb-2">
            Our Specialist Services
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-2">
            {services.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.95rem] font-medium flex items-center gap-3 transition-colors ${
                  currentPage === item.id
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-text-light hover:bg-off-white"
                }`}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-primary/10">
          <button
            onClick={() => {
              onOpenBooking();
              setIsOpen(false);
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            Book My Appointment
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </>
  );
}

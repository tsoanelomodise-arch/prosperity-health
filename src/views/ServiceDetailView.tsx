import { motion } from "motion/react";
import {
  BadgeHelp,
  ChevronRight,
  Phone,
  MessageSquare,
  MapPin,
  Check,
  BookOpen,
  Clock,
  Calendar,
  X,
  ArrowRight,
} from "lucide-react";
import { servicesData } from "../data/services";
import { PageId, ServiceItem } from "../types";
import { useEffect, useRef, useState } from "react";

interface ServiceDetailViewProps {
  serviceId: PageId;
  onNavigate: (page: PageId) => void;
}

export default function ServiceDetailView({
  serviceId,
  onNavigate,
}: ServiceDetailViewProps) {
  const [showOverview, setShowOverview] = useState(false);
  const service = servicesData[serviceId];
  const activeServiceRef = useRef<HTMLButtonElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show a slow, elegant ticker-tape like slide-in of the active service menu
    if (activeServiceRef.current && navContainerRef.current) {
      setTimeout(() => {
        const container = navContainerRef.current;
        const target = activeServiceRef.current;
        if (!container || !target) return;

        const scrollLeft =
          target.offsetLeft -
          container.offsetWidth / 2 +
          target.offsetWidth / 2;

        // Custom slow scroll animation function
        let start = container.scrollLeft;
        let change = scrollLeft - start;
        let currentTime = 0;
        let increment = 20;
        let duration = 1500; // 1.5 seconds - slow and elegant

        const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t * t + b;
          t -= 2;
          return (c / 2) * (t * t * t + 2) + b;
        };

        const animateScroll = () => {
          currentTime += increment;
          const val = easeInOutCubic(currentTime, start, change, duration);
          container.scrollLeft = val;
          if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }, 500); // Wait for modal entrance to finish
    }
  }, [serviceId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!service) {
    return null;
  }

  // Sidebar link items - we keep them but maybe styling them differently or dropping if it's a modal?
  // "Preserve all existing Services page and subpage content"
  // The prompt says "preserve all service subpage content", so I'll keep the sidebar but integrate it elegantly.
  const allServices: { id: PageId; name: string }[] = [
    { id: "ultrasound-scans", name: "Ultrasound Scans" },
    { id: "sports-injuries", name: "Sports Injuries" },
    { id: "wellness-check-ups", name: "Wellness Check-Ups & Exams" },
    { id: "chronic-disease", name: "Chronic Disease Management" },
    { id: "dental-care", name: "Dental Care" },
    { id: "eye-care", name: "Eye Care" },
    { id: "iv-therapy", name: "IV Therapy" },
    { id: "mental-health", name: "Mental Health & Social Work" },
    { id: "minor-procedures", name: "Minor Procedures" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8 animate-fade-in">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onNavigate("home")}
        className="absolute inset-0 bg-[#0A3B39]/40 backdrop-blur-sm"
      />

      {/* Modal Content container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1400px] h-[96dvh] md:h-[96vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-white/80"
      >
        {/* Full-Section Background Image based on current service or requested image */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage:
              "url('https://donotdelete.wonderlandstudio.co.za/prosperity/Gemini_Generated_Image_7u7acy7u7acy7u7a.png')",
            backgroundSize: "cover",
            backgroundPosition: "right top",
          }}
        />

        {/* Top Navigation for all Services */}
        <div
          ref={navContainerRef}
          className="w-full relative z-[60] px-6 md:px-8 lg:px-10 pt-6 md:pt-8 lg:pt-10 pb-5 border-b border-black/[0.05] flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center shrink-0 bg-white/70 backdrop-blur-[40px]"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#181C1A]/40 mr-2 shrink-0">
            Services
          </span>

          {allServices.map((item) => (
            <button
              key={item.id}
              ref={item.id === serviceId ? activeServiceRef : null}
              onClick={() => {
                onNavigate(item.id);
                const modal = document.querySelector(".custom-scrollbar");
                if (modal) modal.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                item.id === serviceId
                  ? "text-[#181C1A] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                  : "text-[#181C1A]/50 hover:text-[#181C1A] hover:bg-black/5"
              }`}
            >
              {item.name}
            </button>
          ))}
          {/* Spacer to ensure scrollability past right padding */}
          <div className="w-4 shrink-0" />
        </div>

        {/* Floating Close Button */}
        <button
          onClick={() => onNavigate("home")}
          className="absolute top-6 md:top-8 right-6 md:right-8 z-[100] w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white text-[#181C1A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer border border-[#181C1A]/10 transition-all"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-6 md:p-8 lg:p-10 relative">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start min-h-full">
            {/* COLUMN 1: Hero & Action */}
            <div className="w-full lg:w-[32%] flex flex-col lg:sticky lg:top-0 h-full min-h-[500px]">
              <div className="flex flex-col z-10 pt-2 lg:pt-4">
                <h1 className="text-[44px] md:text-[52px] xl:text-[60px] font-sans font-medium text-[#181C1A] tracking-[-0.03em] leading-[0.95] max-w-[90%]">
                  {service.title}
                </h1>

                <p className="text-[#181C1A]/70 text-[15px] xl:text-[16px] leading-[1.6] mt-6 font-medium max-w-[90%]">
                  {service.subTitle}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      onNavigate("contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#181C1A] hover:bg-black text-white px-7 py-3.5 rounded-full font-medium shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 text-sm w-fit"
                  >
                    Book Session Now
                    <div className="bg-white/20 p-1 rounded-full">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <button
                    onClick={() => setShowOverview(!showOverview)}
                    className="bg-white/80 backdrop-blur-sm border border-[#181C1A]/10 hover:bg-white text-[#181C1A] px-7 py-3.5 rounded-full font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 text-sm w-fit"
                  >
                    {showOverview ? "Hide Overview" : "Overview"}
                  </button>
                </div>

              </div>
            </div>

            {/* COLUMN 2: Details & Contact */}
            <div className="w-full lg:w-[34%] flex flex-col gap-6">
              {/* Intro Details Card */}
              {showOverview && (
                <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 xl:p-9 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <h2 className="text-[20px] xl:text-[22px] font-semibold text-[#181C1A] leading-tight flex-1">
                      {service.fullTitle}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#181C1A]/40 border-b border-[#181C1A]/20 pb-0.5 whitespace-nowrap mt-1">
                      Overview
                    </span>
                  </div>
                  <div className="space-y-4 text-[#181C1A]/70 text-[14px] xl:text-[15px] leading-[1.7] font-medium">
                    {service.longDescParagraphs.map((par, idx) => (
                      <p key={idx}>{par}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* COLUMN 3: Features & Extras */}
            <div className="w-full lg:w-[34%] flex flex-col gap-6">
              {/* Core Benefits Card (White style grid) */}
              <div className="bg-white/80 backdrop-blur-3xl border border-white/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 xl:p-9 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[19px] xl:text-[20px] font-medium text-[#181C1A]">
                    {service.featuresTitle}
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F6F8F7] border border-[#181C1A]/5 rounded-2xl p-4 flex gap-3.5 hover:bg-white transition-colors duration-300 items-start shadow-sm"
                    >
                      <div className="bg-white border border-[#181C1A]/5 p-1.5 rounded-full shrink-0 shadow-sm mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#84928A]" />
                      </div>
                      <span className="text-[13px] xl:text-[14px] font-semibold text-[#181C1A]/80 leading-[1.4] py-0.5">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Sections (Green style) */}
              {service.extraSections &&
                service.extraSections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-[#B6D6A8] text-[#1D331F] rounded-[2.5rem] p-8 xl:p-9 shadow-[0_12px_40px_rgba(182,214,168,0.2)] border border-[#1D331F]/10 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <h3 className="text-[19px] xl:text-[20px] font-medium leading-tight max-w-[80%]">
                        {sec.title}
                      </h3>
                      <div className="flex items-center justify-center p-2.5 bg-white/20 rounded-full backdrop-blur-sm">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-3 relative z-10">
                      {sec.content.map((item, itemIdx) => {
                        const parts = item.split(": ");
                        const hasTitle = parts.length > 1;
                        return (
                          <div
                            key={itemIdx}
                            className="bg-white/30 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col gap-1 hover:bg-white/40 transition-colors"
                          >
                            {hasTitle ? (
                              <>
                                <span className="text-[13.5px] xl:text-[14.5px] font-bold text-[#1D331F] leading-snug">
                                  {parts[0]}
                                </span>
                                <span className="text-[13px] xl:text-[14px] font-medium text-[#1D331F]/80 leading-[1.4]">
                                  {parts[1]}
                                </span>
                              </>
                            ) : (
                              <span className="text-[13px] xl:text-[14px] font-medium text-[#1D331F]/90 leading-[1.4]">
                                {item}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

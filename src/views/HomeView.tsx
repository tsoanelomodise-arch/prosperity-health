import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Building2,
  UserCheck,
  ShieldAlert,
  Award,
  Phone,
  CheckCircle2,
  Trophy,
  Users,
  HeartHandshake,
  Calendar,
  Check,
  Heart,
  Activity,
  User,
  Utensils,
  Stethoscope,
  Smile,
  Eye,
  Brain,
  Timer,
  Mail,
  Compass,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { PageId } from "../types";

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
}

const TESTIMONIALS = [
  {
    id: 1,
    text: "Absolutely wonderful care at Prosperity! Dr. Phumi took his time to explain my abdominal ultrasound, and we collected my chronic repeats on-site instantly from the dispensary. Genuine professional service close to home.",
    initials: "BM",
    name: "Bongani M.",
    location: "Meadowlands, Soweto resident",
    time: "10:14 AM",
    align: "left"
  },
  {
    id: 2,
    text: "The dental care team was incredibly gentle. I got my composite crown restored and my teeth whitened in the very same week. It is a massive relief having such high-end private services in Soweto.",
    initials: "LK",
    name: "Lerato K.",
    location: "Soweto local client",
    time: "14:32 PM",
    align: "right"
  },
  {
    id: 3,
    text: "Quick service! I came in for an IV drip and optical test. The staff was professional and the facilities were incredibly clean.",
    initials: "TJ",
    name: "Thabo J.",
    location: "Diepkloof resident",
    time: "16:45 PM",
    align: "left"
  },
  {
    id: 4,
    text: "I usually dread going to the doctor, but this clinic feels so premium. Highly recommend the wellness screenings.",
    initials: "NP",
    name: "Nomsa P.",
    location: "Orlando East resident",
    time: "17:05 PM",
    align: "right"
  },
  {
    id: 5,
    text: "Great experience getting my baby's vaccinations done. Friendly nurses and a very clean environment.",
    initials: "ZM",
    name: "Zanele M.",
    location: "Pimville resident",
    time: "09:12 AM",
    align: "left"
  }
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<
    "medical" | "therapies" | "specialist"
  >("medical");

  const [visibleMessages, setVisibleMessages] = useState(() => 
    TESTIMONIALS.slice(0, 2).map((m, i) => ({ ...m, instanceId: `init-${i}` }))
  );

  useEffect(() => {
    let index = 2;
    const interval = setInterval(() => {
      setVisibleMessages(prev => {
        const nextMessage = TESTIMONIALS[index % TESTIMONIALS.length];
        index++;
        // Keep the last 3 messages to avoid making it too long, remove from top
        const updated = [...prev, { ...nextMessage, instanceId: `msg-${Date.now()}` }];
        return updated.length > 3 ? updated.slice(1) : updated;
      });
    }, 5000); // add a new message every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Specialist Services",
      value: "9+",
      description: "Under one roof",
    },
    {
      label: "Expert Practitioners",
      value: "5+",
      description: "Dedicated specialists",
    },
    {
      label: "Convenient Location",
      value: "1",
      description: "Meadowlands, Soweto",
    },
  ];

  const featuredServices = [
    {
      id: "ultrasound-scans",
      category: "medical",
      title: "Ultrasound Scans",
      desc: "Safe, non-invasive abdominal, antenatal, or musculoskeletal scans performed on-site.",
    },
    {
      id: "sports-injuries",
      category: "therapies",
      title: "Sports Injuries",
      desc: "Expert physical assessments, strapping, and progressive rehabilitation paths.",
    },
    {
      id: "wellness-check-ups",
      category: "medical",
      title: "Wellness Check-Ups & Exams",
      desc: "Proactive baselines, heart ECGs, system screenings, and PDP license certificates.",
    },
    {
      id: "chronic-disease",
      category: "medical",
      title: "Chronic Disease Management",
      desc: "Coordinated programs for diabetes, asthma, hypertension, and arthritis care.",
    },
    {
      id: "dental-care",
      category: "specialist",
      title: "Dental Care",
      desc: "Gentle dentistry, crowns, cleanings, braces fittings, and professional whitening.",
    },
    {
      id: "eye-care",
      category: "specialist",
      title: "Eye Care",
      desc: "Resident optometrist eye checks, prescriptions, ocular tension, and disease screens.",
    },
    {
      id: "iv-therapy",
      category: "therapies",
      title: "IV Nutrient Therapy",
      desc: "Revitalizing medical drips for rapid hydration, antioxidant support, and energy recovery.",
    },
    {
      id: "mental-health",
      category: "therapies",
      title: "Mental Health & Social Work",
      desc: "Compassionate counseling for trauma support, family recovery, and emotional guidance.",
    },
    {
      id: "minor-procedures",
      category: "medical",
      title: "Minor Procedures",
      desc: "Prompt laceration stitching, cyst removals, ear cleaning, and abscess treatments.",
    },
  ];

  const filteredServices = featuredServices.filter((s) => {
    return s.category === activeTab;
  });

  const teamSpotlights = [
    {
      name: "Dr Phumi Skosana",
      role: "General Practitioner",
      qualification: "MBChB, MSc Sports Medicine",
      summary:
        "Holistic clinical assessments, injury rehabilitation, and athletic wellness strategies.",
    },
    {
      name: "Dr Talifhani Nefolovhodwe",
      role: "Resident Dentist",
      qualification: "BChD Cosmetic Dentistry",
      summary:
        "Restorative aesthetics, gentle decay treatments, crowns, and orthodontic support.",
    },
    {
      name: "Patrick Neluvhola",
      role: "Optometrist",
      qualification: "Bachelor of Optometry",
      summary:
        "Seasoned visual corrections, eye strain diagnosis, and ocular health screens.",
    },
    {
      name: "Edith Rapoo",
      role: "Social Worker & Counselor",
      qualification: "BA Social Work, SA SL (Wits)",
      summary:
        "Empathic mental health support, family counseling, and trauma processing.",
    },
  ];

  return (
    <div className="overflow-hidden bg-[#F1F8F8] selection:bg-accent-light selection:text-primary-dark">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-8 md:pt-48 md:pb-12">
        {/* Background Image with Moody Overlays */}
        <div className="absolute -top-32 md:-top-48 left-0 right-0 h-[120%] lg:h-[160%] z-0 bg-[#F1F8F8]">
          <img
            src="http://donotdelete.wonderlandstudio.co.za/prosperity/3122e9c0-5262-4920-b8ae-b6c5a675114a.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover object-[center_20%] opacity-100"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
            }}
          />
          {/* Mobile Overlay: Vertical gradient to protect stacked text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1F8F8] via-[#F1F8F8]/90 to-transparent lg:hidden z-10 pointer-events-none" />
          
          {/* Desktop Overlay: Horizontal gradient to protect left-aligned text */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#F1F8F8] via-[#F1F8F8]/95 to-transparent hidden lg:block z-10 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-[5.5rem] text-primary-dark leading-[0.95] tracking-tight mb-8 flex flex-col"
              >
                <span className="font-sans font-bold block pb-2">
                  Your Health,
                </span>
                <span className="font-serif font-medium italic text-primary block">
                  Our Mission
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-primary-dark/80 leading-relaxed mb-10 max-w-md font-sans"
              >
                At Prosperity Health Medical Centre, your health and peace of
                mind are our absolute mission. From general practitioner
                services to modern dental practice, optometry, and mental health
                support, our Soweto clinic delivers excellence under one roof.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => onNavigate("contact")}
                  className="w-full sm:w-auto bg-primary-dark text-white font-sans font-medium px-8 py-4 text-sm tracking-wide rounded-full hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-dark/10"
                >
                  Book an Appointment{" "}
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </button>
                <a
                  href="#services-section"
                  className="w-full sm:w-auto bg-transparent border border-primary-dark/20 text-primary-dark font-sans font-medium px-8 py-4 text-sm tracking-wide rounded-full hover:bg-primary-dark/5 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  Explore Services
                </a>
              </motion.div>
            </div>

            {/* RIGHT IMAGE & FLOATING CARDS */}
            <div className="lg:col-span-6 relative h-[350px] sm:h-[450px] lg:h-[550px] w-full mt-8 lg:mt-0 flex items-center justify-center lg:justify-end">
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute right-4 lg:right-12 w-[65%] sm:w-[55%] lg:w-[45%] h-[75%] sm:h-[65%] lg:h-[55%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1000"
                  alt="Medical Professional"
                  className="w-full h-full object-cover object-[center_top]"
                />
              </motion.div>

              {/* Floating Stat 2 - Specialist Services */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hidden sm:block absolute bottom-12 right-24 lg:right-[35%] bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(10,38,22,0.15)] w-[220px] border border-white z-20"
              >
                <div className="w-10 h-10 rounded-full border border-primary-dark/10 bg-primary/5 flex items-center justify-center mb-4 text-primary">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="text-base font-sans font-bold text-primary-dark leading-tight mb-2">
                  {stats[0].label}
                </div>
                <div className="mt-3 pt-3 border-t border-primary-dark/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-primary-dark/80">
                      {stats[0].value} &middot; {stats[0].description}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat 3 - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hidden lg:block absolute -bottom-6 right-6 lg:-right-4 bg-primary-dark text-white p-6 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(10,38,22,0.4)] max-w-[220px]"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-4 text-accent">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-base font-sans font-medium text-white/90 leading-tight mb-2">
                  {stats[2].label}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-xs font-medium text-white/80">
                      {stats[2].description}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats for Mobile & Small Tablets - displayed underneath hero for mobile only */}
      <section className="relative pb-6 px-6 z-10 lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-primary-dark/10 bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_-10px_rgba(10,38,22,0.05)] border border-primary/5 p-6 text-center max-w-7xl mx-auto">
          {stats.map((st, idx) => (
            <div key={idx} className={idx !== 0 ? "pt-5 sm:pt-0" : ""}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">
                {st.label}
              </div>
              <div className="font-serif text-3xl font-medium text-primary-dark mb-1">
                {st.value}
              </div>
              <div className="text-xs text-primary-dark/70 font-medium">
                {st.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CENTERPIECE DESIGN: WHY CHOSE CLINICAL EXCELLENCE (Modern Minimax Redesign) */}
      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16 bg-gradient-to-b from-transparent to-off-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left Column - Typography & Status Card */}
            <div className="lg:col-span-5 flex flex-col justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[4rem] font-sans font-black text-[#0A3B39] tracking-[-0.03em] leading-[1.05] mb-8">
                  Care Centered Around Your Lifestyle
                </h2>
                <p className="text-[#0A3B39]/60 text-base lg:text-lg leading-[1.6] max-w-md font-medium mb-16">
                  We coordinate medical expertise, modern on-site diagnostics,
                  and supportive aesthetic specialists into a single unified
                  clinical journey for Soweto residents.
                </p>
              </div>

              {/* Minimal Status Card - Replaces old pill logo */}
              <div className="border border-black/[0.08] flex-col rounded-[1.5rem] p-6 lg:p-8 bg-[#E5F2F2] w-full max-w-sm flex gap-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:border-black/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#27A19C]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#27A19C]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0A3B39] to-[#27A19C] rounded-2xl flex items-center justify-center text-white font-serif italic text-2xl shadow-inner group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(26,26,26,0.3)] transition-all duration-500">
                    P
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#0A3B39] tracking-tight">
                      Prosperity Health
                    </span>
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-[0.15em] mt-1">
                      Meadowlands, Soweto
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-black/[0.06] relative z-10" />

                <div className="flex items-center gap-3 relative z-10">
                  <span className="flex relative w-2.5 h-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27A19C] opacity-60"></span>
                    <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-[#BED62F]"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A3B39]/80">
                    Practice Status: Active Rooms
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Features Grid */}
            <div className="lg:col-span-7 relative">
              {/* Subtle background 'P' Watermark for Scale & Depth */}
              <div className="absolute -right-[15%] top-[10%] text-[480px] font-sans font-black text-black/[0.015] pointer-events-none select-none z-0 hidden lg:block leading-none">
                P
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16">
                {/* Feature 01 */}
                <div className="flex flex-col group pt-8 border-t border-black/[0.08]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8F8] group-hover:bg-[#0A3B39] group-hover:text-white group-hover:-translate-y-1 border border-black/5 flex items-center justify-center mb-6 text-[#0A3B39] transition-all duration-300 shadow-sm">
                    <Activity
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-[#0A3B39] tracking-tight mb-3 group-hover:text-[#27A19C] transition-colors">
                    All-In-One Convenience
                  </h4>
                  <p className="text-[14px] lg:text-[15px] text-[#0A3B39]/60 leading-[1.65] font-medium">
                    General practitioners, dental treatments, customized eye
                    testing, therapy, and minor surgeries consolidated cleanly
                    in Meadowlands.
                  </p>
                </div>

                {/* Feature 02 */}
                <div className="flex flex-col group pt-8 border-t border-black/[0.08]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8F8] group-hover:bg-[#0A3B39] group-hover:text-white group-hover:-translate-y-1 border border-black/5 flex items-center justify-center mb-6 text-[#0A3B39] transition-all duration-300 shadow-sm">
                    <Heart
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-[#0A3B39] tracking-tight mb-3 group-hover:text-[#27A19C] transition-colors">
                    Modern Diagnostic Imaging
                  </h4>
                  <p className="text-[14px] lg:text-[15px] text-[#0A3B39]/60 leading-[1.65] font-medium">
                    On-site high-precision ultrasound scans and cardiac ECG
                    rhythms baseline monitoring immediately analyzed by our GP
                    team.
                  </p>
                </div>

                {/* Feature 03 */}
                <div className="flex flex-col group pt-8 border-t border-black/[0.08]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8F8] group-hover:bg-[#0A3B39] group-hover:text-white group-hover:-translate-y-1 border border-black/5 flex items-center justify-center mb-6 text-[#0A3B39] transition-all duration-300 shadow-sm">
                    <UserCheck
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-[#0A3B39] tracking-tight mb-3 group-hover:text-[#27A19C] transition-colors">
                    Dedicated Expert Panel
                  </h4>
                  <p className="text-[14px] lg:text-[15px] text-[#0A3B39]/60 leading-[1.65] font-medium">
                    Collaborative clinicians coordinating your primary medicine,
                    oral surgery plans, and chronic repeat prescriptions
                    instantly.
                  </p>
                </div>

                {/* Feature 04 */}
                <div className="flex flex-col group pt-8 border-t border-black/[0.08]">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8F8] group-hover:bg-[#0A3B39] group-hover:text-white group-hover:-translate-y-1 border border-black/5 flex items-center justify-center mb-6 text-[#0A3B39] transition-all duration-300 shadow-sm">
                    <ShieldAlert
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-[#0A3B39] tracking-tight mb-3 group-hover:text-[#27A19C] transition-colors">
                    In-House General Dispensary
                  </h4>
                  <p className="text-[14px] lg:text-[15px] text-[#0A3B39]/60 leading-[1.65] font-medium">
                    Quickly secure your necessary medication repeats on-site
                    right after consults, saving time and pharmacy
                    complications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO-STYLE DOUBLE CATEGORY BANNERS */}
      <section className="py-10 bg-off-white pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pathway A - Light Theme */}
            <div className="bg-gradient-to-br from-white to-[#F1F8F8] border border-primary/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group min-h-[480px] shadow-sm hover:shadow-subtle transition-all duration-300">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block mb-6 text-primary border-b border-primary/20 text-[10px] font-bold uppercase tracking-widest pb-1">
                  Pathway 01 / Prevention
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-primary-dark font-medium leading-[1.15] mb-5 max-w-[320px]">
                  Proactive Family Medicine & Vital Screens
                </h3>
                <p className="text-text-light text-sm sm:text-base leading-relaxed mb-8 max-w-[320px]">
                  Maintain system baseline wellness with direct cardiovascular
                  diagnostics, metabolic checks, and PDP driver license clears.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-subtle border border-primary/5 mt-6 relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex gap-3 items-start text-sm text-text">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-medium text-primary-dark">
                      ECG Baseline Monitoring & Tension checks
                    </span>
                  </div>
                  <div className="flex gap-3 items-start text-sm text-text">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-medium text-primary-dark">
                      Glucose profiling & Insulin support repeats
                    </span>
                  </div>
                  <div className="flex gap-3 items-start text-sm text-text">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-medium text-primary-dark">
                      PDP commercial driving fitness clearances
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onNavigate("wellness-check-ups");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-6 w-full bg-primary text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors cursor-pointer shadow-md"
                >
                  Explore Baselines <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pathway B - Dark Theme */}
            <div className="bg-gradient-to-br from-primary-dark to-[#072625] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group min-h-[480px] shadow-strong">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block mb-6 text-accent-light border-b border-accent-light/30 text-[10px] font-bold uppercase tracking-widest pb-1 opacity-90">
                  Pathway 02 / Specialized
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium leading-[1.15] mb-5 max-w-[320px]">
                  Specialist Therapies & Advanced Restoration
                </h3>
                <p className="text-accent-light/80 text-sm sm:text-base leading-relaxed mb-8 max-w-[320px] font-light">
                  Targeted clinical interventions including gentle cosmetic
                  dentistry, vision diagnostic errors refraction, and nutrient
                  IV drips.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 mt-6 relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex gap-3 items-start text-sm">
                    <Check
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="font-medium text-white/90">
                      Crowns, fillings & Orthodontic Braces
                    </span>
                  </div>
                  <div className="flex gap-3 items-start text-sm">
                    <Check
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="font-medium text-white/90">
                      High precision optometrist eye testing
                    </span>
                  </div>
                  <div className="flex gap-3 items-start text-sm">
                    <Check
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="font-medium text-white/90">
                      Revitalizing on-side nutritional IV drips
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onNavigate("sports-injuries");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-6 w-full bg-white text-primary-dark py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-light transition-colors cursor-pointer shadow-md"
                >
                  Explore Advanced Care <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL CATALOG (Redesigned with Modern Clean Minimalist Aesthetic) */}
      <section
        id="services-section"
        className="py-16 lg:py-20 relative overflow-hidden bg-[#E5F2F2]"
      >
        {/* Fill top with a fade from the previous section's bg color */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-off-white to-transparent z-10 pointer-events-none" />

        {/* Full-section responsive background image */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#E5F2F2]">
          <div
            className="w-full h-full opacity-100 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://donotdelete.wonderlandstudio.co.za/prosperity/0b6f9b6e-bb88-47f7-bedb-a3dcda599b1b.jpeg')",
            }}
          />
        </div>

        {/* Soft immersive background mimicking the minimalist aesthetic */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F1F8F8] to-transparent z-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-20 w-full h-full flex flex-col items-center">
          {/* Header area - Centered */}
          <div className="w-full max-w-4xl text-center mb-12 lg:mb-16 flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium text-[#0A3B39] tracking-[-0.03em] leading-[1.05] mb-8 text-balance">
              Explore Our Specialist Disciplines
            </h2>

            <p className="text-[#0A3B39]/60 text-base sm:text-lg font-normal leading-[1.7] max-w-2xl mx-auto mb-10">
              Find customized care pathways designed specifically around you.
              Select clinical segments below to filter disciplines, review
              advanced diagnostics, and schedule consults.
            </p>

            {/* Pill Tabs - Modern, Rounded */}
            <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white rounded-full border border-black/5 shadow-sm">
              <button
                onClick={() => setActiveTab("medical")}
                className={`px-6 py-3 rounded-full font-sans text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeTab === "medical"
                    ? "bg-primary-dark text-white border-primary-dark shadow-md font-semibold"
                    : "bg-primary/10 text-primary-dark border-primary/5 hover:text-primary-dark hover:bg-accent-light/30 hover:border-accent-light/50"
                }`}
              >
                GP Medicine
              </button>
              <button
                onClick={() => setActiveTab("therapies")}
                className={`px-6 py-3 rounded-full font-sans text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeTab === "therapies"
                    ? "bg-primary-dark text-white border-primary-dark shadow-md font-semibold"
                    : "bg-primary/10 text-primary-dark border-primary/5 hover:text-primary-dark hover:bg-accent-light/30 hover:border-accent-light/50"
                }`}
              >
                Support Therapies
              </button>
              <button
                onClick={() => setActiveTab("specialist")}
                className={`px-6 py-3 rounded-full font-sans text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeTab === "specialist"
                    ? "bg-primary-dark text-white border-primary-dark shadow-md font-semibold"
                    : "bg-primary/10 text-primary-dark border-primary/5 hover:text-primary-dark hover:bg-accent-light/30 hover:border-accent-light/50"
                }`}
              >
                Dental & Optical
              </button>
            </div>
          </div>

          {/* Grid Area - Redesigned as a Premium Service Grid */}
          <div className="w-full relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12 w-full">
              {filteredServices.map((srv, idx) => {
                return (
                  <motion.div
                    key={srv.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8 flex flex-col h-full shadow-[0_8px_32px_0_rgba(10,59,57,0.04)] hover:shadow-[0_20px_48px_0_rgba(10,59,57,0.1)] hover:-translate-y-1 hover:bg-white/80 transition-all duration-500 group cursor-pointer"
                    onClick={() => {
                      onNavigate(srv.id as PageId);
                      // Let App trigger the modal naturally
                    }}
                  >
                    {/* Information block */}
                    <div className="flex-grow flex flex-col justify-start w-full mb-6">
                      <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#0A3B39] tracking-[-0.02em] leading-[1.2] mb-3">
                        {srv.title}
                      </h3>
                      <p className="text-[#0A3B39]/60 text-sm sm:text-[15px] leading-[1.7] font-normal line-clamp-3">
                        {srv.desc}
                      </p>
                    </div>

                    {/* Footer CTA Button */}
                    <div className="mt-auto pt-5 border-t border-[#0A3B39]/5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(srv.id as PageId);
                        }}
                        className="w-full flex items-center justify-between px-6 py-4 bg-transparent group-hover:bg-[#F37B5C] text-[#0A3B39] group-hover:text-white rounded-full transition-all duration-300 text-[12px] font-bold uppercase tracking-wider relative overflow-hidden"
                      >
                        <span className="relative z-10 transition-colors">
                          Explore Details
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#E5F2F2] group-hover:bg-white/20 flex items-center justify-center relative z-10 transition-colors">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GORGEOUS SOWETO COMMUNITY TESTIMONIALS (Chat Style Redesign) */}
      <section className="py-10 lg:py-16 relative bg-[#F1F8F8] overflow-hidden flex flex-col justify-center border-b border-primary/10">
        {/* Subtle Medical Cross Pattern Background */}
        <div
          className="absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 18V10h4v8h8v4h-8v8h-4v-8h-8v-4h8z' fill='%232c5f44' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        ></div>

        {/* Giant background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden px-4 flex flex-col gap-2">
          <h2
            className="text-[12vw] font-sans font-black text-transparent opacity-80"
            style={{ WebkitTextStroke: "2px rgba(44, 95, 68, 0.04)" }}
          >
            SAY ABOUT US!
          </h2>
        </div>

        {/* Floating swooping lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 600 C 300 200, 600 800, 1100 100"
            fill="none"
            stroke="#27A19C"
            strokeWidth="1.5"
            strokeOpacity="0.15"
          />
          <path
            d="M-200 400 C 400 800, 800 100, 1200 500"
            fill="none"
            stroke="#F1F8F8"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>

        {/* Floating WhatsApp Icons mimicking 3D elements */}
        <div className="absolute top-[15%] left-[12%] hidden lg:flex w-16 h-16 bg-gradient-to-br from-[#BED62F] to-[#BED62F] rounded-[1.3rem] shadow-[0_15px_30px_rgba(34,197,94,0.3)] items-center justify-center text-white border-b-[5px] border-[#27A19C] z-30 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </div>

        <div className="absolute bottom-[20%] right-[12%] hidden lg:flex w-20 h-20 bg-gradient-to-br from-[#BED62F] to-[#BED62F] rounded-[1.6rem] shadow-[0_20px_40px_rgba(34,197,94,0.35)] items-center justify-center text-white border-b-[6px] border-[#27A19C] z-30 animate-float-alt">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-11 h-11 ml-0.5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </div>

        <div className="absolute top-[65%] left-[15%] hidden lg:flex w-12 h-12 bg-gradient-to-br from-[#BED62F] to-[#BED62F] rounded-[1rem] shadow-[0_10px_20px_rgba(34,197,94,0.3)] items-center justify-center text-white border-b-4 border-[#27A19C] z-30 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-sans font-bold text-[#0A3B39] mb-6 tracking-tight leading-[1.1]">
              Client Feedback
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full text-xs font-bold uppercase tracking-widest text-[#0A3B39]/60 shadow-sm mb-6">
              Testimonials
            </div>
            <p className="text-[#0A3B39]/70 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Real stories of patient care, medication repeats, and wellness
              achievements in Meadowlands, Soweto.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10 max-w-3xl mx-auto overflow-hidden px-2 pb-4">
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((msg) => (
                <motion.div
                  key={msg.instanceId}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30, originX: msg.align === 'left' ? 0.2 : 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`max-w-[92%] sm:max-w-[82%] relative group w-full ${msg.align === "left" ? "self-start" : "self-end"}`}
                >
                  <div className={`p-6 sm:p-8 rounded-[2rem] relative shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] transition-shadow duration-300 border ${
                    msg.align === "left"
                      ? "bg-white rounded-tl-md border-black/5"
                      : "bg-[#E5F2F2] rounded-tr-md shadow-[0_10px_30px_-10px_rgba(44,95,68,0.12)] border-[#BED62F]/50"
                  }`}>
                    {/* Chat Tail SVG */}
                    {msg.align === "left" ? (
                      <svg
                        className="absolute -left-[14px] top-0 w-4 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
                        viewBox="0 0 18 20"
                        fill="currentColor"
                      >
                        <path d="M18 0H0C8 0 15 8 18 20V0Z" />
                      </svg>
                    ) : (
                      <svg
                        className="absolute -right-[14px] top-0 w-4 h-5 text-[#E5F2F2] drop-shadow-[0_2px_4px_rgba(44,95,68,0.06)]"
                        viewBox="0 0 18 20"
                        fill="currentColor"
                      >
                        <path d="M0 0H18C10 0 3 8 0 20V0Z" />
                      </svg>
                    )}

                    <p className={`font-sans text-[15px] sm:text-[1.05rem] leading-[1.6] mb-5 ${msg.align === "left" ? "text-[#0A3B39]/85" : "text-primary-dark/95"}`}>
                      "{msg.text}"
                    </p>

                    <div className={`flex justify-between items-end border-t pt-4 ${msg.align === "left" ? "border-black/[0.04]" : "border-primary/10"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${msg.align === "left" ? "bg-[#E5F2F2] text-primary-dark border border-black/5" : "bg-white text-primary-dark"}`}>
                          {msg.initials}
                        </div>
                        <div>
                          <h4 className={`font-sans font-bold text-sm leading-none mb-1 ${msg.align === "left" ? "text-[#0A3B39]" : "text-primary-dark"}`}>
                            {msg.name}
                          </h4>
                          <div className={`text-[9px] font-bold uppercase tracking-wider ${msg.align === "left" ? "text-[#0A3B39]/50" : "text-primary/60"}`}>
                            {msg.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-end items-end gap-1.5 shrink-0">
                        <div className="flex gap-[2px] text-[#BED62F] items-center">
                          {"★★★★★".split("").map((char, i) => (
                            <span key={i} className="text-[12px] leading-none drop-shadow-sm">
                              ★
                            </span>
                          ))}
                        </div>
                        <div className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 ${msg.align === "left" ? "text-black/30 bg-white" : "text-primary/40"}`}>
                          {msg.time}
                          {msg.align === "left" ? (
                            <CheckCircle2 className="w-3 h-3 text-primary/40" />
                          ) : (
                            <div className="flex -space-x-[5px]">
                              <Check className="w-[14px] h-[14px] text-[#27A19C]" strokeWidth={3} />
                              <Check className="w-[14px] h-[14px] text-[#27A19C]" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. PRACTITIONER TEAM PREVIEW */}
      <section className="py-10 lg:py-16 bg-[#0A3B39] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
          {/* HEADER SECTION */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start mb-20 lg:mb-32">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-10 h-[1px] bg-white/30 block"></span>
                <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                  Meet The Team
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif font-medium text-white tracking-tight leading-[1.05]">
                Expert <span className="text-[#BED62F]">Practitioners</span>,
                Dedicated to You
              </h2>
            </div>

            <div className="flex flex-col items-start lg:pt-20 max-w-lg w-full shrink-0">
              <p className="text-white/50 text-lg md:text-xl font-sans font-light leading-relaxed mb-10">
                A compassionate, highly trained clinical panel comprising family
                GP, restorative dentistry, visual optometry, and mental health
                counseling.
              </p>
              <button
                onClick={() => {
                  onNavigate("meet-the-team");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="border border-white/20 text-white font-sans font-medium px-8 py-3.5 rounded-full hover:bg-white hover:text-[#0A3B39] hover:border-white transition-all duration-300 text-sm tracking-wide"
              >
                Meet the Full Team
              </button>
            </div>
          </div>

          {/* TEAM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {teamSpotlights.map((tm, idx) => {
              const cardColors = [
                "bg-[#F1F8F8]", // Pink
                "bg-[#6E8B8A]", // Slate Blue
                "bg-[#F1F8F8]", // Beige
                "bg-[#BED62F]", // Yellow
              ];

              const cardImages = [
                "https://donotdelete.wonderlandstudio.co.za/prosperity/Dr_Phumi.jpeg",
                "https://donotdelete.wonderlandstudio.co.za/prosperity/Dr_Talifhani.jpeg",
                "https://donotdelete.wonderlandstudio.co.za/prosperity/Patrick%20Neluvhola.jpeg",
                "https://donotdelete.wonderlandstudio.co.za/prosperity/Edith%20Rapoo.jpeg",
              ];

              return (
                <div
                  key={idx}
                  className={`relative ${cardColors[idx]} px-5 sm:px-6 pt-12 pb-5 sm:pb-6 rounded-t-full rounded-b-[5rem] flex flex-col items-center text-center group ${idx % 2 !== 0 ? "lg:translate-y-16" : ""}`}
                >
                  <div className="relative z-10 flex flex-col items-center flex-grow w-full pb-8">
                    <h3 className="font-serif font-medium text-[1.65rem] text-[#0A3B39] leading-tight mb-1.5">
                      {tm.name}
                    </h3>
                    <div className="text-[#0A3B39]/70 font-sans text-sm tracking-wide mb-3">
                      {tm.role}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#0A3B39]/50 mb-6">
                      {tm.qualification}
                    </div>

                    <p className="text-[#0A3B39]/80 text-xs leading-relaxed font-medium line-clamp-4">
                      {tm.summary}
                    </p>
                  </div>

                  <div className="w-36 h-36 rounded-full overflow-hidden mt-auto mx-auto relative z-10 bg-white p-1 shadow-md border border-black/5 transition-all duration-700 pointer-events-none">
                    <img
                      src={cardImages[idx]}
                      alt={tm.name}
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-[#0A3B39] to-primary-dark text-white relative overflow-hidden">
        {/* Soft elegant glows mimicking the leaf shadows in the GreenNest CTA */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent-light/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary-light/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl font-serif font-medium mb-6 text-white leading-tight">
                Ready to Book Your Appointment?
              </h2>
              <p className="text-accent-light/80 text-sm sm:text-base leading-relaxed mb-8 font-light max-w-xl mx-auto lg:mx-0">
                Your health is your absolute greatest asset. Do not postpone
                essential screens or chronic consults. Our administrative desk is
                here to help you arrange your consult quickly.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-center lg:items-stretch xl:items-center">
                <button
                  onClick={() => onNavigate("contact")}
                  className="w-full sm:w-auto xl:w-auto bg-accent text-primary-dark font-sans font-bold px-8 py-4 text-xs tracking-wider uppercase rounded-xl hover:bg-white transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20"
                >
                  Book an Appointment
                </button>
                <a
                  href="tel:+27101012499"
                  className="w-full sm:w-auto xl:w-auto border border-white/20 text-white font-sans font-bold px-8 py-4 text-xs tracking-wider uppercase rounded-xl hover:bg-white/10 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>010 101 2499</span>
                </a>
              </div>
            </div>

            {/* Right Map & Contacts Column */}
            <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
              {/* Contacts Details */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-light mb-2">
                    Our Location
                  </div>
                  <div className="flex items-start gap-3 text-white/90">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-[13px] leading-relaxed font-light">
                      25510 Vincent Rd,<br />
                      Meadowlands West Zone 6,<br />
                      Soweto, 1852
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-light">
                    Direct Contact
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/95 text-[13px]">
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-sm">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <a href="tel:+27101012499" className="hover:underline hover:text-accent transition-colors font-medium">
                      010 101 2499
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-white/95 text-[13px]">
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <a href="https://wa.me/27672705995" target="_blank" rel="noreferrer" className="hover:underline hover:text-emerald-300 transition-colors font-medium">
                      067 270 5995
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-white/95 text-[13px]">
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-sm">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <a href="mailto:info@prosperityhealth.co.za" className="hover:underline hover:text-accent transition-colors break-all font-medium">
                      info@prosperityhealth.co.za
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="md:col-span-7 flex flex-col space-y-4">
                <div className="w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden border border-white/15 shadow-inner relative">
                  <iframe
                    src="https://maps.google.com/maps?q=25510%20Vincent%20Rd%2C%20Meadowlands%20West%20Zone%206%2C%20Soweto%2C%201852&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    title="Prosperity Medical Centre Location Map on Home"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=25510+Vincent+Rd,+Meadowlands+West+Zone+6,+Soweto,+1852"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-sans font-bold py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
                >
                  <Compass className="w-4 h-4 text-accent" />
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

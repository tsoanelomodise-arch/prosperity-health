import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Facebook,
  Instagram,
  User,
  AtSign,
  HeartPulse,
  Send,
  CheckCircle2,
  ArrowRight,
  Briefcase
} from "lucide-react";
import { PageId } from "../types";
import { servicesData } from "../data/services";

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export default function ContactView({ onNavigate }: ContactViewProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPendingActivation, setIsPendingActivation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setIsPendingActivation(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/tsoanelomodise@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          Phone: phone,
          "Service Required": service,
          Message: message || "No message provided",
          _subject: `New Booking Request: ${firstName} ${lastName} - ${service}`,
          _captcha: "false"
        })
      });

      const data = await response.json().catch(() => ({}));
      const messageLower = (data.message || "").toLowerCase();
      const isActivationIssue = response.status === 403 || messageLower.includes("activate") || messageLower.includes("activation");

      if (isActivationIssue) {
        setIsPendingActivation(true);
      } else if (response.ok && data.success !== "false") {
        setIsSuccess(true);
        // Clear Form Fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setService("");
        setMessage("");
      } else {
        // If data says "Check your email to activate"
        if (messageLower.includes("check your email") || messageLower.includes("confirm")) {
          setIsPendingActivation(true);
        } else {
          setErrorMessage(data.message || "Something went wrong. Please check if your FormSubmit email is activated.");
        }
      }
    } catch (err) {
      // Often CORS or strict browser extensions block FormSubmit unless it is activated, handle with a helper
      setErrorMessage("Network issue. If this is your first time using this email, please make sure you clicked 'Activate' in the FormSubmit.co verification email sent to tsoanelomodise@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#EFECE8] text-[#181C1A] selection:bg-[#181C1A]/10 selection:text-[#181C1A]">
      {/* Decorative Background mimicking 3D spheres & soft lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white opacity-90 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#EA9D62] opacity-[0.25] blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-white opacity-[0.95] blur-[100px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-[#C8CCB8] opacity-40 blur-[100px]" />
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION WITH IMAGE BACKGROUND */}
        <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end pb-16 md:pb-24 pt-28 md:pt-36 px-6 md:px-12 overflow-hidden mb-12 lg:mb-16 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-sm">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transform scale-[1.3] -translate-x-[10%] md:-translate-x-[15%]"
            style={{ 
              backgroundImage: "url('https://donotdelete.wonderlandstudio.co.za/prosperity/af559225-9c4a-483e-be3e-4112210767dd.jpeg')",
              backgroundPosition: "center 20%"
            }}
          />
          {/* Overlays to ensure text visibility */}
          <div className="absolute inset-0 bg-[#EFECE8] mix-blend-color opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 pb-12">
              
              {/* Left Column: Text Content */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
                <h1 className="text-5xl sm:text-[4.5rem] lg:text-[5.5rem] font-sans font-medium tracking-tight leading-[1] mb-6 text-white max-w-4xl">
                  Get In Touch
                </h1>
                <p className="text-[17px] sm:text-[19px] leading-[1.6] max-w-xl text-white/80 font-medium">
                  Reach out to coordinate an appointment, discuss clinical rates, or
                  book a specialist screening. Our dedicated patient-care team is here
                  to support you at every phase.
                </p>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center relative z-20">
                <div className="bg-[#EFECE8] p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col group">
                  
                  {/* Decorative highlight inside form */}
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/70 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none hidden md:block" />

                  <div className="relative z-10 mb-6">
                    <h3 className="text-[26px] md:text-[28px] font-sans font-medium tracking-tight text-[#181C1A]">
                      Book My Appointment
                    </h3>
                  </div>

                  {isSuccess ? (
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center bg-white/60 border border-white/50 rounded-[1.5rem] p-8 animate-fade-in shadow-sm min-h-[350px]">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#181C1A] mb-5 shadow-sm border border-white">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-[20px] font-sans font-semibold text-[#181C1A] mb-2">
                        Request Transmitted
                      </h4>
                      <p className="text-[#181C1A]/70 text-[14px] font-medium leading-relaxed max-w-[280px] mb-4">
                        We have received your query. Our desk nurse will contact you shortly to lock in your consult timeslot.
                      </p>
                      <p className="text-amber-800 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-[1rem] text-[12px] font-medium max-w-[280px] mb-6">
                        ⚠️ <strong>Admin Notice:</strong> If emails are not received, please check <strong>tsoanelomodise@gmail.com</strong> for a FormSubmit confirmation email and click "Activate".
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-[#181C1A] hover:bg-black text-white font-sans font-medium px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2 text-[14px]"
                      >
                        Submit Another <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : isPendingActivation ? (
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center bg-amber-50/60 border border-amber-200 rounded-[1.5rem] p-6 sm:p-8 animate-fade-in shadow-sm min-h-[350px]">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4 shadow-sm border border-white">
                        <Mail className="w-8 h-8" />
                      </div>
                      <h4 className="text-[18px] sm:text-[20px] font-sans font-bold text-amber-950 mb-2">
                        Activation Required
                      </h4>
                      <p className="text-amber-900/80 text-[13px] sm:text-[14px] font-medium leading-relaxed max-w-[320px] mb-5">
                        FormSubmit requires a one-time activation. We have submitted your request, but the administrator must authorize the receiver email first:
                      </p>
                      <ol className="text-left text-amber-950/80 text-[12px] font-medium space-y-2 max-w-[280px] mb-6 bg-white/50 p-4 rounded-[1rem] border border-amber-200/50">
                        <li className="flex gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                          <span>Open <strong>tsoanelomodise@gmail.com</strong> inbox</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                          <span>Look for the <strong>FormSubmit</strong> email</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                          <span>Click the <strong>"Activate Form"</strong> button</span>
                        </li>
                      </ol>
                      <button
                        onClick={() => setIsPendingActivation(false)}
                        className="bg-amber-900 hover:bg-amber-950 text-white font-sans font-medium px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2 text-[14px]"
                      >
                        Return to Booking <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 relative z-10 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* First Name */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <User className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="first-name"
                              name="firstName"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="First name"
                              required
                              className="w-full bg-white/60 hover:bg-white/80 focus:bg-white pl-[44px] pr-4 py-[12px] rounded-full border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] placeholder:text-[#181C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="last-name" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <User className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="last-name"
                              name="lastName"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Last name"
                              required
                              className="w-full bg-white/60 hover:bg-white/80 focus:bg-white pl-[44px] pr-4 py-[12px] rounded-full border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] placeholder:text-[#181C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                            <AtSign className="w-[16px] h-[16px]" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            required
                            className="w-full bg-white/60 hover:bg-white/80 focus:bg-white pl-[44px] pr-4 py-[12px] rounded-full border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] placeholder:text-[#181C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Phone Number */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <Phone className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="067 270 5995"
                              required
                              className="w-full bg-white/60 hover:bg-white/80 focus:bg-white pl-[44px] pr-4 py-[12px] rounded-full border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] placeholder:text-[#181C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Service Select */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="service-select" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Service Required
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <HeartPulse className="w-[16px] h-[16px]" />
                            </div>
                            <select
                              id="service-select"
                              name="service"
                              value={service}
                              onChange={(e) => setService(e.target.value)}
                              required
                              className="w-full bg-white/60 hover:bg-white/80 focus:bg-white pl-[44px] pr-8 py-[12px] rounded-full border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 appearance-none cursor-pointer shadow-sm text-ellipsis"
                            >
                              <option value="" disabled className="text-[#181C1A]/40">Select...</option>
                              {Object.values(servicesData).map((s) => (
                                <option key={s.id} value={s.title} className="text-[#181C1A]">
                                  {s.title}
                                </option>
                              ))}
                              <option value="General Consult" className="text-[#181C1A]">General Consult</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#181C1A]/40">
                              <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message Area */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="msg-text" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                          Message (Optional)
                        </label>
                        <textarea
                          id="msg-text"
                          name="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ideal times, symptoms..."
                          rows={2}
                          className="w-full bg-white/60 hover:bg-white/80 focus:bg-white px-5 py-3 rounded-[1rem] border border-white/60 focus:border-white transition-all text-[#181C1A] font-medium text-[14px] placeholder:text-[#181C1A]/40 focus:outline-none focus:ring-2 focus:ring-[#181C1A]/10 resize-none shadow-sm"
                        />
                      </div>

                      {errorMessage && (
                        <div className="p-4 bg-red-500/10 text-red-600 rounded-[1rem] text-[13px] font-medium border border-red-500/10 text-center animate-fade-in">
                          {errorMessage}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                         <button
                           type="submit"
                           disabled={isSubmitting}
                           className="w-full bg-[#181C1A] hover:bg-black disabled:bg-[#181C1A]/50 text-white font-sans font-semibold py-3.5 rounded-full flex items-center justify-center px-6 shadow-md transition-all duration-300 cursor-pointer text-[14px] disabled:cursor-not-allowed group gap-2"
                         >
                           {isSubmitting ? (
                             <span>Scheduling...</span>
                           ) : (
                             <>
                               <span>Send Request</span>
                               <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                             </>
                           )}
                         </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
          
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Practice Info Panel (Redesigned per reference) */}
            <div className="lg:col-span-12 xl:col-span-12 w-full flex flex-col order-1 lg:order-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-[#F9F9F8] rounded-[2rem] border border-[#181C1A]/[0.06] overflow-hidden shadow-sm relative z-10 w-full mb-12">
                
                {/* Giant faded P matching the reference 'M' in background */}
                <div className="hidden lg:block absolute right-[5%] bottom-[5%] text-[#181C1A]/[0.02] text-[400px] leading-none font-sans font-medium pointer-events-none select-none z-0">
                  P
                </div>

                {/* Column 1: Intro (Spans 6 columns) */}
                <div className="lg:col-span-6 p-10 lg:p-14 xl:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#181C1A]/[0.06] relative z-10 bg-[#F9F9F8]">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#181C1A]/60 mb-8">
                      Clinic Details
                    </h4>
                    <h2 className="text-[40px] xl:text-[46px] font-sans font-medium tracking-tight leading-[1.05] text-[#181C1A] mb-6">
                      Soweto<br/>Practice Hub
                    </h2>
                    <p className="text-[15px] xl:text-[16px] leading-[1.7] text-[#181C1A]/70 font-medium max-w-[90%]">
                      We are conveniently located directly in Meadowlands, Soweto. You
                      are welcome to walk in for dispensary queries or coordinate via
                      telephone.
                    </p>
                  </div>

                  {/* Social Handles in same column */}
                  <div className="mt-8">
                    <div className="flex flex-row gap-3">
                      <a
                        href="https://www.facebook.com/100063518685406/"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-center w-10 h-10 rounded-full border border-[#181C1A]/10 text-[#181C1A] hover:bg-[#181C1A]/5 transition-colors"
                        aria-label="Follow on Facebook"
                      >
                        <Facebook className="w-[18px] h-[18px]" />
                      </a>
                      <a
                        href="https://www.instagram.com/prosperityhealth_za/"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-center w-10 h-10 rounded-full border border-[#181C1A]/10 text-[#181C1A] hover:bg-[#181C1A]/5 transition-colors"
                        aria-label="Follow on Instagram"
                      >
                        <Instagram className="w-[18px] h-[18px]" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Column 2: Contact Items 1 & 2 */}
                <div className="lg:col-span-3 p-10 lg:p-14 xl:px-12 flex flex-col gap-12 border-b lg:border-b-0 lg:border-r border-[#181C1A]/[0.06] relative z-10 bg-transparent lg:bg-[#F9F9F8]">
                  {/* Item: Address */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 mt-0.5 relative flex items-center justify-center w-9 h-9 rounded-full border border-[#181C1A]/10 bg-white shadow-sm">
                      <MapPin className="w-4 h-4 text-[#181C1A]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <h4 className="text-[14px] font-bold text-[#181C1A] leading-none">Clinic Address</h4>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=25510+Vincent+Rd,+Meadowlands+West+Zone+6,+Soweto,+1852"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] leading-[1.6] text-[#181C1A]/60 hover:text-[#181C1A] transition-colors mt-1"
                      >
                        25510 Vincent Rd,<br/>
                        Meadowlands West Zone 6, Soweto, 1852
                      </a>
                    </div>
                  </div>

                  {/* Item: Landline */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 mt-0.5 relative flex items-center justify-center w-9 h-9 rounded-full border border-[#181C1A]/10 bg-white shadow-sm">
                      <Phone className="w-4 h-4 text-[#181C1A]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <h4 className="text-[14px] font-bold text-[#181C1A] leading-none">Practice Landline</h4>
                      <a
                        href="tel:+27101012499"
                        className="text-[13px] leading-[1.6] text-[#181C1A]/60 hover:text-[#181C1A] transition-colors mt-1 block"
                      >
                        010 101 2499
                      </a>
                    </div>
                  </div>
                </div>

                {/* Column 3: Contact Items 3 & 4 */}
                <div className="lg:col-span-3 p-10 lg:p-14 xl:px-12 flex flex-col gap-12 relative z-10 bg-transparent lg:bg-[#F9F9F8]">
                  {/* Item: Email */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 mt-0.5 relative flex items-center justify-center w-9 h-9 rounded-full border border-[#181C1A]/10 bg-white shadow-sm">
                      <Mail className="w-4 h-4 text-[#181C1A]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <h4 className="text-[14px] font-bold text-[#181C1A] leading-none">Administrative Email</h4>
                      <a
                        href="mailto:info@prosperityhealth.co.za"
                        className="text-[13px] leading-[1.6] text-[#181C1A]/60 hover:text-[#181C1A] transition-colors mt-1 break-all block"
                      >
                        info@prosperityhealth.co.za
                      </a>
                    </div>
                  </div>

                  {/* Item: WhatsApp */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 mt-0.5 relative flex items-center justify-center w-9 h-9 rounded-full border border-[#181C1A]/10 bg-white shadow-sm">
                      <MessageSquare className="w-4 h-4 text-[#181C1A]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <h4 className="text-[14px] font-bold text-[#181C1A] leading-none">WhatsApp Channel</h4>
                      <a
                        href="https://wa.me/27672705995"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] leading-[1.6] text-[#181C1A]/60 hover:text-[#181C1A] transition-colors mt-1 block"
                      >
                        067 270 5995
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* GOOGLE MAPS IFRAME */}
          <div className="mt-8 lg:mt-12 bg-white/40 backdrop-blur-[30px] border border-white/60 p-3 sm:p-4 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.03)] h-[400px] md:h-[480px]">
            <iframe
              src="https://maps.google.com/maps?q=25510%20Vincent%20Rd%2C%20Meadowlands%20West%20Zone%206%2C%20Soweto%2C%201852&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              className="rounded-[2rem] w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prosperity Health Medical Centre embedded maps location"
            />
          </div>

        </div>
      </div>
    </div>
  );
}


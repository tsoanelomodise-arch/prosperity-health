import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mail,
  Phone,
  User,
  AtSign,
  HeartPulse,
  Send,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Compass,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { servicesData } from "../data/services";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        if (messageLower.includes("check your email") || messageLower.includes("confirm")) {
          setIsPendingActivation(true);
        } else {
          setErrorMessage(data.message || "Something went wrong. Please check if your FormSubmit email is activated.");
        }
      }
    } catch (err) {
      setErrorMessage("Network issue. If this is your first time using this email, please make sure you clicked 'Activate' in the FormSubmit.co verification email sent to tsoanelomodise@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#181C1A]/40 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg md:max-w-4xl bg-[#EFECE8] rounded-[2.5rem] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.15)] overflow-hidden max-h-[90vh] flex flex-col z-10 border border-white/60"
          >
            {/* Soft decorative background glows inside the modal */}
            <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] rounded-full bg-white opacity-90 blur-[50px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[180px] h-[180px] rounded-full bg-[#EA9D62] opacity-[0.15] blur-[60px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-5 shrink-0">
              <h3 className="text-[24px] sm:text-[28px] font-sans font-medium tracking-tight text-[#181C1A]">
                Book Appointment
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-white/60 flex items-center justify-center text-[#181C1A]/60 hover:text-[#181C1A] transition-all cursor-pointer shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 overflow-y-auto flex-1 pr-1 -mr-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Left Side: Form / Success state */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center text-center bg-white/60 border border-white/50 rounded-[1.5rem] p-8 animate-fade-in shadow-sm min-h-[350px] h-full">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#181C1A] mb-5 shadow-sm border border-white">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
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
                    <div className="flex flex-col items-center justify-center text-center bg-amber-50/60 border border-amber-200 rounded-[1.5rem] p-6 sm:p-8 animate-fade-in shadow-sm min-h-[350px] h-full">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4 shadow-sm border border-white">
                        <Mail className="w-8 h-8" />
                      </div>
                      <h4 className="text-[18px] sm:text-[20px] font-sans font-bold text-amber-950 mb-2">
                        Activation Required
                      </h4>
                      <p className="text-amber-900/80 text-[13px] sm:text-[14px] font-medium leading-relaxed max-w-[320px] mb-5">
                        FormSubmit requires a one-time activation. We have submitted your request, but the administrator must authorize the receiver email first:
                      </p>
                      <ol className="text-left text-amber-950/80 text-[12px] font-medium space-y-2 max-w-[280px] mb-6 bg-white/50 p-4 rounded-[1rem] border border-amber-200/50 w-full">
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
                    <form onSubmit={handleSubmit} className="space-y-4 w-full pb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* First Name */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="modal-first-name" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <User className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="modal-first-name"
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
                          <label htmlFor="modal-last-name" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <User className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="modal-last-name"
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
                        <label htmlFor="modal-email" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                            <AtSign className="w-[16px] h-[16px]" />
                          </div>
                          <input
                            id="modal-email"
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
                          <label htmlFor="modal-phone" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <Phone className="w-[16px] h-[16px]" />
                            </div>
                            <input
                              id="modal-phone"
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

                        {/* Service Required */}
                        <div className="flex flex-col gap-1">
                          <label htmlFor="modal-service-select" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                            Service Required
                          </label>
                          <div className="relative">
                            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#181C1A]/40 pointer-events-none">
                              <HeartPulse className="w-[16px] h-[16px]" />
                            </div>
                            <select
                              id="modal-service-select"
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
                        <label htmlFor="modal-msg-text" className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50 pl-4">
                          Message (Optional)
                        </label>
                        <textarea
                          id="modal-msg-text"
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
                          className="w-full bg-[#181C1A] hover:bg-black text-white font-sans font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-[14px] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Booking Request</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Right Column: Google Map with Pin & Location details */}
                <div className="md:col-span-5 flex flex-col justify-between bg-white/40 border border-white/50 rounded-[2rem] p-5 relative overflow-hidden h-full min-h-[350px] md:min-h-auto">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-white/60 opacity-60 blur-[30px] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#181C1A]/5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#181C1A]/70 border border-[#181C1A]/10 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>Our Location</span>
                      </div>
                      <h4 className="text-[18px] font-sans font-bold text-[#181C1A] tracking-tight mb-2">
                        Prosperity Medical Centre
                      </h4>
                      <p className="text-[#181C1A]/60 text-[13px] font-medium leading-relaxed mb-4">
                        25510 Vincent Rd,<br />
                        Meadowlands West Zone 6,<br />
                        Soweto, 1852
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#181C1A]/10 space-y-2.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#181C1A]/50">
                          Direct Contact
                        </div>
                        <div className="flex items-center gap-3 text-[#181C1A]/85 text-[13px] font-medium">
                          <div className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                            <Phone className="w-4 h-4" />
                          </div>
                          <a href="tel:+27101012499" className="hover:underline hover:text-primary transition-colors">
                            010 101 2499
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-[#181C1A]/85 text-[13px] font-medium">
                          <div className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <a href="https://wa.me/27672705995" target="_blank" rel="noreferrer" className="hover:underline hover:text-emerald-700 transition-colors">
                            067 270 5995 (WhatsApp)
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-[#181C1A]/85 text-[13px] font-medium">
                          <div className="w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                            <Mail className="w-4 h-4" />
                          </div>
                          <a href="mailto:info@prosperityhealth.co.za" className="hover:underline hover:text-primary transition-colors break-all">
                            info@prosperityhealth.co.za
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Google Maps iFrame */}
                    <div className="w-full flex-1 min-h-[180px] rounded-[1.5rem] overflow-hidden border border-white/80 shadow-md relative group">
                      <iframe
                        src="https://maps.google.com/maps?q=25510%20Vincent%20Rd%2C%20Meadowlands%20West%20Zone%206%2C%20Soweto%2C%201852&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        title="Prosperity Medical Centre Location Map"
                      />
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=25510+Vincent+Rd,+Meadowlands+West+Zone+6,+Soweto,+1852"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-white hover:bg-white/80 text-[#181C1A] border border-white/80 font-sans font-bold py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 text-[13px]"
                      >
                        <Compass className="w-4 h-4 text-accent" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

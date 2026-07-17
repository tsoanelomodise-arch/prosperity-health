import { motion } from "motion/react";
import { practitioners, supportStaff } from "../data/practitioners";
import { PageId } from "../types";
import { ArrowRight, Star } from "lucide-react";

interface TeamViewProps {
  onNavigate: (page: PageId) => void;
}

export default function TeamView({ onNavigate }: TeamViewProps) {
  return (
    <div className="bg-[#F4F3F0] min-h-screen font-sans text-[#152C22] selection:bg-[#152C22] selection:text-[#F4F3F0]">
      {/* PAGE HERO */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage:
              "url('https://donotdelete.wonderlandstudio.co.za/prosperity/177d3dc2-f2c0-4648-aa2b-d837e104ada0.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col justify-center min-h-[50vh]">
          <div className="max-w-2xl py-12">
            <h1 className="text-[4rem] sm:text-[6.5rem] lg:text-[8rem] leading-[0.9] font-bold tracking-tight mb-8">
              Meet <br />
              <span className="font-serif italic font-normal text-[#152C22]/90">
                Our
              </span>
              <br />
              Professionals.
            </h1>
            <p className="text-[17px] sm:text-[19px] leading-relaxed font-medium text-[#152C22]/80 max-w-md">
              Meet the dedicated healthcare practitioners at Prosperity Health
              Medical Centre. Expert GPs, dental surgeons, visual optometrists,
              counselors, and staff coordinate directly to promote your complete
              wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* PRACTITIONERS LIST */}
      <section className="pb-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {practitioners.map((pr, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-[2.5rem] overflow-hidden flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 shadow-[0_20px_40px_rgba(0,0,0,0.02)] border border-black/5`}
              >
                {/* Visual Half */}
                <div
                  className="w-full lg:w-[45%] min-h-[380px] lg:min-h-[500px] relative flex flex-col items-center justify-center text-white overflow-hidden group bg-[#152C22] p-8 sm:p-12"
                >
                  {/* Decorative background elements to elevate the smaller portrait frame */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                  <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-white/5 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute w-96 h-96 sm:w-[420px] sm:h-[420px] rounded-full border border-white/[0.03] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  <div className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.02] pointer-events-none" />

                  {pr.image ? (
                    <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-emerald-950/50">
                      <img
                        src={pr.image}
                        alt={pr.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-emerald-950/50">
                      <div className={`absolute inset-0 bg-gradient-to-br ${pr.avatarGradient} opacity-90`} />
                      <span className="relative z-10 text-4xl sm:text-5xl font-serif font-bold text-white/90">
                        {pr.avatarText}
                      </span>
                    </div>
                  )}

                  <div className="text-center relative z-10 mt-6 md:mt-8">
                    <div className="inline-flex bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border border-white/20 text-white/90">
                      {pr.role}
                    </div>
                  </div>
                </div>

                {/* Text Half */}
                <div className="w-full lg:w-[55%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <h3 className="text-4xl sm:text-[3rem] leading-[1.1] font-bold tracking-tight mb-4">
                    {pr.name.split(" ")[0]}{" "}
                    <span className="font-serif italic font-normal text-[#152C22]/80">
                      {pr.name.split(" ").slice(1).join(" ")}
                    </span>
                  </h3>

                  <div className="mb-6 pb-6 border-b border-black/10">
                    <p className="text-[14px] text-[#152C22]/60 font-semibold uppercase tracking-wider mb-2">
                      Qualifications
                    </p>
                    <p className="text-[17px] font-serif text-[#152C22]/90">
                      {pr.qualifications}
                    </p>
                  </div>

                  <p className="text-[#152C22]/70 text-[16px] sm:text-[17px] leading-[1.8] mb-10 max-w-xl">
                    {pr.bio}
                  </p>

                  <div>
                    <button
                      onClick={() => onNavigate("contact")}
                      className="group flex items-center justify-between w-fit gap-6 bg-[#F4F3F0] hover:bg-[#152C22] hover:text-[#F4F3F0] px-6 py-4 rounded-[1.5rem] transition-colors duration-300 font-semibold text-[15px]"
                    >
                      Request Consultation
                      <div className="bg-white group-hover:bg-[#F4F3F0]/20 text-[#152C22] group-hover:text-white rounded-full p-2 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SUPPORT ADMINISTRATIVE PANEL */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-[#152C22] text-[#F4F3F0] rounded-[2.5rem] p-8 sm:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10">
              <span className="inline-block border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-[13px] font-semibold mb-8">
                Support Staff
              </span>
              <h2 className="text-4xl sm:text-[3.5rem] leading-[1.1] font-bold tracking-tight mb-6">
                The Heart of
                <br />
                <span className="font-serif italic font-normal text-white/80">
                  Our Practice
                </span>
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed max-w-sm">
                Healthcare runs smoothly because of coordinates. Reach out to
                our assistance team for help regarding claims, files, or
                appointment adjustments.
              </p>
            </div>
            <div className="relative z-10 mt-12 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 rotate-45 text-white/50" />
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-4 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {supportStaff.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-[#F4F3F0]/50 rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#F4F3F0] transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-xl">
                      {idx === 0 ? "👩‍⚕️" : "👩‍💼"}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">
                      {st.name}
                    </h3>
                    <div className="text-[#152C22]/60 text-sm font-semibold tracking-wide uppercase mb-6">
                      {st.role}
                    </div>
                  </div>
                  <p className="text-[#152C22]/70 text-[15px] leading-[1.7]">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA BANNER */}
      <section className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto bg-[#152C22] text-[#F4F3F0] rounded-[2.5rem] p-8 sm:p-20 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#152C22] via-[#152C22]/80 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight mb-8">
              Are You Ready to <br />
              <span className="font-serif italic font-normal text-white/80">
                Schedule Your Visit?
              </span>
            </h2>
            <p className="text-white/70 text-[17px] sm:text-[19px] leading-relaxed mx-auto max-w-xl mb-12">
              Whether you need a dental screening, eyes tested, deep wellness
              tests, or a general medicine consult, we are dedicated to support
              you.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-[#F4F3F0] text-[#152C22] font-semibold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 flex items-center justify-center gap-3 mx-auto text-[16px]"
            >
              Go to Booking Page
              <div className="bg-[#152C22]/5 p-1.5 rounded-full">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

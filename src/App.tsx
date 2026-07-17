import { useState, useEffect } from "react";
import { PageId } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import TeamView from "./views/TeamView";
import ServiceDetailView from "./views/ServiceDetailView";
import ContactView from "./views/ContactView";
import BookingModal from "./components/BookingModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Back-to-top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [currentPage]);

  // Handle direct navigation switches
  const renderCurrentView = () => {
    const isService = !["home", "meet-the-team", "contact"].includes(
      currentPage,
    );

    return (
      <>
        {/* Always render HomeView when on home or a service modal is open */}
        {(currentPage === "home" || isService) && (
          <HomeView onNavigate={setCurrentPage} />
        )}
        {currentPage === "meet-the-team" && (
          <TeamView onNavigate={setCurrentPage} />
        )}
        {currentPage === "contact" && (
          <ContactView onNavigate={setCurrentPage} />
        )}

        {/* Render Service Modal */}
        {isService && (
          <ServiceDetailView
            serviceId={currentPage}
            onNavigate={setCurrentPage}
          />
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F1F8F8] text-text">
      {/* Dynamic Header Navbar with Page switching binds */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main content body spacing padded for fixed header positions */}
      <main className="flex-grow">{renderCurrentView()}</main>

      {/* Unified Practice footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

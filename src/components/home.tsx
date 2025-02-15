import React from "react";
import Header from "./Header";
import EventsFeed from "./EventsFeed";
import CreateEventForm from "./CreateEventForm";
import { motion } from "framer-motion";
import type { EventFormData } from "./CreateEventForm";
import EventDetails from "./EventDetails";
import EventManagement from "./EventManagement";

interface HomeProps {
  onEventClick?: (eventId: string) => void;
}

const Home = ({ onEventClick = () => {} }: HomeProps) => {
  const [isCreateEventOpen, setIsCreateEventOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(
    null,
  );
  const [showEventManagement, setShowEventManagement] = React.useState(false);
  const [showTicket, setShowTicket] = React.useState(false);
  const [showQRScanner, setShowQRScanner] = React.useState(false);
  const [currentTicket, setCurrentTicket] = React.useState(null);

  const handleCreateEvent = async (data: EventFormData) => {
    // TODO: Implement event creation with Supabase
    console.log("Creating event:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Header onCreateEvent={() => setIsCreateEventOpen(true)} />
      <main className="pt-16">
        <EventsFeed onEventClick={(id) => setSelectedEventId(id)} />
      </main>

      <CreateEventForm
        open={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onSubmit={handleCreateEvent}
      />

      {selectedEventId && !showEventManagement && (
        <EventDetails
          event={{
            title: "TOXIC FRIDAY",
            date: "Friday 17, Jan",
            time: "8 PM to 11:30 pm",
            location:
              "4.9 km • 14 Pattrakar Colony, Saket, Near Starbucks, Indore",
            description:
              "Get Ready for an Unforgettable Night at The Kai Room! Live Performance by Christian Craken: Prepare for an electrifying night as Christian Craken takes the stage",
            host: {
              id: "1",
              name: "Jaydeep",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=host",
            },
            images: [
              "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
              "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
              "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
            ],
            ageRestriction: "16 yrs & above",
            isHost: true,
          }}
          onClose={() => setSelectedEventId(null)}
          onManageEvent={() => setShowEventManagement(true)}
        />
      )}

      {showEventManagement && (
        <EventManagement
          onClose={() => setShowEventManagement(false)}
          onScanQR={() => setShowQRScanner(true)}
        />
      )}

      {showTicket && currentTicket && (
        <EventTicket
          ticket={currentTicket}
          onClose={() => setShowTicket(false)}
          onShare={() => {
            // Implement share functionality
            if (navigator.share) {
              navigator.share({
                title: currentTicket.eventTitle,
                text: `My ticket for ${currentTicket.eventTitle}\nBooking ID: ${currentTicket.bookingId}`,
                url: window.location.href,
              });
            }
          }}
        />
      )}

      {showQRScanner && (
        <QRScanner
          onClose={() => setShowQRScanner(false)}
          onScan={(bookingId) => {
            // TODO: Validate ticket in database
            console.log("Scanned ticket:", bookingId);
            setShowQRScanner(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default Home;

import React from "react";
import EventCard from "./EventCard";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  imageUrl: string;
  isGoing: boolean;
  isHost?: boolean;
}

interface EventsFeedProps {
  events?: Event[];
  onEventClick?: (eventId: string) => void;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    isHost: true,
    title: "Summer Music Festival",
    date: "June 15, 2024",
    location: "Central Park, NY",
    attendees: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
    isGoing: false,
  },
  {
    id: "2",
    title: "Tech Conference 2024",
    date: "July 10, 2024",
    location: "Convention Center, SF",
    attendees: 156,
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    isGoing: true,
  },
  {
    id: "3",
    title: "Food & Wine Festival",
    date: "August 5, 2024",
    location: "Downtown Plaza, LA",
    attendees: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
    isGoing: false,
  },
];

const EventsFeed = ({
  events = defaultEvents,
  onEventClick = () => {},
}: EventsFeedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8 bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EventCard
              title={event.title}
              date={event.date}
              location={event.location}
              attendees={event.attendees}
              imageUrl={event.imageUrl}
              isGoing={event.isGoing}
              onClick={() => onEventClick(event.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventsFeed;

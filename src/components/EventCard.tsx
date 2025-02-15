import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  title?: string;
  date?: string;
  location?: string;
  attendees?: number;
  imageUrl?: string;
  isGoing?: boolean;
  onClick?: () => void;
}

const EventCard = ({
  title = "Summer Music Festival",
  date = "June 15, 2024",
  location = "Central Park, NY",
  attendees = 42,
  imageUrl = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
  isGoing = false,
  onClick = () => {},
}: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white font-light"
    >
      <Card className="overflow-hidden cursor-pointer" onClick={onClick}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{date}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{attendees} attending</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            variant={isGoing ? "secondary" : "default"}
            className="w-full"
          >
            {isGoing ? "Going ✓" : "Join Event"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;

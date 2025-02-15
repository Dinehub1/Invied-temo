import React from "react";
import { Button } from "./ui/button";
import { CalendarDays, MapPin, ChevronDown, Share2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface EventDetailsProps {
  event?: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    host: {
      id: string;
      name: string;
      avatar: string;
    };
    images: string[];
    ageRestriction?: string;
    isHost?: boolean;
  };
  onClose?: () => void;
  onManageEvent?: () => void;
}

const EventDetails = ({
  event = {
    title: "TOXIC FRIDAY",
    date: "Friday 17, Jan",
    time: "8 PM to 11:30 pm",
    location: "4.9 km • 14 Pattrakar Colony, Saket, Near Starbucks, Indore",
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
  },
  onClose = () => {},
  onManageEvent = () => {},
}: EventDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="relative h-[40vh] bg-black">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <Button
          variant="ghost"
          className="absolute top-4 left-4 text-white"
          onClick={onClose}
        >
          ←
        </Button>
        <Button variant="ghost" className="absolute top-4 right-4 text-white">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 bg-background rounded-t-xl -mt-6">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-2">
              <img
                src={event.host.avatar}
                alt={event.host.name}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-muted-foreground">Host - {event.host.name}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">{event.location}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Event Guide</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Age Restriction:</span>
              <span>{event.ageRestriction}</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Images</h2>
            <div className="grid grid-cols-3 gap-2">
              {event.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold flex items-center justify-between">
              Frequently Asked Questions
              <ChevronDown className="h-5 w-5" />
            </h2>
            <h2 className="text-lg font-semibold flex items-center justify-between">
              Terms & Conditions
              <ChevronDown className="h-5 w-5" />
            </h2>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        {event.isHost ? (
          <Button
            className="w-full bg-[#00B37D] hover:bg-[#00956A] text-white"
            size="lg"
            onClick={onManageEvent}
          >
            Manage Event
          </Button>
        ) : (
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              // Generate booking ID and show ticket
              const bookingId = `TICKET-${Math.floor(1000 + Math.random() * 9000)}`;
              // TODO: Save to database and show ticket
            }}
          >
            Join Event
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;

import React from "react";
import { Button } from "./ui/button";
import { QRCode } from "@zxing/library";
import { Share2, Download } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface EventTicketProps {
  ticket?: {
    bookingId: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    guestName: string;
    ticketType?: string;
    qrData?: string;
  };
  onClose?: () => void;
  onShare?: () => void;
}

const EventTicket = ({
  ticket = {
    bookingId: "TICKET-1234",
    eventTitle: "Summer Music Festival",
    eventDate: "June 15, 2024",
    eventTime: "2:00 PM - 10:00 PM",
    eventLocation: "Central Park, NY",
    guestName: "John Doe",
    ticketType: "General Admission",
    qrData: "TICKET-1234",
  },
  onClose = () => {},
  onShare = () => {},
}: EventTicketProps) => {
  return (
    <div className="fixed inset-0 bg-[#00B37D] z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white rounded-lg bg-white/20"
          onClick={onClose}
        >
          ←
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white rounded-lg bg-white/20"
            onClick={onShare}
          >
            <Share2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white rounded-lg bg-white/20"
          >
            <Download className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-white rounded-t-3xl">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{ticket.eventTitle}</h1>
            <p className="text-gray-500">{ticket.eventDate}</p>
            <p className="text-gray-500">{ticket.eventTime}</p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <canvas
                ref={(canvas) => {
                  if (canvas) {
                    const qr = new QRCode();
                    qr.encode(ticket.qrData || "");
                    const matrix = qr.getMatrix();

                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                      const size = 200;
                      const cellSize = size / matrix.length;

                      canvas.width = size;
                      canvas.height = size;

                      ctx.fillStyle = "#FFFFFF";
                      ctx.fillRect(0, 0, size, size);

                      ctx.fillStyle = "#000000";
                      matrix.forEach((row, y) => {
                        row.forEach((cell, x) => {
                          if (cell === 1) {
                            ctx.fillRect(
                              x * cellSize,
                              y * cellSize,
                              cellSize,
                              cellSize,
                            );
                          }
                        });
                      });
                    }
                  }
                }}
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-mono font-bold">{ticket.bookingId}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Guest Name</p>
              <p className="font-semibold">{ticket.guestName}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Ticket Type</p>
              <p className="font-semibold">{ticket.ticketType}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{ticket.eventLocation}</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Present this QR code at the event entrance</p>
            <p>This ticket is non-transferable</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventTicket;

import React from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Share2,
  Settings,
  Copy,
  Ban,
  PauseCircle,
  Trash2,
  Users,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";

interface Member {
  id: string;
  name: string;
  status: "going" | "not_going" | "maybe";
  avatar: string;
}

interface EventManagementProps {
  event?: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    host: {
      name: string;
      avatar: string;
    };
    members: Member[];
    images: string[];
    isPublic: boolean;
  };
  onClose?: () => void;
}

const EventManagement = ({
  event = {
    id: "1",
    title: "Summer Music Festival",
    description: "A fantastic summer music festival featuring top artists",
    date: "June 15, 2024",
    time: "2:00 PM - 10:00 PM",
    location: "Central Park, NY",
    host: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=host",
    },
    members: [
      {
        id: "1",
        name: "Alice Smith",
        status: "going",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        id: "2",
        name: "Bob Johnson",
        status: "maybe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        id: "3",
        name: "Carol White",
        status: "not_going",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    ],
    isPublic: true,
  },
  onClose = () => {},
}: EventManagementProps) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);

  const handleShareEvent = () => {
    // Implement share functionality
    const shareUrl = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="fixed inset-0 bg-[#00B37D] z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white rounded-lg bg-white/20"
          onClick={onClose}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="text-[#00B37D] bg-white hover:bg-white/90 gap-2"
            onClick={handleShareEvent}
          >
            <Share2 className="h-4 w-4" />
            Share Event
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white rounded-lg bg-white/20"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl overflow-hidden">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full h-14 rounded-none grid grid-cols-2 bg-transparent p-2 gap-2">
            <TabsTrigger
              value="details"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#00B37D] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#00B37D] border-2 border-[#00B37D]"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-full data-[state=active]:bg-[#00B37D] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#00B37D] border-2 border-[#00B37D]"
            >
              Members
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="details" className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
                <p className="text-gray-600">{event.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#00B37D]" />
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#00B37D]" />
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#00B37D]">
                  Event Images
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {event.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#00B37D]">Host</h2>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={event.host.avatar} />
                    <AvatarFallback>{event.host.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{event.host.name}</p>
                    <p className="text-sm text-[#00B37D]">Event Host</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#00B37D]">
                    Members
                  </h2>
                  <p className="text-sm text-gray-500">
                    {event.members.length} members
                  </p>
                </div>
                <div className="space-y-3">
                  {event.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-gray-500 capitalize">
                            {member.status.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Public Event</Label>
                <p className="text-sm text-gray-500">
                  Anyone can join with the link
                </p>
              </div>
              <Switch checked={event.isPublic} />
            </div>

            <Separator />

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Event
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowCancelDialog(true)}
              >
                <Ban className="mr-2 h-4 w-4" />
                Cancel Event
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause Replies
              </Button>

              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Event</DialogTitle>
            <DialogDescription>
              This will notify all attendees that the event has been cancelled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Back
            </Button>
            <Button variant="destructive">Cancel Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManagement;

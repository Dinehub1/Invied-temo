import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onCreateEvent?: () => void;
  title?: string;
}

const Header = ({
  onCreateEvent = () => {},
  title = "Event Management",
}: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        <Button onClick={onCreateEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>
    </header>
  );
};

export default Header;

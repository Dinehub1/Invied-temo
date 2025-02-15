import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ImageIcon, Loader2, Music, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CreateEventFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: EventFormData) => void;
}

export interface EventFormData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  playlist: string;
  images: string[];
}

const CreateEventForm = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {},
}: CreateEventFormProps) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<EventFormData>();

  const handleFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, images });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && images.length < 3) {
      const newImage = URL.createObjectURL(files[0]);
      setImages([...images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Event Name"
              {...register("name", { required: true })}
            />

            <Textarea
              placeholder="Event Description"
              {...register("description", { required: true })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !watch("startDate") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("startDate") ? (
                      format(watch("startDate"), "PPP")
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch("startDate")}
                    onSelect={(date) => setValue("startDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !watch("endDate") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("endDate") ? (
                      format(watch("endDate"), "PPP")
                    ) : (
                      <span>End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch("endDate")}
                    onSelect={(date) => setValue("endDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Input
              placeholder="Location"
              {...register("location", { required: true })}
            />

            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <Input
                placeholder="Spotify/YouTube Music Playlist URL"
                {...register("playlist")}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  disabled={images.length >= 3}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Images (Up to 3)
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={images.length >= 3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Event ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Event...
              </>
            ) : (
              "Create Event"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventForm;

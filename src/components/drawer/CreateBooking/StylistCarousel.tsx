"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Stylist {
  id: string;
  name: string;
  image: string;
}

interface StylistCarouselProps {
  stylists: Stylist[];
  selectedStylist: string;
  onStylistSelect: (stylistId: string) => void;
}

export function StylistCarousel({
  stylists,
  selectedStylist,
  onStylistSelect,
}: StylistCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, stylists.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="h-8 w-8 p-0 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className={`flex-shrink-0 w-1/4 flex flex-col items-center cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedStylist === stylist.id
                  ? "border-purple-600 bg-purple-50 shadow-md"
                  : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
              }`}
              onClick={() => onStylistSelect(stylist.id)}
            >
              <Avatar className="h-12 w-12 mb-2">
                <AvatarImage
                  src={stylist.image || "/placeholder.svg"}
                  alt={stylist.name}
                />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {stylist.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-center mb-1">
                {stylist.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

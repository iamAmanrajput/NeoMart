import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://lh3.googleusercontent.com/Udi7H20iJ-H9CWGdlASS5lZNFvBk3GsVmM6IMeux-wMdEnb7vkw9AZZL7jco4gFPrc6SFmPnkENIwetHbNwRD0ZPmAut2jnTUCk=s2400-w2400-e365-rw-v0-nu",
  "https://images.unsplash.com/photo-1740652646168-0d1557a6e8c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1730133770236-934c381e4684?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
];

const Crousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Carousel className="my-10 mx-auto w-[92.5vw] overflow-hidden rounded-3xl">
      <CarouselContent
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <CarouselItem key={index} className="min-w-full">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[60vh] object-cover rounded-3xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
      />
      <CarouselNext
        onClick={() =>
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }
      />
    </Carousel>
  );
};

export default Crousel;

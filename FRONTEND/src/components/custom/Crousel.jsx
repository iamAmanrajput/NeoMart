import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Crousel = () => {
  return (
    <Carousel className="my-10 mx-auto w-[92.5vw] overflow-x-clip sm:overflow-x-visible rounded-3xl">
      <CarouselContent>
        <CarouselItem>
          <img
            src="https://imgs.search.brave.com/mVT8Ga1xda9xoeh-ktGa-2SPH8cpq79G37GMAXzxxdg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVlYXllY3JlYXRp/dmUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzAzL0hv/dy1Uby1NYWtlLUFu/LUltYWdlLU1vZHVs/ZS1DYXJvdXNlbC13/aXRoLXRoZS1EaXZp/LUNhcm91c2VsLU1h/a2VyLVBsdWdpbi1i/eS1QZWUtQXllLUNy/ZWF0aXZlLTEuanBn"
            alt=""
            className="w-full h-[60vh] object-cover rounded-3xl"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://imgs.search.brave.com/mVT8Ga1xda9xoeh-ktGa-2SPH8cpq79G37GMAXzxxdg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVlYXllY3JlYXRp/dmUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzAzL0hv/dy1Uby1NYWtlLUFu/LUltYWdlLU1vZHVs/ZS1DYXJvdXNlbC13/aXRoLXRoZS1EaXZp/LUNhcm91c2VsLU1h/a2VyLVBsdWdpbi1i/eS1QZWUtQXllLUNy/ZWF0aXZlLTEuanBn"
            alt=""
            className="w-full h-[60vh] object-cover rounded-3xl"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://imgs.search.brave.com/mVT8Ga1xda9xoeh-ktGa-2SPH8cpq79G37GMAXzxxdg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVlYXllY3JlYXRp/dmUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzAzL0hv/dy1Uby1NYWtlLUFu/LUltYWdlLU1vZHVs/ZS1DYXJvdXNlbC13/aXRoLXRoZS1EaXZp/LUNhcm91c2VsLU1h/a2VyLVBsdWdpbi1i/eS1QZWUtQXllLUNy/ZWF0aXZlLTEuanBn"
            alt=""
            loading="lazy"
            className="w-full h-[60vh] object-cover rounded-3xl"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Crousel;

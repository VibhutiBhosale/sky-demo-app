"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ResponsiveImage from "@/components/atoms/responsive-image/ResponsiveImage";

import "./SkyCarousel.scss";

type CarouselItem = {
  image: string;
  title: string;
  description: string;
};

interface Props {
  items: CarouselItem[];
}

const SkyCarousel = ({ items }: Props) => {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <div className="sky-carousel">
      <div className="sky-carousel__viewport" ref={emblaRef}>
        <div className="sky-carousel__container">
          {items?.map((item, index) => (
            <div className="sky-carousel__slide first:pl-[476px]" key={index}>
              <ResponsiveImage
                image={{
                  baseUrl: item.image,
                  alt: item.title,
                }}
                title={item.title}
                subtitle={item.description}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="sky-carousel__controls">
        <button onClick={scrollPrev} className="nav-btn">
          ←
        </button>
        <button onClick={scrollNext} className="nav-btn">
          →
        </button>
      </div>
    </div>
  );
};

export default SkyCarousel;

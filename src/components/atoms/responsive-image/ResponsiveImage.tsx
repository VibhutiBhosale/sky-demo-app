"use client";
import { Typography } from "@mui/material";

export type HeroBannerImage = {
  baseUrl: string;
  widths?: number[]; // responsive widths e.g. [300, 660, 880, 1280]
  sizes?: string; // media-based sizes
  alt?: string;
};

type HeroBannerProps = {
  image: HeroBannerImage;
  title?: string;
  subtitle?: string;
};

export default function HeroBanner({ image, title, subtitle }: HeroBannerProps) {
  const { baseUrl, widths = [300, 660, 880], sizes } = image;

  const srcSet = widths.map(w => `${baseUrl}&width=${w} ${w}w`).join(", ");

  return (
    <>
      <div className="relative w-full max-w-[840px]">
        <div className="aspect-video">
          <img
            src={`${baseUrl}&width=1280`}
            alt={image.alt || ""}
            srcSet={srcSet}
            sizes={
              sizes ||
              "(max-width: 640px) 300px, (max-width: 960px) 660px, (max-width: 1600px) 880px, 1280px"
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0",
            }}
          />
        </div>
      </div>

      {/* Overlay Content */}
      {(title || subtitle) && (
        <div
          style={{
            color: "#fff",
          }}
          className="w-full cursor-pointer bg-[rgba(255,255,255,0.03)] shadow-[0px_6px_15px_rgba(0,0,0,0.15)] transition-shadow duration-150 ease-linear"
        >
          <div className="w-full p-6">
            {title && (
              <Typography
                variant="h6"
                fontWeight="700"
                className="text-left text-[40px] text-white"
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body1" className="text-left text-[40px] text-white">
                {subtitle}
              </Typography>
            )}
          </div>
        </div>
      )}
    </>
  );
}

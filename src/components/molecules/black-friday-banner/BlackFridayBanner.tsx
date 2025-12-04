"use client";

import Image from "next/image";
import { labels } from "@/constants";

import "./BlackFridayBanner.scss";

export default function BlackFridayBanner() {
  return (
    <section className="mx-auto grid grid-cols-1 items-center lg:grid-cols-2">
      {/* LEFT TEXT CONTENT */}
      <div>
        <div className="py-3 text-[2rem] leading-[2.5rem] md:text-[3rem] md:leading-[4rem]">
          {labels.blackFridayBanner.desc} <br />
          <span>{labels.blackFridayBanner.desc}1</span>
        </div>

        <p className="text-lg text-gray-600">{labels.blackFridayBanner.desc2}</p>

        {/* BUTTONS */}
        <div className="mt-8 mb-1 flex flex-wrap gap-4">
          <button className="primary-button">{labels.blackFridayBanner.primaryButton}</button>

          <button className="secondary-button">{labels.blackFridayBanner.secondaryButton}</button>
        </div>

        {/* TERMS */}
        <a href="#" className="text-sm leading-[1.5rem] font-bold text-[rgb(0,15,245)]">
          {labels.blackFridayBanner.termsLink}
        </a>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center lg:justify-end">
        <Image
          src="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/bltefa8774182676c24/69247df4b48b4514ed3f9f3e/2025_Q4_November_W47_Black_Friday_SIM_Banner_Desktop_v1.png"
          alt="Black Friday Offer"
          width={495}
          height={660}
          priority
        />
      </div>
    </section>
  );
}

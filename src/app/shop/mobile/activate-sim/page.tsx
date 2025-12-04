"use client";

import Image from "next/image";
import { labels } from "@/constants";

export default function ActivateSim() {
  return (
    <section className="flex w-full justify-center bg-white p-6 md:px-0">
      <div className="w-full max-w-[820px] text-left">
        <h1 className="mt-6 mb-4 bg-[linear-gradient(to_right,rgb(255,0,165)_10%,rgb(255,10,80)_50%,rgb(245,100,0)_90%)] bg-clip-text text-[4rem] leading-[5.25rem] text-transparent md:text-6xl">
          {labels.activateSim.heading}
        </h1>
        <div className="mb-8 text-lg leading-relaxed text-gray-700">
          <p className="mb-4">{labels.activateSim.desc}</p>

          <p>{labels.activateSim.stepOne}</p>
          <p>{labels.activateSim.stepTwo}</p>
        </div>

        <div className="justify-left primary-button mb-10 flex lg:max-w-[240px]">
          <a href="/login" className="">
            {labels.activateSim.signInButton}
          </a>
        </div>

        <div className="flex w-full justify-center">
          <div className="max-w-[600px] overflow-hidden rounded-2xl">
            <Image
              src="/assets/icons/sim-activation.png"
              alt="SIM Activation"
              width={900}
              height={450}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

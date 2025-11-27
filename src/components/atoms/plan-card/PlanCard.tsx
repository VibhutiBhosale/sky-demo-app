"use client";
import Image from "next/image";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const simPlanCardData = [
  {
    data: "100 MB",
    price: "£5",
    bannerData: "",
  },
  {
    data: "1 GB",
    price: "£5",
    bannerData: "Now £2 a month",
  },
  {
    data: "5 GB",
    price: "£12",
    bannerData: "Now £6 a month",
  },
  {
    data: "10 GB",
    price: "£14",
    bannerData: "Now £8 a month - our LOWEST EVER price",
  },
  {
    data: "40 GB",
    price: "£18",
    bannerData: "Now £10 a month - save £96",
  },
  {
    data: "50 GB",
    price: "£20",
    bannerData: "",
  },
  {
    data: "60 GB",
    price: "£22",
    bannerData: "",
  },
  {
    data: "Unlimited",
    price: "£29",
    bannerData: "Now £20 a month",
  },
];
export default function PlanCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [simType, setSimType] = useState("esim");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {simPlanCardData.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <div className="max-w-sm overflow-hidden rounded bg-[linear-gradient(92.7deg,_rgb(255,0,165),_rgb(245,100,0))] p-[1px] hover:shadow-[0px_10px_15px_rgba(0,0,0,0.2),_0px_0px_0px_1px_rgb(0,15,245)]">
              <div className="rounded bg-white">
                {/* TOP SECTION */}
                <div className="flex items-start justify-between px-6 py-6">
                  <div>
                    <div className="text-[32px] leading-[40px] font-bold text-[#e6007e]">
                      {item.data}
                    </div>
                    <div className="text-[16px] leading-[24px] text-gray-600">data plan</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[32px] leading-[36px] font-bold text-gray-700">
                      {item.price}
                    </div>
                    <div className="text-[16px] leading-[20px] text-gray-500">
                      a<br />
                      month
                    </div>
                  </div>
                </div>

                {/* BANNER */}
                <div
                  className={`flex h-[44px] w-full items-center gap-1 pl-5 font-medium text-white ${
                    item.bannerData
                      ? "bg-gradient-to-r from-[#e6007e] via-[#ff0069] to-[#ff7a00]"
                      : ""
                  }`}
                >
                  {item.bannerData && (
                    <>
                      <Image src="/assets/icons/sim.svg" width={24} height={24} alt="sim" />
                      <span className="text-[1.25rem] leading-[1.5rem] font-bold">
                        {item.bannerData}
                      </span>
                    </>
                  )}
                </div>

                {/* ---- COLLAPSE TRIGGER ---- */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between rounded border-0 bg-white px-6 py-6 text-left"
                >
                  <span className="text-lg font-medium text-[#0028ff]">Choose a SIM type</span>

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className={`text-gray-700 transition-transform ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                  </svg>
                </button>

                {/* ---- COLLAPSIBLE CONTENT ---- */}
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-300 pt-6" />

                    {/* eSIM OPTION */}
                    <label className="flex cursor-pointer items-center gap-4 py-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          simType === "esim" ? "border-[#0028ff]" : "border-gray-400"
                        }`}
                        onClick={() => setSimType("esim")}
                      >
                        {simType === "esim" && (
                          <span className="h-3 w-3 rounded-full bg-[#0028ff]"></span>
                        )}
                      </span>

                      <span className="text-lg text-gray-800">eSIM*</span>
                    </label>

                    {/* PLASTIC SIM */}
                    <label className="flex cursor-pointer items-center gap-4 py-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          simType === "plastic" ? "border-[#0028ff]" : "border-gray-400"
                        }`}
                        onClick={() => setSimType("plastic")}
                      >
                        {simType === "plastic" && (
                          <span className="h-3 w-3 rounded-full bg-[#0028ff]"></span>
                        )}
                      </span>

                      <span className="text-lg text-gray-800">Plastic SIM card</span>
                    </label>

                    <p className="mt-2 text-[15px] leading-[22px] text-gray-600">
                      *eSIM is built into your phone so there is no need for a plastic SIM. You’ll
                      be set up in seconds.
                    </p>

                    <button className="mt-6 w-full rounded-md bg-gradient-to-r from-[#0047ff] to-[#001aff] py-3.5 text-[20px] font-semibold text-white transition hover:opacity-90">
                      Add {item.data} plan to basket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

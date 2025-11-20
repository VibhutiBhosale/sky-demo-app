import HeroResponsiveImage from "@/components/atoms/hero-responsive-image/HeroResponsiveImage";
import "./heroBanner.scss";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden md:mb-15 lg:mb-0">
      <div className="mx-auto max-w-[1600px] lg:px-12 lg:pb-18">
        {/* ---------- IMAGE ---------- */}

        <HeroResponsiveImage />

        {/* ---------- TEXT BELOW (mobile/tablet) ---------- */}
        <div className="mt-6 block text-center lg:hidden">
          <h1 className="text-3xl font-semibold text-[#4a4a4a] sm:text-4xl">
            Unmissable Sky deals
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg text-[#4a4a4a]">
            From brilliant entertainment to super speedy broadband and great-value mobile — explore
            our best ever Black Friday.
          </p>

          <div className="mt-6">
            <button className="see-all-deals-btn">
              <span>See all deals</span>
            </button>
          </div>
        </div>

        {/* ---------- TEXT OVER IMAGE (desktop only) ---------- */}
        <div className="absolute inset-0 hidden items-center lg:flex">
          <div className="mx-auto w-full max-w-7xl px-12">
            <div className="max-w-md text-[#4a4a4a] lg:w-[32%] lg:max-w-[534px] lg:pl-[104px]">
              <h1 className="text-5xl leading-tight font-semibold">Unmissable Sky deals</h1>

              <div className="mt-4 max-w-[398px] text-lg">
                From brilliant entertainment to super speedy broadband and great-value mobile —
                explore our best ever Black Friday.
                <div className="pt-6">
                  <button className="see-all-deals-btn">
                    <span>See all deals</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

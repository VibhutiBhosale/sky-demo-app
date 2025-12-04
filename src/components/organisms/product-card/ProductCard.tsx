import "./ProductCard.scss";
import { labels } from "@/constants";

export default function ProductCard() {
  return (
    <section className="product-card-box px-6">
      <div className="relative mx-auto min-h-[500px] w-full max-w-[1248px] overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.25)] sm:min-h-[420px] md:min-h-[380px] lg:min-h-[600px]">
        {/* 🔵 FULL BACKGROUND IMAGE LAYER */}
        <div className="bg-sky-image absolute inset-0 bg-cover bg-right"></div>

        {/* 🔴 CONTENT ON TOP */}
        <div className="relative z-10 mt-0 flex h-full max-w-[500px] flex-col items-center justify-center px-6 py-10 text-center sm:px-10 md:mt-[6%] md:max-w-[340px] md:px-5 md:py-0 lg:mt-[12%] lg:max-w-[500px] lg:px-10">
          <h3 className="text-[#4a4a4a]">
            <div className="mb-1 font-bold">{labels.productCard.heading}</div>

            <div className="text-[1.75rem] leading-[2.25rem]">{labels.productCard.subHeading}</div>
          </h3>

          <p className="mt-4 text-lg leading-relaxed text-[#4a4a4a]">{labels.productCard.desc}</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <a className="button-secondary whitespace-nowrap">
              {labels.productCard.secondaryButton}
            </a>
            <a className="button-primary whitespace-nowrap">{labels.productCard.primaryButton}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

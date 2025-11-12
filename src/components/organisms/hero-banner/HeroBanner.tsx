import Image from "next/image";
import "./heroBanner.scss";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="relative h-[500px] w-full md:h-[600px] lg:h-[650px]">
          <Image
            src="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=1200"
            alt="Best Ever Black Friday"
            fill
            className="object-cover object-center"
            unoptimized={false}
            sizes="(max-width: 200px) 200px,
         (max-width: 480px) 480px,
         (max-width: 800px) 800px,
         (max-width: 1200px) 1200px,
         1600px"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-18 lg:px-24">
            <div className="max-w-md font-normal text-[rgb(74,74,74)] md:mr-3">
              <h1 className="text-center text-4xl text-[3rem] leading-[4rem] font-normal md:text-5xl">
                Unmissable Sky deals
              </h1>
              <div className="mx-auto mb-6 max-w-[398px] text-center text-lg text-[rgb(74,74,74)]">
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

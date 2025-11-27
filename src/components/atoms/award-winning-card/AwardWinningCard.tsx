import Image from "next/image";
import Grid from "@mui/material/Grid";

type AwardNetworkProps = {
  awardWinningCardData: { title: string; svg: string }[];
};

export default function AwardNetworkCard({ awardWinningCardData }: AwardNetworkProps) {
  return (
    <>
      {awardWinningCardData.map((item, index) => (
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          key={index}
        >
          <div className="flex items-center gap-4 sm:justify-start md:justify-start lg:justify-center">
            <div className="flex items-center gap-2">
              <Image src={`/assets/icons/${item.svg}`} alt="Logo" width={32} height={32} />
              <p className="text-left text-base leading-5 text-gray-700">{item.title}</p>
            </div>

            {/* VERTICAL DIVIDER (hidden on last item) */}
            {index !== awardWinningCardData.length - 1 && (
              <div className="mx-4 hidden h-[48px] w-[1px] bg-[#e2e2e2] md:block"></div>
            )}
          </div>
        </Grid>
      ))}
    </>
  );
}

import Grid from "@mui/material/Grid";
import Image from "next/image";

type ReasonsToBuyProps = {
  reasonToBuyData: { image: string; title: string; description: string }[];
};

export default function ReasonsToBuy({ reasonToBuyData }: ReasonsToBuyProps) {
  return (
    <>
      {reasonToBuyData.map((item, index) => (
        <Grid
          size={{
            xs: 12,
            lg: 3,
          }}
          key={index}
        >
          <div className="flex flex-col items-center">
            <Image src={`/assets/icons/${item.image}`} alt="Logo" width={96} height={96} />
            <h3 className="mb-4 text-lg font-semibold">{item.title}</h3>
            <p className="max-w-[260px] leading-[26px]">{item.description}</p>
          </div>
        </Grid>
      ))}
    </>
  );
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import "./product-list-card.scss";

type ProductData = {
  cardHeading: string;
  productHeading: string;
  productDesciption: string;
  productImageWidth600: string;
  productImageWidth900: string;
  primaryButton: string;
  secondaryButton: string;
};

type ProductListCardProps = {
  data: ProductData;
};

export default function ProductListCard({ data }: ProductListCardProps) {
  return (
    <Card className="card-wrapper relative flex min-h-[630px] items-center overflow-hidden md:min-h-[630px]">
      {/* Background Image Layer */}
      <CardMedia
        component="div"
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `image-set(
            url("${data.productImageWidth600}") 1x,
            url("${data.productImageWidth900}") 2x
          )`,
          backgroundPosition: "center bottom",
        }}
      />

      {/* Content Layer */}
      <CardContent className="relative z-10 h-full max-w-[500px] text-center text-[#4a4a4a] md:mt-[6%] md:max-w-[340px] md:px-5 md:py-0 lg:mt-[5%] lg:max-w-[400px] lg:px-10">
        <div className="mb-1 text-base leading-7 font-bold">{data.cardHeading}</div>

        <div className="text-[1.75rem] leading-[2.25rem]">{data.productHeading}</div>

        <div className="mt-4 text-lg leading-relaxed">{data.productDesciption}</div>

        <CardActions className="mt-6 flex flex-wrap gap-4">
          <a className="button-secondary whitespace-nowrap">{data.primaryButton}</a>
          <a className="button-primary whitespace-nowrap">{data.secondaryButton}</a>
        </CardActions>
      </CardContent>
    </Card>
  );
}

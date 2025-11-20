import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import "./product-list-card.scss";

export default function ProductListCard() {
  return (
    <Card className="card-wrapper relative flex min-h-[630px] items-center overflow-hidden md:min-h-[580px]">
      {/* Background Image Layer */}
      <CardMedia component="div" className="bg-sky-image absolute inset-0 z-0 bg-cover bg-center" />

      {/* Content Layer */}
      <CardContent className="relative z-10 h-full max-w-[500px] text-center text-[#4a4a4a] md:mt-[6%] md:max-w-[340px] md:px-5 md:py-0 lg:mt-[5%] lg:max-w-[400px] lg:px-10">
        <div className="mb-1 text-base leading-7 font-bold">Sky Sports</div>

        <div className="text-[1.75rem] leading-[2.25rem]">An unmissable November</div>

        <div className="mt-4 text-lg leading-relaxed">
          All 9 dedicated sports channels, including Premier League, F1 and more. Includes Sky
          Sports+
        </div>

        <CardActions className="mt-6 flex flex-wrap gap-4">
          <a className="button-secondary whitespace-nowrap">See all deals</a>
          <a className="button-primary whitespace-nowrap">Buy now</a>
        </CardActions>
      </CardContent>
    </Card>
  );
}

import "./homePage.scss";
import DismissibleBanner from "../components/molecules/dismissible-banner/DismissibleBanner";
import HeroBanner from "@/components/organisms/hero-banner/HeroBanner";
import ProductCard from "@/components/organisms/product-card/ProductCard";
import ProductListCard from "@/components/atoms/card/ProductListCard";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <div className="home-page bg-white">
      <DismissibleBanner content="Get that Sky feeling with Essential TV from only £15 | See all deals" />
      <HeroBanner />
      <ProductCard />
      <div className="relative mx-auto w-full max-w-[1248px] px-6">
        <Grid container>
          <Grid xs={12} md={6}>
            <ProductListCard />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

import "./homePage.scss";
import DismissibleBanner from "../components/molecules/dismissible-banner/DismissibleBanner";
import HeroBanner from "@/components/organisms/hero-banner/HeroBanner";
import ProductCard from "@/components/organisms/product-card/ProductCard";
import ProductListCard from "@/components/atoms/card/ProductListCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProductDataProps } from "@/types/types";
import SkyCarousel from "@/components/organisms/sky-carousel/SkyCarousel";
import { Typography } from "@mui/material";

const ProductsData: ProductDataProps[] = [
  {
    cardHeading: "Sky Sports",
    productHeading: "An unmissable November",
    productDesciption:
      "All 9 dedicated sports channels, including Premier League, F1 and more. Includes Sky Sports+",
    productImageWidth600:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1f0eca7d8bf31ee6/69036620d836276b9a811038/2025_Q4_Oct_phpSpotlight_desktop_Mobile_v1.png?format=webp&imageManager=true&impolicy=resize&width=600",
    productImageWidth900:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1f0eca7d8bf31ee6/69036620d836276b9a811038/2025_Q4_Oct_phpSpotlight_desktop_Mobile_v1.png?format=webp&imageManager=true&impolicy=resize&width=900",
    primaryButton: "See all deals",
    secondaryButton: "Buy now",
  },
  {
    cardHeading: "Sky Mobile",
    productHeading: "Available now from £34 a month",
    productDesciption:
      "Pair with Unlimited Data for £20 extra a month. Fair usage policy applies. See sky.com/FUP.",
    productImageWidth600:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt8fe26ce9fde33969/68d52ded7bf08e2954978337/2025_Q3_Sep_Apple_Launch_Buy_Now_Spotlight_Mobile.png?format=webp&imageManager=true&impolicy=resize&width=600",
    productImageWidth900:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt8fe26ce9fde33969/68d52ded7bf08e2954978337/2025_Q3_Sep_Apple_Launch_Buy_Now_Spotlight_Mobile.png?format=webp&imageManager=true&impolicy=resize&width=900",

    primaryButton: "See all deals",
    secondaryButton: "Buy now",
  },
  {
    cardHeading: "The brand new",
    productHeading: "Sky Glass Air TV",
    productDesciption: "The smarter TV range just got better.",
    productImageWidth600:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt02615f5206af3051/68c83599770c16b87972c113/2025_Q3_Sep_PHP_POD_Glass_Air_V1.png?format=webp&imageManager=true&impolicy=resize&width=600",
    productImageWidth900:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt02615f5206af3051/68c83599770c16b87972c113/2025_Q3_Sep_PHP_POD_Glass_Air_V1.png?format=webp&imageManager=true&impolicy=resize&width=900",

    primaryButton: "See all deals",
    secondaryButton: "Buy now",
  },
  {
    cardHeading: "Sky TV & Sky Broadband",
    productHeading: "Explore our Sky TV & broadband packages",
    productDesciption: "Pick the experience that's right for you",
    productImageWidth600:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt0934e49272409d63/68f7697ec6270abe0dfdf877/2025_Q4_Oct_w45_IA_EG_FF_POD_Card.png?format=webp&imageManager=true&impolicy=resize&width=600",
    productImageWidth900:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt0934e49272409d63/68f7697ec6270abe0dfdf877/2025_Q4_Oct_w45_IA_EG_FF_POD_Card.png?format=webp&imageManager=true&impolicy=resize&width=900",

    primaryButton: "See all deals",
    secondaryButton: "Buy now",
  },
];

const slides = [
  {
    title: "The Walking Dead: Daryl Dixon",
    description: "Available now",
    image:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt95eaa6813607b265/691def2caa13caaa843b6404/HL_Bunny_Munroe_Landscape_10968x6342px.jpg?format=webp&imageManager=true&impolicy=resize",
  },
  {
    title: "Never Mind the Buzzcocks",
    description: "Available now",
    image:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt70cb5d9e6363302a/691365b3424c3355dabc9c43/HL_KA_03_ALOTO_S20.jpg?format=webp&imageManager=true&impolicy=resize",
  },
  {
    title: "Monk",
    description: "Classic Episodes",
    image:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt5df1cfad938d9f81/68fbb32475b41366b27597b3/HL_KA_05_IT_WelcomeToDerry_Pre9pm_S01.jpg?format=webp&imageManager=true&impolicy=resize",
  },
  {
    title: "The Iris Affair",
    description: "Available now",
    image:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/bltb0db9015320147e7/68ed20a9c2504e53941fff7c/KA_08_TheIrisAffair_S01_v2.jpg?format=webp&imageManager=true&impolicy=resize",
  },
  {
    title: "The Walking Dead: Daryl Dixon",
    description: "Available now",
    image:
      "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt0d81acbd0c66eedd/68fbb325531a47ebfbbc25d8/HL_KA_03_TWD-DarylDixon_S03.jpg?format=webp&imageManager=true&impolicy=resize",
  },
];

export default function Home() {
  return (
    <div className="home-page bg-white">
      <DismissibleBanner content="Get that Sky feeling with Essential TV from only £15 | See all deals" />
      <HeroBanner />
      <ProductCard />
      <div className="relative mx-auto w-full max-w-[1248px] p-6">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {ProductsData.map((product, index) => (
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
                key={index}
              >
                <ProductListCard data={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div style={{ backgroundColor: "#001A70" }} className="md:py-18">
        <Typography variant="h3" sx={{ mb: 6 }} className="text-center text-[40px] text-white">
          Sky Entertainment
        </Typography>
        <SkyCarousel items={slides} />
      </div>
    </div>
  );
}

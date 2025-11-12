import "./homePage.scss";
import DismissibleBanner from "../components/molecules/DismissibleBanner/DismissibleBanner";
import HeroBanner from "../components/organisms/hero-banner/HeroBanner";

export default function Home() {
  return (
    <div className="home-page bg-white ">
      <DismissibleBanner content="Get that Sky feeling with Essential TV from only £15 | See all deals" />
      <HeroBanner />
    </div>
  );
}

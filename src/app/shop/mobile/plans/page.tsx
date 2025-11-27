import BlackFridayBanner from "@/components/molecules/black-friday-banner/BlackFridayBanner";
import AwardNetwork from "@/components/molecules/award-network/AwardNetwork";
import PlanCard from "@/components/atoms/plan-card/PlanCard";
import Container from "@mui/material/Container";
import Heading from "@/components/atoms/heading/heading";
import AwardNetworkCard from "@/components/atoms/award-winning-card/AwardWinningCard";
import ReasonsToBuy from "@/components/atoms/reasons-to-buy/ReasonsToBuy";
import { awardWinningCardData, reasonsToBuyData } from "@/constants";

export default function PlansPage() {
  return (
    <>
      <div className="w-full bg-white">
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1248px",
            padding: "0 32px",
          }}
        >
          <BlackFridayBanner />
        </Container>
      </div>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1248px",
        }}
      >
        <AwardNetwork
          heading="Join our award winning network"
          link="Read more about our data plans"
        >
          <AwardNetworkCard awardWinningCardData={awardWinningCardData} />
        </AwardNetwork>
      </Container>
      <div className="w-full bg-white">
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1248px",
          }}
        >
          <div className="mx-auto pt-10 text-center">
            <Heading heading="SIM only data plans" />
          </div>
          <PlanCard />
          <AwardNetwork heading="Why Sky Mobile?" link="Read more about Sky Mobile">
            <ReasonsToBuy reasonToBuyData={reasonsToBuyData} />
          </AwardNetwork>
        </Container>
      </div>
    </>
  );
}

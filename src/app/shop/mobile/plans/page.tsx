import BlackFridayBanner from "@/components/molecules/black-friday-banner/BlackFridayBanner";
import AwardNetwork from "@/components/molecules/award-network/AwardNetwork";
import PlanCard from "@/components/atoms/plan-card/PlanCard";
import Container from "@mui/material/Container";
import Heading from "@/components/atoms/heading/heading";
import AwardNetworkCard from "@/components/atoms/award-winning-card/AwardWinningCard";
import ReasonsToBuy from "@/components/atoms/reasons-to-buy/ReasonsToBuy";
import { awardWinningCardData, reasonsToBuyData, labels } from "@/constants";

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
        <AwardNetwork heading={labels.awardNetwork.heading} link={labels.awardNetwork.link}>
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
            <Heading heading={labels.reasonsToBuy.simOnlyText} />
          </div>
          <PlanCard />
          <AwardNetwork heading={labels.reasonsToBuy.heading} link={labels.reasonsToBuy.link}>
            <ReasonsToBuy reasonToBuyData={reasonsToBuyData} />
          </AwardNetwork>
        </Container>
      </div>
    </>
  );
}

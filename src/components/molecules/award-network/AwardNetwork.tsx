import Heading from "@/components/atoms/heading/heading";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type AwardNetworkProps = {
  children: React.ReactNode;
  heading: string;
  link: string;
};

export default function AwardNetwork({ children, heading, link }: AwardNetworkProps) {
  return (
    <section className="w-full">
      <div className="mx-auto pt-8 text-center text-[3rem] leading-[4rem] text-[#dd1718]">
        <Heading heading={heading} />
      </div>

      <div className="mx-auto pb-8 text-center">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Box>
        <a
          href="#"
          className="mt-12 inline-block text-lg leading-[24px] font-bold text-[#0047ff] text-[rgb(0,15,245)] hover:underline"
        >
          {link} {">"}
        </a>
      </div>
    </section>
  );
}

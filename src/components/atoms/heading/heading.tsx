type HeadingProps = {
  heading: string;
};
export default function Heading({ heading }: HeadingProps) {
  return (
    <div className="mx-auto pb-8 text-center text-[3rem] leading-[4rem] text-[#dd1718]">
      {heading}
    </div>
  );
}

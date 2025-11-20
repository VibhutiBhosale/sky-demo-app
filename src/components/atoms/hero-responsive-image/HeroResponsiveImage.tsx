export default function HeroResponsiveImage() {
  return (
    <picture className="block h-full w-full">
      {/* Mobile 200px */}
      <source
        media="(max-width: 200px)"
        srcSet="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=200"
      />

      {/* Mobile 480px */}
      <source
        media="(max-width: 480px)"
        srcSet="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=480"
      />

      {/* Tablet 800px */}
      <source
        media="(max-width: 800px)"
        srcSet="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=800"
      />

      {/* Desktop 1200px */}
      <source
        media="(max-width: 1200px)"
        srcSet="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=1200"
      />

      {/* Large Desktop 1600px */}
      <source
        media="(min-width: 1201px)"
        srcSet="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=1600"
      />

      {/* Default fallback */}
      <img
        alt="Best Ever Black Friday"
        className="h-full w-full object-cover object-center"
        src="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt801ce9adcc533b2f/690390c3531ab003ab280844/2025_Q4_October_Black_Friday_PHP_Hero_ETV&FF500_Desktop_v1.png?format=webp&imageManager=true&impolicy=resize&width=1200"
      />
    </picture>
  );
}

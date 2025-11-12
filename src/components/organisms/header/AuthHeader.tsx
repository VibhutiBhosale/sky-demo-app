import Image from "next/image";
import './authHeader.scss';

export default function AuthHeader() {
  return (
    <header className="masthead" role="banner">
      <Image
        className="masthead-logo"
        src="https://id.sky.com/static-assets/sky-logo-small.png"
        alt="Sky logo"
        width={41}
        height={25}
      />
    </header>
  );
}

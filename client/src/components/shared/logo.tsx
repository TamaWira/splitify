import Image from "next/image";
import LogoSrc from "@/../public/billo_logo.svg";

export function Logo() {
  const width = 20;
  const height = width * 2;

  return <Image src={LogoSrc} alt="Logo" width={width} height={height} />;
}

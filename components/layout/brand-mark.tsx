import Image from "next/image";

type BrandMarkProps = { className?: string };

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      alt=""
      className={className}
      height={316}
      priority
      sizes="44px"
      src="/branding/mohamed-nejjari-logo.png"
      unoptimized
      width={454}
    />
  );
}

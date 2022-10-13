import { useState } from "react";
import Image from "next/image";
import { LinkToPost } from ".";

export const Img = ({ id, img }: { id: number; img: string }) => {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);

  return (
    <LinkToPost id={id}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL_POST_IMG}/${img}`}
        className={`object-cover rounded-xl aspect-video min-h-[144px] max-w-[240px] transition-all duration-200 select-none pointer-events-none ${
          imgIsLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt="img"
        width={1600}
        height={700}
        quality={50}
        loading={"lazy"}
        layout="responsive"
        onLoad={() => setImgIsLoaded(true)}
      />
    </LinkToPost>
  );
};

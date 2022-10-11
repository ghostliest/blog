import { useState } from "react";
import Image from "next/image";
import { Spinner } from "@ui";
import { LinkToPost } from ".";

export const Poster = ({ postId, img }: { postId: number; img: string }) => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <div className="flex relative">
      <LinkToPost id={postId}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL_POST_IMG}/${img}`}
          className={`object-cover aspect-video min-h-[228px] max-w-[512px] transition-all duration-500 select-none pointer-events-none
              ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"}
            `}
          alt="img"
          width={1600}
          height={800}
          quality={50}
          layout="responsive"
          onLoad={() => setLoaded(true)}
        />
        {!isLoaded && <Spinner className={`absolute !w-full bg-white top-0 left-2/4 -translate-x-2/4`} size="m" />}
      </LinkToPost>
    </div>
  );
};

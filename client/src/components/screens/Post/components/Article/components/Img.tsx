import { useState } from "react";
import Image from "next/image";
import { useTypedSelector } from "@hooks";
import { selectPost } from "@store/selectors/post.selector";

export const Img = () => {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const { img } = useTypedSelector(selectPost);

  return (
    <div>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL_POST_IMG}/${img}`}
        className={`object-cover aspect-video rounded-t-xl transition-opacity duration-200 select-none pointer-events-none ${
          imgIsLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt="img"
        width={935}
        height={450}
        quality={50}
        layout="responsive"
        onLoad={() => setImgIsLoaded(true)}
      />
    </div>
  );
};

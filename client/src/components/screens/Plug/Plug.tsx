import { useState } from "react";
import { useRouter } from "next/router";
import { PublicRoutesEnum } from "@constants";
import { randomInRange } from "@utils";
import { Button, Spinner } from "@ui";
import { NoSSR } from "@wrappers";
import { PlugProps } from "./Plug.props";

export const Plug = ({ header, gifIds }: PlugProps) => (
  <div className="flex flex-col gap-4 h-screen w-[90%] max-w-[500px] m-auto justify-center items-center text-lg font-medium select-none">
    <h1 className="text-3xl text-center">{header}</h1>
    <Iframe gifIds={gifIds} />
    <Btns />
  </div>
);

const Iframe = ({ gifIds }: { gifIds: string[] }) => {
  const randomNumber = () => randomInRange(0, gifIds.length - 1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [idx, setIdx] = useState(randomNumber);

  const randomGif = () => {
    setIsLoaded(false);
    const nextIdx = randomNumber();

    if (idx !== nextIdx) {
      setIdx(nextIdx);
    } else {
      randomGif();
    }
  };

  return (
    <div className="relative w-full h-1/4 bg-black rounded-lg cursor-pointer overflow-hidden" onClick={randomGif}>
      <NoSSR>
        <iframe
          key={idx}
          className="w-full h-full rounded-lg pointer-events-none select-none"
          src={`https://gifer.com/embed/${gifIds[idx]}`}
          frameBorder="0"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </NoSSR>
      {!isLoaded && (
        <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center">
          <Spinner size="m" />
        </div>
      )}
    </div>
  );
};

const Btns = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row w-full gap-4">
      <Button onClick={router.back} appearance="light" className="w-full">
        BACK
      </Button>
      <Button href={PublicRoutesEnum.HOME} appearance="light" className="w-full">
        HOME
      </Button>
    </div>
  );
};

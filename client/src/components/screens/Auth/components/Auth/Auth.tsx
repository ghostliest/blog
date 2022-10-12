import { useState, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/router";
import { Button, ButtonArrow } from "@ui";
import { AuthProps } from "./Auth.props";

export const Auth = (props: AuthProps) => {
  const { handleSubmit, type, secondBtnLink, secondBtnName, InputGroup } = props;

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleClickBack = (e: MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmitWrap = (e: MouseEvent) => {
    e.preventDefault();
    handleSubmit(setErrorMessage);
  };

  const Btns = () => (
    <div className="flex flex-col gap-5 w-full">
      <Button className="w-full justify-center" onClick={(e) => handleSubmitWrap(e)}>
        {type}
      </Button>
      <Button href={secondBtnLink} className="w-full justify-center" appearance="transparent">
        {secondBtnName}
      </Button>
    </div>
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative bg-white rounded-2xl shadow-md p-8 m-4 w-[360px] h-[595px]">
        <ButtonArrow
          appearance="ghost"
          direction="left"
          size="xl"
          className="absolute top-[25px] left-[-25px]"
          onClick={(e) => handleClickBack(e)}
        />
        <div className="flex flex-col gap-8 text-center h-full justify-between">
          <span className="font-semibold text-3xl">{type}</span>
          <Inputs Inputs={InputGroup} error={errorMessage} />
          <Btns />
        </div>
      </div>
    </div>
  );
};

const Inputs = ({ Inputs, error }: { Inputs: ReactNode; error: string }) => (
  <div className="flex flex-col gap-5">
    {Inputs}
    <span className={`text-red-600 min-h-[50px] ${error ? "opacity-100" : "opacity-0"}`}>{error}</span>
  </div>
);

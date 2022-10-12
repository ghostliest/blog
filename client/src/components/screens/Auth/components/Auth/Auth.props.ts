import { Dispatch, ReactNode, SetStateAction } from "react";
import { UrlObject } from "url";

export interface AuthProps {
  handleSubmit: (setErrorMessage: Dispatch<SetStateAction<string>>) => void;
  type: "SignIn" | "SignUp";
  secondBtnLink: UrlObject;
  secondBtnName: string;
  InputGroup: ReactNode;
}

import { Dispatch, SetStateAction, useRef } from "react";
import { useRouter } from "next/router";
import JwtDecode from "jwt-decode";
import { Input } from "@ui";
import { TOKEN_KEY, PublicRoutesEnum } from "@constants";
import { signIn } from "@services";
import { useActions } from "@hooks";
import { nextRoute } from "@utils";
import { UserInterface } from "@store/types/user.types";
import { Auth } from "./components/Auth/Auth";

export const SignIn = () => {
  const { HOME, SIGNUP } = PublicRoutesEnum;

  const emailRef = useRef("") as any;
  const passwordRef = useRef("") as any;

  const router = useRouter();
  const NEXT_ROUTE = (router?.query?.next as string) || "";

  const { setUser } = useActions();

  const handleSubmit = (setErrorMessage: Dispatch<SetStateAction<string>>) => {
    const fields = {
      email: emailRef.current,
      password: passwordRef.current,
    };

    const fieldsValue = Object.values(fields);

    if (fieldsValue.some((value) => !value.getValue())) {
      setErrorMessage("fields isn't be empty");
      return;
    } else if (fieldsValue.some((value) => !value.check())) {
      setErrorMessage("fields filled incorrectly");
      return;
    }

    signIn({
      email: fields.email.getValue(),
      password: fields.password.getValue(),
    }).then((res) => {
      if (res?.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        const decoded = JwtDecode<UserInterface>(res.token);
        setUser(decoded);
        router.replace(NEXT_ROUTE || HOME);
      } else if (res?.message) {
        if (Array.isArray(res?.message)) {
          setErrorMessage(Object.values(res.message[0])[0].join(" "));
        } else {
          setErrorMessage(res?.message);
        }
      }
    });
  };

  const InputGroup = () => (
    <>
      <Input type="text" ref={emailRef} placeholder="Email" isEmail={true} autoFocus />
      <Input type="password" ref={passwordRef} placeholder="Password" showCounter={true} minLength={4} maxLength={16} />
    </>
  );

  return (
    <Auth
      type="SignIn"
      InputGroup={<InputGroup />}
      handleSubmit={handleSubmit}
      secondBtnName="SignUp"
      secondBtnLink={nextRoute(SIGNUP, NEXT_ROUTE)}
    />
  );
};

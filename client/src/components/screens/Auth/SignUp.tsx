import { Dispatch, SetStateAction, useRef } from "react";
import { useRouter } from "next/router";
import JwtDecode from "jwt-decode";
import { Input } from "@ui";
import { TOKEN_KEY, PublicRoutesEnum } from "@constants";
import { signUp } from "@services";
import { useActions } from "@hooks";
import { nextRoute } from "@utils";
import { UserInterface } from "@store/types/user.types";
import { Auth } from "./components/Auth/Auth";

export const SignUp = () => {
  const { HOME, SIGNIN } = PublicRoutesEnum;

  const emailRef = useRef("") as any;
  const firstNameRef = useRef("") as any;
  const lastNameRef = useRef("") as any;
  const passwordRef = useRef("") as any;

  const router = useRouter();
  const NextRoute = (router?.query?.next as string) || "";

  const { setUser } = useActions();

  const handleSubmit = (setErrorMessage: Dispatch<SetStateAction<string>>) => {
    const fields = {
      email: emailRef.current,
      firstname: firstNameRef.current,
      lastname: lastNameRef.current,
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

    signUp({
      email: fields.email.getValue(),
      firstname: fields.firstname.getValue(),
      lastname: fields.lastname.getValue(),
      password: fields.password.getValue(),
    }).then((res) => {
      if (res?.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        const decoded = JwtDecode<UserInterface>(res.token);
        setUser(decoded);
        router.replace(NextRoute || HOME);
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
      <Input type="text" ref={emailRef} placeholder="Email" isEmail={true} />
      <Input type="text" ref={firstNameRef} placeholder="First Name" showCounter={true} minLength={2} maxLength={10} />
      <Input type="text" ref={lastNameRef} placeholder="Last Name" showCounter={true} minLength={2} maxLength={10} />
      <Input type="password" ref={passwordRef} placeholder="Password" showCounter={true} minLength={4} maxLength={16} />
    </>
  );

  return (
    <Auth
      type="SignUp"
      InputGroup={<InputGroup />}
      handleSubmit={handleSubmit}
      secondBtnName="SignIn"
      secondBtnLink={nextRoute(SIGNIN, NextRoute)}
    />
  );
};

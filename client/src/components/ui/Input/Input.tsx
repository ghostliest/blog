import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { checkEmail } from "@utils";
import { InputProps } from "./Input.props";

export const Input = forwardRef((props: InputProps, ref: any) => {
  const {
    type,
    defaultValue,
    onChange,
    className = "",
    placeholder,
    showCounter = false,
    minLength,
    maxLength,
    isEmail,
    ...other
  } = props;

  const [state, setState] = useState(defaultValue || "");
  const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => state,
    setValue: (value: string) => handleChange(value),
    check: () => isComplete,
    clear: () => {
      setState("");
      setIsComplete(undefined);
    },
    focus: () => inputRef?.current?.focus(),
  }));

  const handleChange = (value: string) => {
    if (onChange !== undefined) {
      onChange(value);
    }

    const length = value.length;

    if (isEmail) {
      if (!length) {
        setIsComplete(undefined);
      } else {
        if (checkEmail(value)) {
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
      }
    }

    if (maxLength && minLength) {
      if (!length) {
        setIsComplete(undefined);
      } else if (length < minLength || length > maxLength) {
        setIsComplete(false);
      } else {
        setIsComplete(true);
      }
    }

    setState(value);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        value={state}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full bg-white text-black outline-none border border-border-color focus:border-primary-color rounded-lg py-2 pr-8 pl-3 ${className} ${
          isComplete === true ? "!border-green-500" : isComplete === false ? "!border-red-600" : ""
        }`}
        placeholder={placeholder}
        {...other}
      />
      {showCounter && state?.length > 0 && (
        <span className="absolute right-2 top-2/4 -translate-y-1/2 text-gray-500">{state.length}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

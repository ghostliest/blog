import { forwardRef, useImperativeHandle, useState } from "react";
import cn from "classnames";
import { TextAreaProps } from "./TextArea.props";

export const TextArea = forwardRef((props: TextAreaProps, ref: any) => {
  const { defaultValue, onChange, resize, className, showCounter, minLength, maxLength } = props;

  const [value, setValue] = useState(defaultValue || "");
  const [isComplete, setIsComplete] = useState<boolean | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (value: string) => handleChange(value),
    check: () => isComplete,
    clear: () => {
      setValue("");
      setIsComplete(undefined);
    },
  }));

  const handleChange = (value: string) => {
    if (onChange !== undefined) {
      onChange(value);
    }

    if (maxLength && minLength) {
      const length = value.length;
      if (!length) {
        setIsComplete(undefined);
      } else if (length < minLength || length > maxLength) {
        setIsComplete(false);
      } else {
        setIsComplete(true);
      }
    }
    setValue(value);
  };

  return (
    <div className="relative">
      <textarea
        className={cn(
          "w-full min-h-[150px] bg-white text-black border border-border-color outline-none focus:border-primary-color rounded-lg",
          `${className}`,
          {
            ["resize-x"]: resize === "x",
            ["resize-y"]: resize === "y",
            ["resize-none"]: resize === "none",
          },
          `${isComplete === true ? "!border-green-500" : isComplete === false ? "!border-red-600" : ""}`,
          "overflow-y-auto py-2 pl-3 pr-8"
        )}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {showCounter && value.length > 0 && <span className="absolute right-2 bottom-[10px] text-gray-500">{value.length}</span>}
    </div>
  );
});

TextArea.displayName = "TextArea";

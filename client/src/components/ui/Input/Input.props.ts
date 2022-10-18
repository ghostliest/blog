import { InputHTMLAttributes } from "react";

// export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  defaultValue?: string;
  onChange?: (value: any) => any;
  showCounter?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

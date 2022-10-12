export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  defaultValue?: string;
  onChange?: (value: any) => any;
  showCounter?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

export interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  onChange?: (value: any) => any;
  defaultValue?: string;
  resize: "x" | "y" | "none";
  showCounter?: boolean;
  minLength?: number;
  maxLength?: number;
}

import { cva, type VariantProps } from "class-variance-authority";

const input = cva(
  "py-1 px-2 mb-4 w-full rounded-lg border-2 border-primary-200 font-lg focus:outline-none focus:border-primary-800"
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}
export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input {...props} className={input({ className })} />
);

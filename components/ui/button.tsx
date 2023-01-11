import { cva, type VariantProps } from "class-variance-authority";

const button = cva("py-2 mb-4 w-full font-semibold rounded-lg transition-all", {
  variants: {
    intent: {
      primary: ["bg-primary-800", "text-secondary-50", "hover:bg-primary-600"],
      secondary: [
        "border-2",
        "border-primary-300",
        "text-primary-800",
        "hover:bg-primary-300",
        "hover:text-primary-600",
      ],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  ...props
}) => <button className={button({ intent, className })} {...props} />;

import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("cursor-pointer rounded-full px-5 py-3 size-fit font-bold", {
  variants: {
    buttonStyle: {
      fill: "bg-brand-500 hover:bg-brand-300",
      minimal: "text-brand-500 hover:text-brand-300 hover:underline",
      outline: "border border-brand-500 text-brand-500 hover:border-brand-300 hover:text-brand-300",
    },
  },
  defaultVariants: {
    buttonStyle: "fill",
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof variants>;

function Button({ buttonStyle, className, children, ...props }: ButtonProps) {
  return (
    <button className={variants({ buttonStyle, className })} {...props}>
      {children}
    </button>
  );
}
export default Button;

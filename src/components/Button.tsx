import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("size-fit rounded-full px-5 py-3 font-bold", {
  variants: {
    buttonStyle: {
      fill: "",
      minimal: "",
      outline: ""
    },
    state: {
      idle: "cursor-pointer",
      disabled: ""
    }
  },
  compoundVariants: [
    {
      buttonStyle: "fill",
      state: "idle",
      className: "bg-brand-500 hover:bg-brand-300"
    },
    {
      buttonStyle: "fill",
      state: "disabled",
      className: "bg-gray-300 text-gray-400"
    },
    {
      buttonStyle: "minimal",
      state: "idle",
      className: "text-brand-500 hover:text-brand-300 hover:underline"
    },
    {
      buttonStyle: "minimal",
      state: "disabled",
      className: "text-gray-400"
    },
    {
      buttonStyle: "outline",
      state: "idle",
      className: "border border-brand-500 text-brand-500 hover:border-brand-300 hover:text-brand-300"
    },
    {
      buttonStyle: "outline",
      state: "disabled",
      className: "border border-gray-400 text-gray-400"
    }
  ],
  defaultVariants: {
    buttonStyle: "fill",
    state: "idle"
  }
});

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof variants>;

function Button({ buttonStyle, state, className, children, ...props }: ButtonProps) {
  return (
    <button className={variants({ buttonStyle, state, className })} {...props}>
      {children}
    </button>
  );
}
export default Button;

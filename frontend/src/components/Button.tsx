import { ElementType, HTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  tag?: ElementType;
  handleClick?: (
    e:
      | MouseEvent<HTMLButtonElement, MouseEvent>
      | MouseEvent<HTMLButtonElement, React.MouseEvent<Element, MouseEvent>>
  ) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  outline?: boolean;
  extraClassName?: string;
  extraProps?: HTMLAttributes<HTMLButtonElement | HTMLElement>;
};

function Button({
  children,
  tag: Tag = "button",
  handleClick,
  disabled = false,
  type,
  outline = false,
  extraClassName = "",
  extraProps,
}: Props) {
  const buildClassName = () => {
    let className = `btn`;
    if (outline) {
      className += " btn-outline";
    }
    if (extraClassName) {
      className += ` ${extraClassName}`;
    }
    return className;
  };
  return (
    <Tag
      type={type}
      className={buildClassName()}
      disabled={disabled}
      onClick={handleClick}
      {...extraProps}
    >
      {children}
    </Tag>
  );
}

export default Button;

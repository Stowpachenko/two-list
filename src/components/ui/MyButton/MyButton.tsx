import { FC } from "react";
import styles from "./MyButton.module.css";
import { MyButtonProps } from "./MyButton.props";

const MyButton: FC<MyButtonProps> = ({
  className = "",
  children,
  ...props
}) => (
  <button className={`${styles.myButton} ${className}`} {...props}>
    {children}
  </button>
);

export default MyButton;
